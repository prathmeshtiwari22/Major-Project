import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Track = () => {
  const navigation = useNavigation();

  // Replace "XYZ" with the actual username dynamically
  const userName = 'XYZ';

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome to our Course</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')} // Navigate to Profile Screen
        >
          <Image
            source={require('../../../assets/images/engineer.png')} // Your profile image source
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Course"
          placeholderTextColor="#000" // Black placeholder text
        />
      </View>

      {/* Course Screen Image */}
      <Image
        source={require('../../../assets/images/download1.png')} // Your course screen image source
        style={styles.courseScreenImage}
      />

      {/* Video Course Section */}
      <Text style={styles.sectionTitle}>Video Course</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 1',
              image: require('../../../assets/images/ai.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/ai.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Video Course 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 2',
              image: require('../../../assets/images/dsa.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/dsa.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Video Course 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 3',
              image: require('../../../assets/images/dsa.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/dsa.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Video Course 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 4',
              image: require('../../../assets/images/dsa.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/dsa.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Video Course 4</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Basic Course Section */}
      <Text style={styles.sectionTitle}>Basic Course</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 1',
              image: require('../../../assets/images/how.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/how.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Basic Course 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 2',
              image: require('../../../assets/images/ml.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/ml.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Basic Course 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 3',
              image: require('../../../assets/images/ml.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/ml.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Basic Course 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Basic Course 4',
              image: require('../../../assets/images/ml.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/ml.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Basic Course 4</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Advanced Course Section */}
      <Text style={styles.sectionTitle}>Advanced Course</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      <TouchableOpacity
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetailScreen', {
            courseType: 'Basic',
            course: {
              title: 'Advanced Course 1',
              image: require('../../../assets/images/python.jpg'), // Correct image path
            }
          })}
        >
          <Image
            source={require('../../../assets/images/python.jpg')}
            style={styles.courseImage}
          />
          <Text style={styles.courseTitle}>Advanced Course 1</Text>
        </TouchableOpacity>
        
<TouchableOpacity
  style={styles.courseCard}
  onPress={() => navigation.navigate('CourseDetailScreen', {
    courseType: 'Basic',
    course: {
      title: 'Advanced Course 2',
      image: require('../../../assets/images/c.jpg'), // Correct image path for course 2
    }
  })}
>
  <Image
    source={require('../../../assets/images/c.jpg')}
    style={styles.courseImage}
  />
  <Text style={styles.courseTitle}>Advanced Course 2</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.courseCard}
  onPress={() => navigation.navigate('CourseDetailScreen', {
    courseType: 'Basic',
    course: {
      title: 'Advanced Course 3',
      image: require('../../../assets/images/cplus.jpg'), // Correct image path for course 3
    }
  })}
>
  <Image
    source={require('../../../assets/images/cplus.jpg')}
    style={styles.courseImage}
  />
  <Text style={styles.courseTitle}>Advanced Course 3</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.courseCard}
  onPress={() => navigation.navigate('CourseDetailScreen', {
    courseType: 'Basic',
    course: {
      title: 'Advanced Course 4',
      image: require('../../../assets/images/nlp.jpg'), // Correct image path for course 4
    }
  })}
>
  <Image
    source={require('../../../assets/images/nlp.jpg')}
    style={styles.courseImage}
  />
  <Text style={styles.courseTitle}>Advanced Course 4</Text>
</TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    color: '#000',
  },
  courseScreenImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    padding: 10,
  },
  horizontalScroll: {
    paddingLeft: 10,
  },
  courseCard: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  courseTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default Track;