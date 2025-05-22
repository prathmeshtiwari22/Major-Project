import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SemesterSelect = () => {
    const navigation = useNavigation();
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [subjectList, setSubjectList] = useState([]);

    // Define semesters and their corresponding subjects
    const semesters = {
        1: ['Mathematics', 'Physics'],
        2: ['Chemistry', 'Biology'],
        3: ['Data Structures', 'Algorithms'],
        4: ['Operating Systems', 'Machine Learning'],
        5: ['Software Engineering', 'Computer Networks'],
        6: ['Web Development', 'Mobile Application Development'],
        7: ['Artificial Intelligence', 'Database Management Systems'],
        8: ['Cloud Computing', 'Cyber Security'],
    };

    // Function to handle semester selection
    const handleSemesterSelect = (semester) => {
        setSelectedSemester(semester);
        setSubjectList(semesters[semester]);
        setSelectedSubject(null); // Reset selected subject on semester change
        setModalVisible(false); // Close the semester modal
    };

    // Function to handle subject selection
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        navigation.navigate('Course', { subject }); // Navigate to Course screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Semester</Text>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                    setModalVisible(true); // Open semester selection modal
                }}
            >
                <Text style={styles.dropdownText}>
                    {selectedSemester ? `Semester ${selectedSemester}` : 'Select Semester'}
                </Text>
            </TouchableOpacity>

            {selectedSemester && (
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => {
                        setModalVisible(true); // Open subject selection modal
                    }}
                >
                    <Text style={styles.dropdownText}>
                        {selectedSubject || 'Select Subject'}
                    </Text>
                </TouchableOpacity>
            )}

            {/* Semester Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Select Semester</Text>
                    <FlatList
                        data={Object.keys(semesters)}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => handleSemesterSelect(item)}
                            >
                                <Text style={styles.modalItemText}>Semester {item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Subject Modal */}
            {selectedSemester && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!subjectList.length}
                    onRequestClose={() => setSubjectList([])} // Reset subject list
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Select Subject</Text>
                        <FlatList
                            data={subjectList}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSubjectSelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSubjectList([])} // Reset subject list
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dropdown: {
        width: '80%',
        padding: 15,
        borderWidth: 2,
        backgroundColor: '#e8f4f8',
        borderColor: '#00bfff',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: '#00bfff'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    modalItem: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 5,
        width: 300,
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 18,
        color: 'black'
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#ff6347',
        borderRadius: 5,
        width: '80%',
        marginTop: 20,
    },
    closeButtonText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default SemesterSelect;
