import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

// Sample data for initial courses
const initialCourses = [
  { id: '1', name: 'Python', fee: '$200', progress: '75%' },
  { id: '2', name: 'C++', fee: '$150', progress: '50%' },
  { id: '3', name: 'Web Development', fee: '$300', progress: '60%' },
];

export default function EducationalApp() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', fee: '', progress: '' });

  // Add a new course function
  const addCourse = () => {
    if (newCourse.name && newCourse.fee && newCourse.progress) {
      setCourses([...courses, { ...newCourse, id: Math.random().toString() }]);
      setNewCourse({ name: '', fee: '', progress: '' });
      setShowForm(false);
    }
  };

  // Form for adding new courses
  const renderForm = () => {
    return (
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={newCourse.name}
          onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fee"
          value={newCourse.fee}
          onChangeText={(text) => setNewCourse({ ...newCourse, fee: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Progress (%)"
          value={newCourse.progress}
          onChangeText={(text) => setNewCourse({ ...newCourse, progress: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCourse}>
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, Jenny</Text>
        <TouchableOpacity style={styles.transactionButton}>
          <Text style={styles.transactionButtonText}>My Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Expenses (Course Fees) */}
      <Text style={styles.sectionTitle}>My Courses</Text>
      <FlatList
        horizontal
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.name}</Text>
            <Text style={styles.courseFee}>{item.fee}</Text>
            <Text style={styles.courseProgress}>{item.progress} Completed</Text>
          </View>
        )}
      />

      {/* Add New Course Button */}
      <TouchableOpacity style={styles.addIcon} onPress={() => setShowForm(!showForm)}>
        <Text style={styles.addIconText}>+</Text>
      </TouchableOpacity>

      {/* Show Form when the Add Button is Pressed */}
      {showForm && renderForm()}

      {/* Activities Section */}
      <Text style={styles.sectionTitle}>Learning Activity</Text>
      <View style={styles.activityList}>
        <Text style={styles.activityItem}>Started Python Module 1</Text>
        <Text style={styles.activityItem}>Completed C++ Assignment</Text>
        <Text style={styles.activityItem}>Practiced Web Development Basics</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionButton: {
    backgroundColor: '#3A3A3C',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  transactionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  courseCard: {
    backgroundColor: '#3A3A3C',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 150,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseFee: {
    color: '#8E8E93',
    marginTop: 5,
  },
  courseProgress: {
    color: '#8E8E93',
    marginTop: 5,
    fontSize: 12,
  },
  addIcon: {
    backgroundColor: '#0A84FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  addIconText: {
    color: '#fff',
    fontSize: 30,
  },
  form: {
    backgroundColor: '#3A3A3C',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  activityList: {
    marginTop: 10,
  },
  activityItem: {
    color: '#8E8E93',
    paddingVertical: 5,
  },
});
