import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/Homescreen';
import HomeScree from './screens/Homescreen';

export default function App() {
  return (
    <SafeAreaProvider>
    <View>
      <HomeScreen/>
    </View>
    </SafeAreaProvider>
  );
}

