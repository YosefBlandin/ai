import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text } from 'react-native';
import { RootStackParamList } from '@/types';
import { DistributionListScreen } from '@/screens/DistributionListScreen';
import { DistributionDetailsScreen } from '@/screens/DistributionDetailsScreen';
import { ChartsScreen } from '@/screens/ChartsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="DistributionList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#111827',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="DistributionList"
            component={DistributionListScreen}
            options={({ navigation }) => ({
              title: 'Aid Distributions',
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate('Charts')}
                >
                  <Text style={{ color: '#3B82F6', fontWeight: '500' }}>
                    Charts
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="DistributionDetails"
            component={DistributionDetailsScreen}
            options={{
              title: 'Distribution Details',
            }}
          />
          <Stack.Screen
            name="Charts"
            component={ChartsScreen}
            options={{
              title: 'Analytics',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
