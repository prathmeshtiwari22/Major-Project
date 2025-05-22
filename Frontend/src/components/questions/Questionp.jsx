import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const data = [
    { id: '1', title: 'BDA', description: 'Previous Year Paper', image: require('../../../assets/images/bda.jpg'), slug: 'BDA', color: '#008000' },  // Green
    { id: '2', title: 'ML', description: 'Previous Year Paper', image: require('../../../assets/images/ml.jpg'), slug: 'ML', color: '#FFA500' },   // Orange
    { id: '3', title: 'NLP', description: 'Previous Year Paper', image: require('../../../assets/images/nlp.jpg'), slug: 'NLP', color: '#FF0000' },  // Red
    { id: '4', title: 'MIS', description: 'Previous Year Paper', image: require('../../../assets/images/mis.jpg'), slug: 'MIS', color: '#FFC0CB' },  // Pink
    { id: '5', title: 'ARVR', description: 'Previous Year Paper', image: require('../../../assets/images/arvr.jpg'), slug: 'ARVR', color: '#FFFF00' }, // Yellow
];
const prerequisitesData = {
    BDA: [
        'Basic Knowledge of Data Structures',
        'Basic Knowledge of Algorithms',
        'Familiarity with Database Management',
        'Understanding of Cloud Computing',
        'Basic knowledge of Python/R Programming',
    ],
    ML: [
        'Understanding of Linear Algebra and Calculus',
        'Familiarity with Machine Learning Algorithms',
        'Basic knowledge of Python Programming',
        'Experience with data processing libraries (e.g., Pandas, NumPy)',
    ],
    NLP: [
        'Basic knowledge of Linguistics',
        'Familiarity with Python and NLP Libraries (e.g., NLTK, SpaCy)',
        'Understanding of Text Processing Techniques',
    ],
    MIS: [
        'Basic knowledge of Management Concepts',
        'Understanding of Information Systems',
        'Familiarity with Database Management and ER Diagrams',
    ],
    ARVR: [
        'Basic Knowledge of 3D Modeling and Animation',
        'Understanding of AR/VR Development Frameworks',
        'Familiarity with Unity or Unreal Engine',
    ],
    DSA: [
        'Strong Knowledge of Data Structures and Algorithms',
        'Familiarity with Programming Languages (C/C++/Java)',
        'Understanding of Problem-Solving Techniques',
    ],
    C: [
        'Understanding of Procedural Programming',
        'Familiarity with C Syntax and Semantics',
        'Knowledge of Pointers and Memory Management',
    ],
    CPP: [
        'Understanding of Object-Oriented Programming',
        'Familiarity with C++ Syntax and Libraries',
        'Knowledge of Inheritance and Polymorphism',
    ],
    Python: [
        'Basic understanding of Python Syntax',
        'Familiarity with Python Libraries (NumPy, Pandas, etc.)',
        'Experience with Functions, Modules, and Packages',
    ],
};


const Questionp = () => {
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState(''); // Handle dropdown toggle for each subject
    const [search, setSearch] = useState(''); // Search functionality
    const [filteredData, setFilteredData] = useState(data);

    const handleCardPress = (item) => {
        navigation.navigate('ChapterList2', { title: item.title });
    };

    const handlePrerequisitesToggle = (item) => {
        setExpanded(expanded === item.title ? '' : item.title);
    };

    const renderPrerequisites = (item) => {
        const subjectPrerequisites = prerequisitesData[item.title] || [];
        return (
            <View style={[styles.prerequisitesContainer, { backgroundColor: item.color }]}>
                {subjectPrerequisites.map((prerequisite, index) => (
                    <Text key={index} style={styles.prerequisiteItem}>
                        - {prerequisite}
                    </Text>
                ))}
            </View>
        );
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(data);
            setSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search Box */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, { backgroundColor: '#f0f0f0' }]} // Added background color for better contrast
                    placeholder="Search previous year papers..."
                    placeholderTextColor="gray"  // Placeholder color changed to gray for contrast
                    value={search}
                    onChangeText={text => searchFilter(text)}
                />
            </View>

            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View style={[styles.cardContainer, { borderColor: item.color, backgroundColor: '#FFFFFF' }]}>
                        <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.card}>
                            <View style={styles.leftContent}>
                                <Text style={styles.title}>{item.title}</Text>
                                <TouchableOpacity onPress={() => handlePrerequisitesToggle(item)} style={[styles.prerequisitesButton, { backgroundColor: '#FFFFFF' }]}>
                                    <Text style={[styles.prerequisitesButtonText, { color: item.color }]}>Prerequisites</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={item.image} style={styles.image} />
                        </TouchableOpacity>
                        {expanded === item.title && renderPrerequisites(item)}
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default Questionp;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',  // Main background is white
        flex: 1,
    },
    searchContainer: {
        backgroundColor: '#FFFFFF',  // White background for the search box
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderColor: '#0000FF',  // Blue border for search box
        borderWidth: 1,
    },
    searchInput: {
        height: 40,  // Ensure the input has enough height for the text to display properly
        color: 'black',  // Text input color is black for good visibility
        fontSize: 16,
        padding: 10,  // Added padding for better user experience
        backgroundColor: '#f0f0f0',  // Light background color for contrast
        borderRadius: 8,  // Optional: rounded corners for better aesthetics
    },
    cardContainer: {
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2, // Border color set per card
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 10,
    },
    prerequisitesButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 5,
    },
    prerequisitesButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    prerequisitesContainer: {
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    prerequisiteItem: {
        fontSize: 16,
        color: 'black',  // Text color for prerequisites
        marginBottom: 5,
    },
});