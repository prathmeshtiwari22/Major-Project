import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CourseDetailScreen = ({ route }) => {
  const { courseType, course } = route.params;

  // Example lessons for demo purposes
  const lessons = [
    { id: 1, title: 'Introduction' },
    { id: 2, title: 'Variables' },
    { id: 3, title: 'Data Types' },
    { id: 4, title: 'Numbers' },
    { id: 5, title: 'Casting' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Course Image and Title */}
      <Image source={course.image} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{course.title}</Text>

      {/* About the Course */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About Course</Text>
        <Text style={styles.aboutText}>
          {course.title} is a detailed {courseType} course that covers essential programming concepts and helps you gain a deep understanding of the subject.
        </Text>
      </View>

      {/* Course Content */}
      <Text style={styles.sectionTitle}>Course Content</Text>
      {lessons.map((lesson) => (
        <View key={lesson.id} style={styles.lessonItem}>
          <Text style={styles.lessonNumber}>{lesson.id < 10 ? `0${lesson.id}` : lesson.id}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <TouchableOpacity style={styles.playButton}>
            <Image source={require('../assets/images/playbutton.png')} style={styles.playIcon} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  aboutContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lessonNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  lessonTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#000',
  },
  playButton: {
    padding: 10,
  },
  playIcon: {
    width: 24,
    height: 24,
  },
});

export default CourseDetailScreen;
