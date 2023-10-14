import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { Text, View } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"

type WeatherDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'weather'>
export default ({ route }: WeatherDetailScreenProps) => {
   return <View>
        <Text>Weather</Text>
    </View>
}