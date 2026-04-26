import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, SearchIcon, Send, UserCircle2 } from 'lucide-react-native'
import { useLocalSearchParams } from 'expo-router'
import { FetchConvoById, fetchMessages } from '../lib/hooks/ConversationHook'
import socketService from '../services/socket.service'
import { useAuthStore } from '../store/auth.store'


type Message = {
    id: string;
    messageText: string;
    senderId: number;
}


const ChatConversation = () => {
    const { conversationId } = useLocalSearchParams()
    const ConvoId = Number(conversationId)
    const { data: conversationData, isLoading: conversationLoading } = FetchConvoById(ConvoId)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState("");
    const { data: allMessages, isLoading: messageLoading } = fetchMessages(ConvoId)
    const { user } = useAuthStore()
    const myId = user?.userId ?? 0

    if (!myId) return null


    useEffect(() => {
        if (allMessages) {
            const formatted = allMessages.map((msg) => ({
                id: msg.id.toString(),
                messageText: msg.messageText,
                senderId: msg.senderId
            }))

            setMessages(formatted)
        }
    }, [allMessages])


    const sendMessage = () => {
        if (inputText.trim() === "") return

        const newMessage = {
            message: inputText.trim(),
            senderId: myId,
            conversationId: ConvoId
        }


        socketService.sendMessage(newMessage, (res) => {
            console.log("SERVER ACK: ", res)

            if (!res.success) {
                console.log(res.message);
                return;
            }

        })

        setInputText("")
    }

    useEffect(() => {
        try {
            socketService.connectSocket()

            socketService.joinConversation(ConvoId)

            const handler = (msg) => {
                setMessages(prev => [
                    ...prev,
                    {
                        id: msg.id.toString(),
                        messageText: msg.messageText,
                        senderId: msg.senderId
                    }
                ])
            }

            socketService.onNewMessage(handler)


            return () => {
                socketService.off("newMessage")
            }

        } catch (error) {
            console.log("Error While Joining Conversation: ", error)
        }
    }, [ConvoId])

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [messages])


    const renderChat = ({ item }: { item: Message }) => {
        return (
            <View
                style={{
                    marginTop: 5,
                    alignItems:
                        item.senderId === myId ? "flex-end" : "flex-start",
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        backgroundColor: "#FFB59C",
                        padding: 10,
                        borderRadius: 100,
                    }}
                >
                    {item.messageText}
                </Text>
            </View>
        );
    };

    const flatListRef = useRef<any>(null);

    if (conversationLoading) {
        return (
            <SafeAreaView style={styles.bgView}>
                <Text style={{ color: "#FFB59C", padding: 20 }}>
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.bgView}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
                <View style={styles.headerTextContainer}>
                    <UserCircle2 size={36} color="#FFB59C" />
                    <Text style={styles.headerTextStyle}>{conversationData?.conversationName || "Username"}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={renderChat}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        extraData={messages}
                    />
                </View>

                <View style={styles.textInputStyle}>
                    <TextInput value={inputText} onChangeText={setInputText} onSubmitEditing={sendMessage} placeholder='Type A Message...' placeholderTextColor="#aaa" style={{ flex: 1, paddingHorizontal: 12, color: "#fff" }} />
                    <TouchableOpacity onPress={sendMessage}><Send color="#FFB59C" style={{ marginRight: 5 }} /></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        padding: 15,
        gap: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: "#FFB59C"
    },
    headerTextStyle: {
        color: "#FFB59C",
        fontSize: 20,
        fontWeight: "800"
    },
    iconStyle: {
        color: "#FFB59C"
    },
    textInputStyle: {
        borderWidth: 1.5,
        borderColor: "#FFB59C",
        borderRadius: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        margin: 10
    }
})

export default ChatConversation