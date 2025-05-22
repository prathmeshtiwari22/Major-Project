import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { questionsByLevel } from '../test/questions'; // Import your questions file

const Test = ({ navigation, route }) => {
    const { level } = route.params; // Get the selected level

    // Handle the case where questions for the level are undefined
    const questions = questionsByLevel[level] || []; // Load questions for the selected level

    // Check if there are any questions for the given level
    if (questions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No questions found for this level.</Text>
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0); // Timer state

    const currentQuestion = questions[currentQuestionIndex];

    // Handle answer selection
    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        if (answer === currentQuestion.correctAnswer) {
            setFeedback('Correct!');
            setScore(score + 1); // Increase score if correct
        } else {
            setFeedback('Incorrect! Try again.');
        }
    };

    // Move to the next question or navigate to results
    const nextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Navigate to Results Screen with score and time
            navigation.navigate('Results', { score, timer, level });
        }
    };

    // Timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000); // Increment timer every second

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    // Convert seconds to minutes and seconds
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>Time: {formatTime(timer)}</Text>
            <Text style={styles.questionText}>{currentQuestionIndex + 1}. {currentQuestion.question}</Text>

            {/* Options as Buttons with letter labels */}
            {currentQuestion.options.map((option, index) => {
                const label = String.fromCharCode(97 + index); // Convert index to 'a', 'b', 'c', 'd'
                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedAnswer === option ? styles.selectedOption : null
                        ]}
                        onPress={() => handleAnswer(option)}
                    >
                        <Text style={styles.optionText}>{label}. {option}</Text>
                    </TouchableOpacity>
                );
            })}

            {/* Feedback message */}
            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

            {/* Button to move to the next question */}
            <TouchableOpacity
                style={[
                    styles.nextButton,
                    { backgroundColor: feedback ? '#00bfff' : '#d3d3d3' }
                ]}
                onPress={nextQuestion}
                disabled={!feedback || feedback === 'Incorrect! Try again.'}
            >
                <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
    },
    timer: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#00bfff',
        fontWeight: 'bold',
    },
    optionButton: {
        backgroundColor: '#f0f8ff',
        padding: 15,
        marginVertical: 10,
    },
    selectedOption: {
        backgroundColor: '#00bfff',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
    feedback: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#00bfff',
    },
    nextButton: {
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Test;
