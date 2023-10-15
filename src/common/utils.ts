import {StyleSheet, Text, useColorScheme } from "react-native"

export function useColor(lightColor: string, darkColor: string): string {
    return useColorScheme() === 'light' ? lightColor : darkColor
}
export const SnackBarService = {
    showSnack: () => {
        console.log('snackbar controller not initiated')
    }
}

export function TextStyle(isDarkMode: boolean, originalStyle: any|null = null) {
    if(originalStyle != null) {
        originalStyle.color = isDarkMode ? 'white' : 'black'
        return [originalStyle, { color: isDarkMode ? 'white' : 'black' }]
    }
    return ({
        color: isDarkMode ? 'white' : 'black'
    })
}

export function useTextColor(): string {
    return useColorScheme() === 'light' ? 'black' : 'white'
}