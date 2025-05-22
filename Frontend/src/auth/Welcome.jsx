import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native'; // Import Lottie
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const [username, setUsername] = useState('');
    const [isAnimationVisible, setAnimationVisible] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsername(response.data.name);
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUsername();
        
        const timer = setTimeout(() => {
            setAnimationVisible(false);
            navigation.navigate('SemesterSelect'); 
        }, 2000);

        return () => clearTimeout(timer); 
    }, [navigation]);

    return (
        <View style={styles.container}>
            {isAnimationVisible && (
                <LottieView
                    source={require('../../assets/burst.json')} // Replace with your Lottie file path
                    autoPlay
                    loop={false}
                    style={styles.animation}
                />
            )}
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userText}>{username}</Text>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Needed for the animation to be behind
    },
    animation: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    welcomeText: {
        fontSize: 55,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: 'black', // You can change the color as needed
        zIndex: 1, // Ensure text is above the animation
    },
    userText: {
        fontSize: 40,
        marginLeft: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#00bfff', // You can change the color as needed
        zIndex: 1,
    }
});
