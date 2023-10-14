import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootParamStack } from "../../Main"
import React from "react"
import { Text, View } from "react-native"
import WeatherDetails from "@app/screens/WeatherDetails"
import RestuarantDetails from "@app/screens/RestuarantDetails"
const googleMapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

console.log({ googleMapAPIKey })
type DashboardPageProps = NativeStackScreenProps<RootParamStack, 'dashboard'>

export type DashboardNavigatorScreenProps = {
    weather: undefined,
    resturants: undefined
}

const Tab = createBottomTabNavigator<DashboardNavigatorScreenProps>()

export default ({ route }: DashboardPageProps) => {
    return <View>
        <Text>{`Welcome ${route.params.username}`}</Text>
        <Tab.Navigator>
            <Tab.Screen name="weather" component={WeatherDetails} />
            <Tab.Screen name="resturants" component={RestuarantDetails} />
        </Tab.Navigator>
        </View>
}