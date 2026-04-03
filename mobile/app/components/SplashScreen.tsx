import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen = () => {

  return (
    <SafeAreaView style={styles.ViewStyle}>
      <View style={styles.splashView}><Text style={styles.splashText}>Sociable</Text></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    ViewStyle: {
      backgroundColor: "#201A18",
      width: "100%",
      height: "100%"
    },
    splashView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    splashText: {
      fontSize: 57,
      fontWeight: "bold",
      color: "#FFB59C",
      textShadowRadius: 20,
      fontFamily: "Roboto"
    }
})

export default SplashScreen