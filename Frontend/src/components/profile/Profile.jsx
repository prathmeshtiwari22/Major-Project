import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import defaultProfile from '../../../assets/images/engineer.png';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [imageExists, setImageExists] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [github, setGithub] = useState('');
    const [dob, setDob] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (!response.didCancel && !response.errorCode) {
                const selectedImageUri = response.assets[0].uri;
                setImagePreview(selectedImageUri); // Preview the selected image
                uploadImageToServer(selectedImageUri); // Upload the image to the server
            }
        });
    };

    const uploadImageToServer = async (imageUri) => {
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'profile.jpg',
        });

        try {
            const response = await axios.post('http://localhost:5000/api/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Image uploaded successfully:', response.data);
            await AsyncStorage.setItem('profileImage', imageUri);
            setImageExists(true);
            setImageUri(imageUri);
        } catch (error) {
            console.error('Image upload failed:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const token = AsyncStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profileImage', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileImage(response.data.imageUri);
            } catch (err) {
                console.error('Error fetching profile image:', err.message);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                }
            }
        };

        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsername(response.data.name);
                    setEmail(response.data.email);
                    setPassword('*'.repeat(response.data.password.length));
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchProfileImage();
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/userinfo', {
                bio, linkedIn, github, dob,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving data:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.arrow}
                    onPress={() => navigation.navigate('Course')}
                >
                    <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.profileText}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.profileContent}>
                    <View>
                        <Image source={imageUri ? { uri: imageUri } : defaultProfile} style={styles.imageAdj} />
                        <TouchableOpacity style={styles.colorpen} onPress={handleImagePick}>
                            <MaterialCommunityIcons name="pencil-plus" size={30} color="#00bfff" style={styles.pencil} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.input}>{username}</Text>
                            </View>
                        </View>
                        <View style={styles.mailContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.input}>{email}</Text>
                            </View>
                        </View>
                        <View style={styles.passwordContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.input}>{password}</Text>
                            </View>
                        </View>
                        <View style={[styles.bioContainer, { height: 150 }]}>
                            <Text style={styles.label}>Bio/Description</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    placeholder="Provide a short bio"
                                    placeholderTextColor={"white"}
                                    value={bio}
                                    onChangeText={setBio}
                                    style={[styles.input, { height: 120, paddingTop: 10, textAlignVertical: 'top' }]}
                                />
                            </View>
                        </View>

                        <View style={styles.linksContainer}>
                            <View style={styles.card}>
                                <Text style={styles.cardLabel}>LinkedIn</Text>
                                <TextInput
                                    placeholder="Enter LinkedIn URL"
                                    placeholderTextColor={"#00bfff"}
                                    value={linkedIn}
                                    onChangeText={setLinkedIn}
                                    style={styles.cardInput}
                                />
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.cardLabel}>GitHub</Text>
                                <TextInput
                                    placeholder="Enter GitHub URL"
                                    placeholderTextColor={"#00bfff"}
                                    value={github}
                                    onChangeText={setGithub}
                                    style={styles.cardInput}
                                />
                            </View>
                        </View>

                        <View style={styles.dobContainer}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialCommunityIcons name="calendar" size={25} color="black" style={styles.icon} />
                                <TextInput
                                    placeholder="Enter birthdate (DD/MM/YYYY)"
                                    placeholderTextColor={"white"}
                                    value={dob}
                                    onChangeText={setDob}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bgsubmit} onPress={handleSubmit}>
                        <Text style={styles.submitbutton}>SUBMIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bgdelete}>
                        <Text style={styles.deletebutton}>DELETE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
    },
    arrow: {
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        gap: 90
    },
    input: {
        padding: 15,
        color: 'white'
    },
    profileText: {
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    profileContent: {
        backgroundColor: '#00bfff',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 30,
    },
    imageAdj: {
        marginTop: 20,
        width: 150,
        height: 150,
        borderWidth: 3,
        borderColor: 'blue',
        alignSelf: 'center',
        borderRadius: 75,
    },
    colorpen: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderColor: '#ffa500',
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 125,
        left: '55%',
    },
    pencil: {
        position: 'absolute',
        alignSelf: 'center'
    },
    nameContainer: {
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
    },
    mailContainer: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    passwordContainer: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
    },
    bioContainer: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
    },
    dobContainer: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00bfff',
        borderRadius: 10,
        padding: 2,
        width: '90%',
        borderWidth: 2,
        borderColor: 'white',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        width: '90%',
        textAlign: 'left',
        marginBottom: 2,
    },
    icon: {
        marginRight: 1,
    },
    optionalText: {
        color: 'red',
        fontWeight: 'normal',
    },
    linksContainer: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        width: '45%',
        backgroundColor: 'white',
        borderColor: '#00bfff',
        borderWidth: 5,
        borderRadius: 20,
        padding: 10,
    },
    cardLabel: {
        color: '#00bfff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardInput: {
        color: '#00bfff',
        width: '100%',
    },
    submitbutton: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bfff'
    },
    bgsubmit: {
        borderBottomWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: 15,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        borderRadius: 25
    },
    deletebutton: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    bgdelete: {
        borderBottomWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: 15,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        borderRadius: 25
    }
})