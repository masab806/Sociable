import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/image'
import { Link } from 'expo-router'

const Login = () => {
    return (
        <SafeAreaView style={styles.bgView}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTextStyle}>Sociable</Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.iconStyle}
                            source={images.icons.userIcon}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.labelText}>Email</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your email"
                                placeholderTextColor="#756059"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.labelText}>Password</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your password"
                                placeholderTextColor="#756059"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>
                                Don't have an account?{' '}
                                <Link
                                    href="/(auth)/signup"
                                    style={styles.linkText}
                                >
                                    Register Now!
                                </Link>
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <Link href="/(tabs)/chats">Go To Home</Link>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgView: {
        backgroundColor: "#201A18",
        flex: 1,
    },
    headerContainer: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    headerTextStyle: {
        color: "#FFB59C",
        fontSize: 42,
        fontWeight: "800",
        letterSpacing: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
    },
    imageContainer: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#FFB59C",
        marginBottom: 40,
        backgroundColor: 'rgba(255, 181, 156, 0.05)',
    },
    iconStyle: {
        width: 60,
        height: 60,
        tintColor: "#FFB59C",
    },
    formContainer: {
        width: "100%",
        gap: 25,
    },
    inputWrapper: {
        width: "100%",
    },
    labelText: {
        color: "#FFB59C",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        marginLeft: 4,
    },
    inputStyle: {
        width: "100%",
        height: 55,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#FFB59C",
        paddingHorizontal: 16,
        color: "#FFFFFF",
        fontSize: 16,
        backgroundColor: "#2A221F",
    },
    buttonStyle: {
        backgroundColor: "#FFB59C",
        height: 55,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        shadowColor: "#FFB59C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: "#201A18",
        fontSize: 18,
        fontWeight: "bold",
    },
    footerContainer: {
        marginTop: 25,
        alignItems: 'center',
        width: '100%',
    },
    footerText: {
        color: '#756059',
        fontSize: 14,
        fontWeight: '500',
    },
    linkText: {
        color: '#FFB59C',
        fontWeight: '800',
        textDecorationLine: 'underline',
    },
})

export default Login