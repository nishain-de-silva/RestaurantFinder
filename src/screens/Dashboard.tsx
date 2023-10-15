import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootParamStack } from "../../Main"
import React from "react"
import auth from '@react-native-firebase/auth'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import WeatherDetails from "./WeatherDetails"
import RestuarantDetails from "./RestuarantDetails"
import weatherIcon from '../assets/weather.png'
import resturantIcon from '../assets/restaurant.png'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type DashboardPageProps = NativeStackScreenProps<RootParamStack, 'dashboard'>

export type DashboardNavigatorScreenProps = {
    weather: undefined,
    resturants: undefined
}

const Tab = createBottomTabNavigator<DashboardNavigatorScreenProps>()

export default ({ route, navigation }: DashboardPageProps) => {
    const renderTabIcon = (routeName: string): BottomTabNavigationOptions['tabBarIcon'] => {
        return ({ size }) => <Image
            source={routeName == 'weather' ? weatherIcon : resturantIcon}
            style={{ height: size, width: size }}
        />
    }

    const signOut = async () => {
        if (auth().currentUser?.providerData[0].providerId == 'facebook.com')
            LoginManager.logOut()
        await auth().signOut()

        navigation.navigate('auth')
    }

    return <Tab.Navigator
        screenOptions={({ route: tabRoute }) => ({
            tabBarIcon: renderTabIcon(tabRoute.name),
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            headerTitle: `Welcome ${route.params.username}`,
            headerRight: () => <TouchableOpacity
                onPress={signOut}>
                <Text
                    style={styles.signOutButton}>
                    Sign out
                </Text>
            </TouchableOpacity>
        })}
        initialRouteName="resturants"
    >
        <Tab.Screen name="weather" component={WeatherDetails} />
        <Tab.Screen name="resturants" component={RestuarantDetails} />
    </Tab.Navigator>
}

const styles = StyleSheet.create({
    signOutButton: {
        color: '#b13354',
        fontWeight: 'bold',
        padding: 10
    }
})