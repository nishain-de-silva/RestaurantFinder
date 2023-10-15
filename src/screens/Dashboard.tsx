import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootParamStack } from "../../Main"
import React from "react"
import { Image, Text, View } from "react-native"
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

export default ({ route }: DashboardPageProps) => {
    const renderTabIcon = (routeName: string): BottomTabNavigationOptions['tabBarIcon'] => {
        return ({ size }) => <Image
            source={routeName == 'weather' ? weatherIcon : resturantIcon}
            height={size}
            width={size}
        />
    }

    return <View>
        <Text>{`Welcome ${route.params.username}`}</Text>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: renderTabIcon(route.name),
                tabBarActiveTintColor:"blue",
                tabBarInactiveTintColor:"gray"
            })}
        >
            <Tab.Screen name="weather" component={WeatherDetails} />
            <Tab.Screen name="resturants" component={RestuarantDetails} />
        </Tab.Navigator>
        </View>
}