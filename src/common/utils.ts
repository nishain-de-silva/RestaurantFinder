import {useColorScheme } from "react-native"

export function useColor(lightColor: string, darkColor: string): string {
    return useColorScheme() === 'light' ? lightColor : darkColor
}
export const SnackBarService = {
    showSnack: () => {
        console.log('snackbar controller not initiated')
    }
}
export function useTextColor(): string {
    return useColorScheme() === 'light' ? 'black' : 'white'
}