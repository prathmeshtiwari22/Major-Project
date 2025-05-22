import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import BottomTab from './src/navigation/BottomTab';

const App = () => {
  return (
    <StackNavigation/>
  )
}

export default App

const styles = StyleSheet.create({})