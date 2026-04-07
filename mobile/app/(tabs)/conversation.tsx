import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, SearchIcon, Send, UserCircle2 } from 'lucide-react-native'



type Message = {
    id: number
    text: string
    senderID: number
}

const ChatConversation = () => {
    const myId = 1;
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello", senderID: 1 },
        { id: 2, text: "Hello 2", senderID: 3 },
    ])
    const [inputText, setInputText] = useState("");

    const sendMessage = () => {
        if (inputText.trim() === "") return

        const newMessage = {
            id: messages.length + 1,
            text: inputText.trim(),
            senderID: myId
        }

        setMessages(prev => [...prev, newMessage])
        setInputText("")
    }

    const renderChat = ({ item }) => {
        return (
            <View style={{ display: "flex", marginTop: 5, alignItems: item.senderID === myId ? "flex-end" : "flex-start", padding: 10 }}>
                {item.senderID !== myId ? (
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <UserCircle2 size={32} color="#FFB59C" />
                        <Text style={{ backgroundColor: "#FFB59C", width: "auto", padding: 10, borderRadius: 100, textAlign: item.senderID === myId ? "left" : "right" }}>{item.text}</Text>
                    </View>

                ) : <Text style={{ backgroundColor: "#FFB59C", width: "auto", padding: 10, borderRadius: 100, textAlign: item.senderID === myId ? "left" : "right" }}>{item.text}</Text>
                }
            </View>
        )
    }

    const flatListRef = useRef<any>(null);

    return (
        <SafeAreaView style={styles.bgView}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
                <View style={styles.headerTextContainer}>
                    <UserCircle2 size={36} color="#FFB59C" />
                    <Text style={styles.headerTextStyle}>Username</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderChat}
                        contentContainerStyle={{paddingBottom: 10}}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
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