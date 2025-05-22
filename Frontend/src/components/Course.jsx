import {TouchableOpacity ,Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Streak from '../image/streak.png'
import Octicons from 'react-native-vector-icons/Octicons';
import level from '../image/basiclevel.png';
import goldlevel from '../image/goldlevel.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import home from '../image/home.png'
import book from '../image/book.png';
import track from '../image/track.png';
import questionp from '../image/questionPaper.png';
import { questionsByLevel } from '../test/questions';

const Course = () => {
  const [username, setUsername] = useState('');
  const [selectedTab, setSelectedTab] = useState(null);
  const [boxColor, setBoxColor] = useState('#00bfff');
  const [todoColor, setTodoColor] = useState('#00bfff');
  const [unitNumber, setUnitNumber] = useState(1); // Add state for unit number
  const [streak, setStreak] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

    const updateStreak = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); // Get the JWT token from storage

            if (token) {
              const response = await axios.post('http://192.168.0.104:5000/api/update-streak', { token });
                setStreak(response.data.streak);
            }
        } catch (error) {
            console.error("Error updating streak:", error);
        }
    };

    useEffect(() => {
        updateStreak(); // Call updateStreak on component mount
    }, []);

    useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage'); // Fetch image URI from AsyncStorage
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error('Failed to load profile image', error);
      }
    };

    loadProfileImage(); // Load image when component mounts
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://192.168.0.104:5000/api/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsername(response.data.name);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUsername();
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const unitHeight = 500; // Adjust this value to match the height of your unit sections

    // Calculate unit number based on scroll position
    const newUnitNumber = Math.floor(scrollPosition / unitHeight) + 1;

    // Update colors based on the unit number
    let newBoxColor = '#00bfff'; 
    let newTodoColor = '#00bfff'; 

    const colors = [
      '#00bfff', // Default color (Unit 1)
      '#32cd32', // Color for 2nd unit
      '#ff6347', // Color for 3rd unit
      '#ff4500', // Color for 4th unit
      '#ff8c00', // Color for 5th unit
      '#ffa500', // Color for 6th unit
      '#ffd700', // Color for 7th unit
      '#ffff00', // Color for 8th unit
    ];

    if (newUnitNumber >= 1 && newUnitNumber <= colors.length) {
      newBoxColor = colors[newUnitNumber - 1];
      newTodoColor = colors[newUnitNumber - 1];
    }

    setBoxColor(newBoxColor);
    setTodoColor(newTodoColor);
    setUnitNumber(newUnitNumber);
  };

  const repeatCount = 7;
  return (
    <View style={styles.container}>
      {/* Header */}
        <View style={styles.position}>
        <Text style={styles.text}>Hey, {username}👋</Text>
          <TouchableOpacity style={styles.streakcount} onPress={() => navigation.navigate('Streak')}>
            <Image style={styles.streak} source={Streak} />
            <Text style={styles.streaktext}>{streak}</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.image}
            source={profileImage ? { uri: profileImage } : require('../../assets/images/engineer.png')} // Show user-uploaded image or fallback to default
          />
        </TouchableOpacity>
        </View>

        {/* Section and ToDo List */}
        <View style={styles.row}>
        <TouchableOpacity style={[styles.box, { backgroundColor: boxColor }]}>
            <View style={{ padding: 20 }}>
            <Text style={{ color: 'rgba(211, 211, 211, 0.9)', fontSize: 16, fontWeight: '500' }}>SECTION 1, UNIT {unitNumber}</Text>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>SUBJECT NAME</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.verticalLine} />
        <TouchableOpacity style={[styles.todo, { backgroundColor: todoColor }]} onPress={() => navigation.navigate('Todo')}>
            <Octicons name="checklist" size={30} color="white" style={{alignSelf: 'center'}} /> 
          </TouchableOpacity>
        </View>

        {/* Levels */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} onScroll={handleScroll}
        scrollEventThrottle={16}>
        {Array.from({ length: repeatCount }).map((_, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.imagecentre} onPress={() => navigation.navigate('Test', { level: 1 })}>
              <Image style={styles.level} source={level} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.seccentre} onPress={() => navigation.navigate('Test', { level: 2 })}>
              <Image style={styles.level} source={level} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.thirdcentre} onPress={() => navigation.navigate('Test', { level: 3 })}>
              <Image style={styles.level} source={level} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fourcentre} onPress={() => navigation.navigate('Test', { level: 4 })}>
              <Image style={styles.level} source={goldlevel} />
            </TouchableOpacity>

            {/* Line with text */}
            <View style={styles.linehorizontal}>
              <View style={styles.line} />
              <Text style={styles.linetext}>Let's move to next round</Text>
              <View style={styles.line} />
            </View>
          </React.Fragment>
        ))}
      </ScrollView>

      {/* BottomTab */}
      <View style={styles.tabcontainer}>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => {
            setSelectedTab('home');
            navigation.navigate('Course')
          }}>
            <View style={[styles.animationContainer, selectedTab === 'home' && styles.selected]}>
              <Image source={home} style={styles.home} />
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
          <TouchableOpacity onPress={() => {
            setSelectedTab('notes');
            navigation.navigate('Notes');
          }}>
            <View style={[styles.animationContainer, selectedTab === 'notes' && styles.selected]}>
              <Image source={book} style={styles.notes} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedTab('qp'); navigation.navigate('Questionp') }}>
            <View style={[styles.animationContainer, selectedTab === 'qp' && styles.selected]}>
              <Image source={questionp} style={styles.qp} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Course

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1
  },
  bottomTab: {
    height: 200,  // Set a fixed height for the BottomTab
  },
  tabcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tab: {
    position: 'absolute',
    borderTopWidth: 2,
    borderColor: 'rgba(211, 211, 211, 0.8)',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 85,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
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
    width: 100,
    height: 100,
  },
  track: {
    width: 70,
    height: 70,
  },
  notes: {
    width: 45,  // Animation will scale with the container
    height: 45,
  },
  qp: {
    width: 70,
    height: 70,
  },
  position: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    padding: 20,
    fontSize: 18,
    fontWeight: '600'
  },
  streak: {
    height: 35,
    width: 35,
    alignSelf: 'center'
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#00bfff',
    marginTop: 10,
    marginRight: 15
  },
  streakcount: {
    flexDirection: 'row'
  },
  streaktext: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    top: 5
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    height: 80, // Same height as the boxes
  },
  box: {
    justifyContent: 'center',
    width: '85%',
    height: 80,
    backgroundColor: '#32cd32',
    borderBottomWidth: 3,
    borderColor: '#555d50',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignSelf: 'center',
  },
  todo: {
    width: '15%',
    height: 80,
    backgroundColor: '#32cd32',
    borderBottomWidth: 3,
    borderColor: '#555d50',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',   
  },
  level: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imagecentre: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 105, // Width and height should be equal for a perfect circle
    height: 105,
    borderRadius: 50, // This makes the image circular
    borderWidth: 2, // Border width
    borderColor: '#00bfff', // Border color
    backgroundColor: '#e7feff',
  },
  seccentre: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    width: 105, // Width and height should be equal for a perfect circle
    height: 105,
    borderRadius: 50, // This makes the image circular
    borderWidth: 2, // Border width
    borderColor: '#00bfff', // Border color
    backgroundColor: '#e7feff',
  },
  thirdcentre: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150,
    width: 105, // Width and height should be equal for a perfect circle
    height: 105,
    borderRadius: 50, // This makes the image circular
    borderWidth: 2, // Border width
    borderColor: '#00bfff', // Border color
    backgroundColor: '#e7feff',
  },
  fourcentre: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 100,
    width: 105, // Width and height should be equal for a perfect circle
    height: 105,
    borderRadius: 50, // This makes the image circular
    borderWidth: 2, // Border width
    borderColor: '#ffd700', // Border color
    backgroundColor: 'rgb(247,233,195)',
  },
  linehorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
  },
  linetext: {
    fontWeight: '600',
    color: '#808080',
    fontSize: 18
  }
})
