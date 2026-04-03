import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchIcon, UserCircle2 } from 'lucide-react-native'

const CHAT_DATA = [
    { id: '1', name: 'Alex Rivers', message: 'See you at the gym later?', time: '4:15 PM' },
    { id: '2', name: 'Sarah Chen', message: 'The React Native docs are updated!', time: 'Yesterday' },
    { id: '3', name: 'Design Team', message: 'New Figma link is in the thread.', time: 'Monday' },
    { id: '4', name: 'University Group', message: 'When do classes start?', time: 'Mar 24' },
];

const Chats = () => {

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem}>
            <View style={styles.avatarPlaceholder}>
                <UserCircle2 color="#FFB59C" size={40} />
            </View>
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.userNameText}>{item.name}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.messageText} numberOfLines={1}>
                    {item.message}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.bgView}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerTextStyle}>Sociable</Text>
                <TouchableOpacity><UserCircle2 style={styles.iconStyle} size={36} /></TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
                <View style={styles.searchContainer}>
                    <TextInput 
                        placeholder='Explore' 
                        placeholderTextColor="#756059" 
                        style={styles.searchInput}
                    />
                    <SearchIcon style={{ marginRight: 10 }} color="#FFB59C" />
                </View>
            </View>

            <FlatList
                data={CHAT_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
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
    }
})

export default Chats