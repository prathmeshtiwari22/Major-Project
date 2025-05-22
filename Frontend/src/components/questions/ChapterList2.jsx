import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ChapterList2 = () => {
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
                            file: require('../../../assets/Papers/ARVR.pdf'),
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
                            file: require('../../../assets/Papers/BDA.pdf'),
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
                            file: require('../../../assets/Papers/ML1.pdf'),
                        },
                        {
                            id: '2',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets/Papers/ML2.pdf'),
                        },
                        {
                            id: '3',
                            title: 'ML',
                            code: '822',
                            year: '2023',
                            file: require('../../../assets//Papers/ML3.pdf'),
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
                            file: require('../../../assets/Papers/NLP.pdf'),
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
                            file: require('../../../assets/Papers/MIS.pdf'),
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

export default ChapterList2;
