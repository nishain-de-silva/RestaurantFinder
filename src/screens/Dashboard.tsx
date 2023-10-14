import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
    return <View>
        <Text>{`Welcome ${route.params.username}`}</Text>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size }) => (<Image 
                    source={route.name == 'weather' ? weatherIcon : resturantIcon}
                    height={size}
                    width={size}
                />),
                tabBarActiveTintColor:"blue",
                tabBarInactiveTintColor:"gray"
            })}
        >
            <Tab.Screen name="weather" component={WeatherDetails} />
            <Tab.Screen name="resturants" component={RestuarantDetails} />
        </Tab.Navigator>
        </View>
}