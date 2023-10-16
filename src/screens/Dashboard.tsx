import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootParamStack } from "../../Main"
import React from "react"
import auth from '@react-native-firebase/auth'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native"
import WeatherDetails from "./WeatherDetails"
import RestuarantDetails from "./RestuarantDetails"
import weatherIcon from '../assets/weather.png'
import storeIcon from '../assets/store.png'
import logoutIcon from '../assets/logout.png'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type DashboardPageProps = NativeStackScreenProps<RootParamStack, 'dashboard'>

export type DashboardNavigatorScreenProps = {
    weather: undefined,
    resturants: undefined
}

const Tab = createBottomTabNavigator<DashboardNavigatorScreenProps>()

export default ({ route, navigation }: DashboardPageProps) => {
    const isDarkMode = useColorScheme() === 'dark'
    const renderTabIcon = (routeName: string): BottomTabNavigationOptions['tabBarIcon'] => {
        const unselectedColor = isDarkMode ? 'white': 'gray'
        const selectedColor = isDarkMode ? "#f4aac2" : "#f44560"
        return ({ size, focused }) => <Image
            source={routeName == 'weather' ? weatherIcon : storeIcon}
            style={{ height: size, width: size, tintColor: focused ? selectedColor : unselectedColor }}
        />
    }

    const signOut = async () => {
        // sign out from facebook as well...
        if (auth().currentUser?.providerData[0].providerId == 'facebook.com')
            LoginManager.logOut()
        await auth().signOut()

        navigation.navigate('auth')
    }
    
    const backgroundStyle = isDarkMode ? { backgroundColor: '#2a2a2a' }: undefined
    return <Tab.Navigator
        sceneContainerStyle={backgroundStyle}
        screenOptions={({ route: tabRoute }) => ({
            headerTintColor: isDarkMode ? 'white' : 'black',
            headerStyle: backgroundStyle,
            tabBarStyle: backgroundStyle,
            tabBarShowLabel: false,
            tabBarIcon: renderTabIcon(tabRoute.name),
            headerTitle: `Welcome ${route.params.username}`,
            headerRight: () => <TouchableOpacity
                onPress={signOut}>
                    <Image source={logoutIcon} style={[
                        styles.signOutButton,
                        { tintColor: isDarkMode ? '#f4aac2' : '#b13354' }
                    ]} />
            </TouchableOpacity>
        })}
    >
        <Tab.Screen name="weather" component={WeatherDetails} />
        <Tab.Screen name="resturants" component={RestuarantDetails} />
    </Tab.Navigator>
}

const styles = StyleSheet.create({
    signOutButton: {
        height: 20, width: 20, marginHorizontal: 12
    }
})