import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import SplashScreen from "./components/SplashScreen";

export default function RootLayout() {
    const [timerLoading, setTimerLoading] = useState(true);

    const [fontsLoaded, fontError] = useFonts({
        'Poppins': require('@/assets/fonts/poppins.ttf'),
        'Roboto': require('@/assets/fonts/roboto.ttf'),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimerLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    if (timerLoading || (!fontsLoaded && !fontError)) {
        return <SplashScreen />;
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(auth)/login" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)/chats" options={{ headerShown: false }} />
        </Stack>
    );
}