import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ChapterList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const title = route.params?.title;
    const year = route.params?.year;
    const [data, setData] = useState([]);

    useEffect(() => {
        const handleSetData = () => {
            let data = [];
            switch (title) {
                case 'ARVR':
                    data = [
                        {
                            id: '1',
                            title: 'ARVR',
                            code: '824',
                            year: '2023',
                            file: require('../../../assets/ARVR/PL.pdf'),
                        },
                        {
                            id: '2',
                            title: 'ARVR',
                            code: '824',
                            year: '2022',
                            file: require('../../../assets/ARVR/arvr.pdf'),
                        },
                        {
                            id: '3',
                            title: 'NLP',
                            code: '824',
                            year: '2023',
                            file: require('../../../assets/ARVR/AV-VR.pdf'),
                        },
                        {
                            id: '4',
                            title: 'ARVR',
                            code: '824',
                            year: '2022',
                            file: require('../../../assets/ARVR/FPF-ARVR-Report-4.16.21-Digital.pdf'),
                        },
                        {
                            id: '5',
                            title: 'ARVR',
                            code: '824',
                            year: '2023',
                            file: require('../../../assets/ARVR/private-5g-edge-compute-and-ar-vr.pdf'),
                        },
                    ];
                    break;

                case 'BDA':
                    data = [
                        {
                            id: '1',
                            title: 'BDA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/BDA/1_Big-Data-Analytics_AKM.pdf'),
                        },
                        {
                            id: '2',
                            title: 'BDA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/BDA/BDAPPTS.pdf'),
                        },
                        {
                            id: '3',
                            title: 'BDA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/BDA/bda1.pdf'),
                        },
                        {
                            id: '4',
                            title: 'BDA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/BDA/Big_Data_Analytics_-_Unit_1.pdf'),
                        },
                        {
                            id: '5',
                            title: 'BDA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/BDA/DECAP456_INTRODUCTION_TO_BIG_DATA.pdf'),
                        },
                    ];
                    break;

                case 'ML':
                    data = [
                        {
                            id: '1',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/ML/ml1.pdf'),
                        },
                        {
                            id: '2',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/ML/ml2.pdf'),
                        },
                        {
                            id: '3',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/ML/ml3.pdf'),
                        },
                        {
                            id: '4',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/ML/machine_learning_tutorial.pdf'),
                        },
                        {
                            id: '5',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/ML/thebook.pdf'),
                        },
                    ];
                    break;

                case 'NLP':
                    data = [
                        {
                            id: '1',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/NLP/NLP1.pdf'),
                        },
                        {
                            id: '2',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/NLP/NLP2.pdf'),
                        },
                        {
                            id: '3',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/NLP/NLP3.pdf'),
                        },
                        {
                            id: '4',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/NLP/NLP4.pdf'),
                        },
                        {
                            id: '5',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/NLP/NLTK.pdf'),
                        },
                    ];
                    break;
                case 'MIS':
                    data = [
                        {
                            id: '1',
                            title: 'MIS',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/MIS/140304.pdf'),
                        },
                        {
                            id: '2',
                            title: 'MIS',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/MIS/1584984045MIS_LECTURE_NOTE_1.pdf'),
                        },
                        {
                            id: '3',
                            title: 'MIS',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/MIS/MIS-Notes_New_-word.pdf'),
                        },
                        {
                            id: '4',
                            title: 'MIS',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/MIS/BBAR_303_slm.pdf'),
                        },
                        {
                            id: '5',
                            title: 'NLP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/MIS/MIS_Unit-2.pdf'),
                        },
                    ];
                    break;
                case 'DSA':
                    data = [
                        {
                            id: '1',
                            title: 'DSA',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/DSA/Dsa.pdf'),
                        },

                    ];
                    break;
                case 'C':
                    data = [
                        {
                            id: '1',
                            title: 'C',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/DSA/CP.pdf'),
                        },

                    ];
                    break;
                case 'CPP':
                    data = [
                        {
                            id: '1',
                            title: 'CPP',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/DSA/Dsa.pdf'),
                        },

                    ];
                    break;
                case 'Python':
                    data = [
                        {
                            id: '1',
                            title: 'Pyhon',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/DSA/Tutorial_EDIT.pdf'),
                        },

                    ];
                    break;

                default:
                    break;
            }

            setData(data);
        };

        handleSetData();
    }, [title]);

    const handlePress = (item) => {
        if (!item?.file) {
            return;
        }
        navigation.navigate('ShowPDF', { file: item.file });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
            <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {item.title} Previous Years {item.year}
                </Text>
                <TouchableOpacity
                    onPress={() => handlePress(item)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ backgroundColor: 'red' }}>
            {!data.length ? (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>
                        No content available yet. Coming soon!
                    </Text>
                    <Text style={styles.placeholderText}>Please check others! </Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.container}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#1F2B60',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        elevation: 2,
    },
    indexCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#18B3FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    indexText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    button: {
        backgroundColor: '#18B3FA',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',  // Darker text color
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',  // Darker placeholder text color
    },
});

export default ChapterList;