import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('OnBoarding');
        },5000);

        return () => clearTimeout(timer); // Clean up timer on component unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/splash.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.text}>Let's Go</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    animation: {
        marginLeft: '23%',
        width: 300,
        height: 300,
    },
    text: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
});
