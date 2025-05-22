import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import blueFlame from '../../image/blue-blueflame.gif';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Streak = () => {
    const navigation = useNavigation();
    const viewShotRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [streak, setStreak] = useState(0);

    const updateStreak = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                const response = await axios.post('http://localhost:5000/api/update-streak', { token });
                setStreak(response.data.streak);
            }
        } catch (error) {
            console.error("Error updating streak:", error);
        }
    };

    useEffect(() => {
        updateStreak(); // Call updateStreak on component mount
    }, []);

    const captureAndShare = async (platform) => {
        try {
            const uri = await viewShotRef.current.capture();
            const options = {
                url: `file://${uri}`,
            };

            if (platform === 'whatsapp') {
                options.social = Share.Social.WHATSAPP;
            } else if (platform === 'linkedin') {
                options.social = Share.Social.LINKEDIN;
            }

            await Share.open(options);
        } catch (error) {
            console.error("Error sharing streak card:", error);
        } finally {
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundWrapper}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.arrow}
                        onPress={() => navigation.navigate('Course')}
                    >
                        <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Streak</Text>
                    </View>
                    <TouchableOpacity style={styles.share} onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="ios-share" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Header line */}
                <View style={{ width: '100%', borderWidth: 1, borderColor: 'rgba(211, 211, 211, 0.9)' }} />

                {/* Streak Update Card */}
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
                    <View style={styles.cardWrapper}>
                        <View style={styles.streakCard}>
                            <Text style={styles.streakNum}>{streak}</Text>
                            <Text style={styles.constStreak}>day streak!!</Text>
                        </View>
                    </View>
                </ViewShot>

                {/* Modal for sharing streak image */}
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Share Via</Text>
                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                <Pressable
                                    style={[styles.modalButton, styles.whatsappButton]}
                                    onPress={() => captureAndShare('whatsapp')}
                                >
                                    <FontAwesome6 name="whatsapp" size={30} color="white" style={styles.modalButtonAdj} />
                                </Pressable>

                                <Pressable
                                    style={[styles.modalButton, styles.linkedinButton]}
                                    onPress={() => captureAndShare('linkedin')}
                                >
                                    <FontAwesome6 name="linkedin-in" size={30} color="white" style={styles.modalButtonAdj} />
                                </Pressable>

                                <Pressable
                                    style={styles.modalCancelButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="close" size={24} color="black" style={styles.modalCancelButtonText} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Motivation card */}
                <View style={styles.cardWrapper}>
                    <View style={styles.motivationContainer}>
                        <Image source={blueFlame} style={{ width: 75, height: 75, marginBottom: 10 }} />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.textMot}>Come On!</Text>
                            <Text style={styles.textMot}>Let's achieve more</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scroll}>
                {/* Streak Calendar */}
                <View style={styles.calendarWrapper}>
                    <Text style={styles.calenderText}>Streak Calendar</Text>

                    {/* Calendar Component */}
                    <Calendar
                        style={styles.calendar}
                        markedDates={{
                            '2024-09-04': { selected: true, marked: true, selectedColor: '#00bfff' },
                            '2024-09-05': { marked: true },
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#00bfff',
                            todayTextColor: '#00bfff',
                            arrowColor: 'black',
                            monthTextColor: 'black',
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Streak;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gold',
    },
    arrow: {
        padding: 15,
    },
    scroll: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    share: {
        alignSelf: 'center',
        padding: 10,
    },
    backgroundWrapper: {
        backgroundColor: '#00bfff',
        paddingBottom: 10,
    },
    cardWrapper: {
        marginTop: 15,
        alignItems: 'center',
    },
    streakCard: {
        height: 280,
        width: '85%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    streakNum: {
        alignSelf: 'center',
        fontSize: 150,
        color: '#00bfff',
        fontWeight: 'bold',
    },
    constStreak: {
        fontSize: 30,
        color: 'gold',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    motivationContainer: {
        height: 100,
        borderRadius: 15,
        width: '85%',
        flexDirection: 'row',
        gap: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textMot: {
        color: '#00bfff',
        fontWeight: '500',
        fontSize: 20,
    },
    calendarWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 26,
        paddingBottom: 20,
    },
    calenderText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10,
    },
    calendar: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        elevation: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        padding: 15,
        borderRadius: 50,
        width: 60,
        height: 60,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whatsappButton: {
        backgroundColor: '#25D366',
    },
    linkedinButton: {
        backgroundColor: '#0077B5',
    },
    modalButtonAdj: {
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    modalCancelButton: {
        borderRadius: 50,
        height: 60,
        width: 60,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelButtonText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});
