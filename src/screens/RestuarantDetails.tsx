import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { Text, View } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"
type ResturantDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'resturants'>
export default () => {
    return <View>
        <Text>Map</Text>
    </View>
}