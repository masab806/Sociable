import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/image'
import { Link } from 'expo-router'
import { Eye, EyeClosed } from "lucide-react-native"
import { useState } from 'react'

const Signup = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState<Boolean>(false)

    return (
        <SafeAreaView style={styles.bgView}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

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
                            <Text style={styles.labelText}>Username</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter your Username"
                                placeholderTextColor="#756059"
                            />
                        </View>
                        
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
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#756059"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={()=> setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    {showPassword ? <EyeClosed color="#FFB59C" size={22} /> : <Eye color="#FFB59C" size={22} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.labelText}>Confirm Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Confirm your password"
                                    placeholderTextColor="#756059"
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={()=> setshowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                    {showConfirmPassword ? <EyeClosed color="#FFB59C" size={22}/> : <Eye color="#FFB59C" size={22}/>}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>
                                Already Have An account?{' '}
                                <Link
                                    href="/(auth)/login"
                                    style={styles.linkText}
                                >
                                    Login!
                                </Link>
                            </Text>
                        </View>
                    </View>
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
    headerContainer: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    headerTextStyle: {
        color: "#FFB59C",
        fontSize: 42,
        fontWeight: "800",
        letterSpacing: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24
    },
    imageContainer: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#FFB59C",
        marginBottom: 20,
        backgroundColor: 'rgba(255,181,156,0.05)'
    },
    iconStyle: {
        width: 60,
        height: 60,
        tintColor: "#FFB59C",
    },
    formContainer: {
        width: "100%",
        gap: 10, 
    },
    inputWrapper: {
        width: "100%",
    },
    passwordContainer: {
        width: '100%',
        position: 'relative',
        justifyContent: 'center'
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingLeft: 16,
        paddingRight: 50, // Space for the eye icon
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
        marginTop: 10,
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

export default Signup