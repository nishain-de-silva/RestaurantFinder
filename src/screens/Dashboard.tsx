import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootParamStack } from "../../Main"
import React from "react"
import auth from '@react-native-firebase/auth'
import { Button, Image, Text, View } from "react-native"
import WeatherDetails from "./WeatherDetails"
import RestuarantDetails from "./RestuarantDetails"
import weatherIcon from '../assets/weather.png'
import resturantIcon from '../assets/restaurant.png'

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
        await auth().signOut()
        navigation.navigate('auth')
    }
    
    return <Tab.Navigator
        screenOptions={({ route: tabRoute }) => ({
            tabBarIcon: renderTabIcon(tabRoute.name),
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            headerTitle: `Welcome ${route.params.username}`,
            headerRight: () => (<Button 
                onPress={signOut}
                title="Sign out"
                color="black"
            />)
        })}
        initialRouteName="resturants"
    >
        <Tab.Screen name="weather" component={WeatherDetails} />
        <Tab.Screen name="resturants" component={RestuarantDetails} />
    </Tab.Navigator>
}