import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Email from 'react-native-email';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TASKS_STORAGE_KEY = 'tasks_storage_key';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [timers, setTimers] = useState({});

    // Load tasks from AsyncStorage when the app starts
    useEffect(() => {
        loadTasks();
    }, []);

    // Save tasks to AsyncStorage whenever tasks change
    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks', error);
        }
    };

    const handleAddTask = () => {
        if (task) {
            const newTask = { text: task, completed: false };
            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            setTask('');
        }
    };

    const handleCompleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.item}>
            <Checkbox
                status={item.completed ? 'checked' : 'unchecked'}
                onPress={() => handleCompleteTask(index)}
                color="#00bfff"
            />
            <Text style={[styles.itemText, item.completed && styles.completed]}>
                {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <TextInput
                label="New Task"
                value={task}
                onChangeText={setTask}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: '#00bfff' } }}
            />
            <Button title="Add Task" onPress={handleAddTask} color="#00bfff" />
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00bfff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
        fontSize: 18,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemText: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'grey',
    },
    list: {
        marginTop: 20,
    },
});

export default App;
