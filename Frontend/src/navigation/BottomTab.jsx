import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import home from '../image/home.png'
import book from '../image/book.png';
import track from '../image/track.png';
import questionp from '../image/questionPaper.png';

const BottomTab = () => {
    const [selectedTab, setSelectedTab] = useState(null);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <TouchableOpacity onPress={() => {setSelectedTab('home');
                navigation.navigate('Course')}}>
                    <View style={[styles.animationContainer, selectedTab === 'home' && styles.selected]}>
                        <Image source={home} style={styles.home}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelectedTab('track');
                    navigation.navigate('Track'); // Navigate to 'Track' screen
                }}>
                    <View style={[styles.animationContainer, selectedTab === 'track' && styles.selected]}>
                        <Image source={track} style={styles.track} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedTab('notes');
                 navigation.navigate('Notes'); }}>
                    <View style={[styles.animationContainer, selectedTab === 'notes' && styles.selected]}>
                        <Image source={book} style={styles.notes} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('qp')}>
                    <View style={[styles.animationContainer, selectedTab === 'qp' && styles.selected]}>
                        <Image source={questionp} style={styles.qp} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '10%',
        borderWidth: 2,
        borderColor: 'rgba(211, 211, 211, 0.8)',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 65, 
        width: 65,  
    },
    selected: {
        borderWidth: 1,
        backgroundColor: '#e7feff',
        borderColor: '#00bfff', // Blue border when selected
        borderRadius: 10, // Adjust the radius as needed
        padding: 2, // Space between the border and the animation
    },
    home: {
        width: 45,
        height: 45,
        bottom: 5,
    },
    track: {
        width: 60,
        height: 60,
    },
    notes: {
        width: 60,  // Animation will scale with the container
        height: 60,
    },
    qp: {
        width: 50,
        height: 50,
    },
});

export default BottomTab;
