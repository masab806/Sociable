import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MessageCirclePlusIcon, MessageSquarePlus, SearchIcon, UserCircle2 } from 'lucide-react-native'
import { router } from 'expo-router';
import { useAuthStore } from "@/app/store/auth.store";
import { useSearchUsers } from '../lib/hooks/UserHook';
import useDebounce from '../lib/utils/debounce';
import conversationService from '../services/conversation.service';
import { useConversationSearch, useConvoSearch } from '../lib/hooks/ConversationHook';

const CHAT_DATA = [
    { id: '1', name: '143', message: 'See ', time: '2:00 PM' },
    { id: '2', name: '456456', message: 'Haalo', time: 'Yesterday' },
    { id: '3', name: 'D', message: 'haaaloooo', time: 'Today' },
    { id: '4', name: '546456456', message: 'halo', time: 'Mar 24' },
];


const Chats = () => {
    const { user, token, logout } = useAuthStore()
    const [openModal, setopenModal] = useState(false)
    const [isClicked, setisClicked] = useState(false)
    const [search, setSearch] = useState("")
    const [conversationSearch, setConversationSearch] = useState("")

    const debouncedSearch = useDebounce(search, 500)
    const debouncedConversation = useDebounce(conversationSearch, 500)

    const { data: searchData, isLoading, isError, error } = useSearchUsers(debouncedSearch)
    const { data: conversationData } = useConversationSearch()
    const { data: searchedConversations } = useConvoSearch(debouncedConversation)


    const addConversation = (
        userId: number | undefined,
        participantId: number | undefined,
        username: string
    ) => {
        if (!userId || !participantId) {
            console.log("Missing IDs", { userId, participantId });
            return;
        }

        return conversationService.addConversation(
            userId,
            participantId,
            username
        );
    };


    const handleLogout = () => {
        logout()
        router.replace("/(auth)/login")
    }

    const renderChatItem = ({ item }) => (
        <Pressable onPress={() => router.push({
            pathname: "/(tabs)/conversation",
            params: { conversationId: item?.id }
        })} style={styles.chatItem}>
            <View style={styles.avatarPlaceholder}>
                <UserCircle2 color="#FFB59C" size={40} />
            </View>
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.userNameText}>{item?.conversationName}</Text>
                </View>
                <Text style={styles.messageText} numberOfLines={1}>
                    {item.message || "Start Conversation"}
                </Text>
            </View>
        </Pressable>
    );

    const renderDropdown = () => (
        <View style={styles.dropdownContainer}>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )

    const renderUser = ({ item }: { item: { userId: number; username: string } }) => {
        console.log(item)
        return (

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 }}>
                <UserCircle2 color="#FFB59C" size={36} />
                <Text style={{ color: "#FFB59C", fontSize: 16 }}>{item?.username}</Text>
                <View style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", width: 100 }}>
                    <TouchableOpacity
                        onPress={() => addConversation(user?.userId, item?.userId, item?.username)}
                    >
                        <MessageSquarePlus color="#FFB5" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderAddConvo = () => (
        <View style={styles.modalBackdrop}>
            <Pressable
                style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
                onPress={() => setisClicked(false)}
            />
            <View style={[styles.AddConversationContainer, { zIndex: 1 }]}>
                <View style={{ width: "100%", marginBottom: 12 }}>
                    <View style={styles.InsideSearchContainer}>
                        <TextInput
                            placeholder='Explore'
                            placeholderTextColor="#756059"
                            style={styles.searchInput}
                            value={search}
                            onChangeText={setSearch}
                        />
                        <SearchIcon style={{ marginRight: 10 }} color="#FFB59C" />
                    </View>
                </View>

                {isLoading ? (
                    <View style={{ padding: 20 }}>
                        <Text style={{ color: "#FFB59C" }}>Loading...</Text>
                    </View>
                ) : isError ? (
                    <View>
                        <Text style={{ color: "red" }}>{error?.message || "Something Went Wrong!"}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={searchData?.data || []}
                        keyExtractor={(item) => item.userId.toString()}
                        renderItem={renderUser}
                    />

                )}

            </View>
        </View>
    )


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.bgView}>
                <View style={{ position: "relative", zIndex: 999 }}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTextStyle}>Sociable</Text>
                        <TouchableOpacity onPress={() => setopenModal(!openModal)}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Text style={styles.userNameText}>{user?.username}</Text>
                                <UserCircle2 style={styles.iconStyle} size={36} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {openModal && renderDropdown()}
                </View>

                <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder='Explore'
                            placeholderTextColor="#756059"
                            style={styles.searchInput}
                            value={conversationSearch}
                            onChangeText={setConversationSearch}
                        />
                        <SearchIcon style={{ marginRight: 10 }} color="#FFB59C" />
                    </View>
                </View>

                <FlatList
                    data={conversationSearch.trim().length > 0 ? searchedConversations : conversationData || []}
                    keyExtractor={(item) => item.id}
                    renderItem={renderChatItem}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />

                <TouchableOpacity onPress={() => setisClicked(!isClicked)} style={styles.ChatAddContainer}>

                    <MessageCirclePlusIcon color="#201A18" />

                </TouchableOpacity>
            </SafeAreaView>

            {isClicked && renderAddConvo()}
        </View>
    )
}

const styles = StyleSheet.create({
    bgView: {
        backgroundColor: "#201A18",
        flex: 1
    },
    headerTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    headerTextStyle: {
        color: "#FFB59C",
        fontSize: 28,
        fontWeight: "800"
    },
    iconStyle: {
        color: "#FFB59C"
    },
    searchContainer: {
        borderWidth: 1.5,
        borderColor: "#FFB59C",
        height: 50,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "#2A221F"
    },
    searchInput: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 16
    },
    chatItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: 'rgba(255, 181, 156, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    userNameText: {
        color: '#FFB59C',
        fontSize: 17,
        fontWeight: '700',
    },
    timeText: {
        color: '#756059',
        fontSize: 12,
    },
    messageText: {
        color: '#BBBBBB',
        fontSize: 14,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 181, 156, 0.1)',
        width: '80%',
        alignSelf: 'flex-end',
    },
    dropdownContainer: {
        position: "absolute",
        borderWidth: 1.5,
        top: 50,
        right: 0,
        minWidth: 160,
        overflow: "hidden",
        backgroundColor: "#2A221F",
        borderRadius: 12,
        borderColor: "#FFB59C",
        marginRight: 12,
        marginTop: 15,
    },
    dropdownItem: {
        padding: 14
    },
    dropdownText: {
        color: "#FFB59C",
        fontSize: 14
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,181,156,0.2)',
        marginHorizontal: 12
    },
    ChatAddContainer: {
        position: "absolute",
        right: 15,
        bottom: 80,
        padding: 15,
        backgroundColor: "#FFB59C",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    modalBackdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(32, 26, 24, 0.85)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        elevation: 10,
    },
    AddConversationContainer: {
        width: "85%",
        height: "60%",
        flex: 0,
        backgroundColor: "#2A221F",
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#FFB59C",
        padding: 16,
    },
    InsideSearchContainer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "#2A221F",
        borderBottomWidth: 1.5,
        borderBottomColor: "#FFB59C"
    },
})

export default Chats