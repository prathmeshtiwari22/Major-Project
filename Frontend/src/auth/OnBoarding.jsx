import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const contents = [
        'Discover new ways to learn Engineering',
        'Contribute to the developing world',
        'Achieve Milestones and Rewards'
    ];

    const description = [
        'Explore tips, tricks, and creative ideas for more efficient problem-solving.',
        'Every small step you take makes a big impact on your skills.',
        'Achieve milestones and earn rewards for your efforts.'
    ];

    // Define local images with require and remote images
    const images = [
        'https://static.vecteezy.com/system/resources/previews/024/585/327/original/3d-cartoon-engineer-on-transparent-background-generative-ai-png.png',
        'https://img.freepik.com/premium-vector/man-sitting-desk-working-computer_961875-417773.jpg?w=996', // Remote image
        'https://img.freepik.com/premium-photo/3d-flat-icon-as-safety-manager-with-iso-certificate-safety-gear-concept-as-safety-manager-hold_980716-404629.jpg?w=1380' // Fallback remote image
    ];

    const onNext = () => {
        if (currentIndex < contents.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.container}>
            {/* Display image */}
            <Image
                source={typeof images[currentIndex] === 'string' ? { uri: images[currentIndex] } : images[currentIndex]} // Check if the image is a URI or local image
                style={styles.image}
            />

            {/* Display content and description */}
            <Text style={styles.content}>{contents[currentIndex]}</Text>
            <Text style={styles.description}>{description[currentIndex]}</Text>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
                {contents.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

            {/* Conditionally render 'Get Started' and 'Skip' buttons */}
            {currentIndex < contents.length - 1 && (
                <>
                    <TouchableOpacity onPress={onNext} style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.skip}>
                        <Text style={styles.skiptext}>Skip</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Render Login and Register buttons on the last screen */}
            {currentIndex === contents.length - 1 && (
                <>
                    <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.regText}>Register</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-end',backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 },
    image: { width: 400, height: 400, marginBottom: 47 }, // Adjust the height as needed
    dotsContainer: { flexDirection: 'row', marginVertical: 20 },
    dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
    activeDot: { backgroundColor: '#00bfff' },
    inactiveDot: { backgroundColor: 'gray' },
    button: { backgroundColor: '#00bfff', padding: 10, borderRadius: 20, marginTop: 20, width: '90%', height: 50 },
    buttonText: { color: 'black', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
    skiptext: { color: '#00bfff', fontWeight: 'bold', marginTop: 25, textDecorationLine: 'underline',marginBottom: 50 },
    authButton: { marginHorizontal: 10, padding: 10, borderRadius: 5, backgroundColor: '#00bfff', width: '90%', height: 50, borderRadius: 20, marginTop: 20 },
    register: { justifyContent: 'center' },
    regText: { color: '#00bfff', fontWeight: 'bold', marginTop: 25, textDecorationLine: 'underline',marginBottom: 50 },
    content: { fontSize: 24, color: 'black', fontWeight: '600', textAlign: 'center' },
    description: { fontSize: 16, color: 'gray', textAlign: 'center', marginTop: 10 },
});

export default OnBoarding;
