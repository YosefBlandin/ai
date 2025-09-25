/**
 * @fileoverview Main app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text } from 'react-native';
import { APP_TEXT } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';
import { RootStackParamList } from '@aidonic/shared-types';
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
              backgroundColor: colors.background.primary,
            },
            headerTintColor: colors.text.primary,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="DistributionList"
            component={DistributionListScreen}
            options={({ navigation }) => ({
              title: APP_TEXT.titles.distributions,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate('Charts')}
                >
                  <Text
                    style={{ color: colors.primary[500], fontWeight: '500' }}
                  >
                    {APP_TEXT.navigation.charts}
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="DistributionDetails"
            component={DistributionDetailsScreen}
            options={{
              title: APP_TEXT.titles.distributionDetails,
            }}
          />
          <Stack.Screen
            name="Charts"
            component={ChartsScreen}
            options={{
              title: APP_TEXT.titles.analytics,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
