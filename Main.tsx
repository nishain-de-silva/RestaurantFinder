import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Auth from "./src/screens/Auth"
import Dashboard from "./src/screens/Dashboard"

export type RootParamStack = {
    auth: undefined,
    dashboard: {
        username: string
    }
}
const Stack = createNativeStackNavigator<RootParamStack>()

export default (): Element => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="auth" component={Auth} />
            <Stack.Screen name="dashboard" component={Dashboard} />
        </Stack.Navigator>
    </NavigationContainer>
}