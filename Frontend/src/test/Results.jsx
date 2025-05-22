import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Results = ({ route, navigation }) => {
    const { score, timer } = route.params;

    // Convert seconds to minutes and seconds
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>Test Completed!</Text>

            {/* Container for score and time beside each other */}
            <View style={styles.row}>
                <View style={styles.scoreBox}>
                    <Text style={styles.scoreText}>{score}/{score}</Text>
                </View>
                <View style={styles.timeBox}>
                    <Text style={styles.timeText}>{formatTime(timer)}</Text>
                </View>
                <View style={styles.complementBox}>
                    <Text style={styles.complementText}>Great!</Text>
                </View>
            </View>

            {/* Buttons with same width and a gap */}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Restart Quiz"
                        onPress={() => navigation.navigate('Test', { level: route.params.level })}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        color={'red'}
                        title="Close"
                        onPress={() => navigation.navigate('Course')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    resultText: {
        fontSize: 24,
        marginBottom: 20,
        top: 20,
        color: 'black',
        position: 'absolute'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30, // Space between text and buttons
    },
    scoreBox: {
        width: '30%',
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: '#e6ffe6', // Light green background
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    scoreText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    timeBox: {
        width: '30%',
        borderWidth: 2,
        borderColor: '#F6BE00',
        backgroundColor: '#ffffe6', // Light yellow background
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    timeText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F6BE00',
    },
    complementBox: {
        width: '30%',
        borderWidth: 2,
        borderColor: '#00bfff',
        backgroundColor: '#e8f4f8', // Light green background
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    complementText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00bfff',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        width: '100%',
        marginVertical: 5, // Gap of 10 between buttons (5 each side)
    },
});

export default Results;
