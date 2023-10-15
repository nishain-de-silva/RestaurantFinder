import {useColorScheme } from "react-native"

export function useColor(lightColor: string, darkColor: string): string {
    return useColorScheme() === 'light' ? lightColor : darkColor
}

export function useTextColor(): string {
    return useColorScheme() === 'light' ? 'black' : 'white'
}