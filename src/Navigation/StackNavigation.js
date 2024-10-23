import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Quiz from '../components/Quiz';
import PYP from '../components/PYP'; // Ensure this component exists
import Couses from '../components/Couses';
import Home from '../components/Home';
import ChapterList from '../components/ChapterList';
import ShowPDF from '../components/ShowPdf';
import PaperHome from '../components/PaperHome';
import ChapterList2 from '../components/ChapterList2';
import BudgetScreen from '../components/BudgetScreen';
import CourseDetailScreen from '../components/CourseDetailScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigation for Home
const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#1F2B60',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen
          name="ChapterList"
          component={ChapterList}
          options={({route}) => ({
            title: route.params.title || 'Previous Year Paper',
          })}
        />
         <Stack.Screen name="ShowPDF" component={ShowPDF} />
         <Stack.Screen
          name="ChapterList2"
          component={ChapterList2}
          options={({route}) => ({
            title: route.params.title || 'Previous Year Paper',
          })}
        />
         <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
         <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={StackNavigation}
        options={{
          headerShown:false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/home.jpg')}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'orange' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={BudgetScreen}
        options={{
          title: 'Quiz',
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/wishlist.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'orange' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Courses" // Corrected the typo from "Couses" to "Courses"
        component={Couses}
        options={{
          title: 'Courses',
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/orders.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'orange' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="PYP"
        component={PaperHome}
        options={{
          title: 'PYP',
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/user.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'orange' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'black',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
