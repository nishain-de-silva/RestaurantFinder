import React, { forwardRef } from "react"
import { StyleSheet, Text, TextInput, TextInputIOSProps, TextInputProps, View, useColorScheme } from "react-native"
import { TextStyle } from "./utils"
type TextFieldProps = {
    label: string,
    value: string | undefined
    setValue: TextInputProps['onChangeText'],
    password?: boolean,
    email?: boolean,
    error?: boolean,
    errorMessage?: string
}

export default forwardRef<TextInput, TextFieldProps>(({ value,
    setValue,
    label,
    password,
    email,
    error = false,
    errorMessage
}, ref) => {
    
    const isDarkMode = useColorScheme() === 'dark'
    return <View style={styles.inputRow}>
        <Text style={TextStyle(isDarkMode)}>{label}</Text>
        <View style={styles.textInputWrapper}>
            <TextInput ref={ref} style={[styles.inputField, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#e6eae7',
                color: isDarkMode ? 'white' : 'black'
            }]}
                secureTextEntry={password}
                autoCapitalize="none"
                value={value}
                onChangeText={setValue}
                placeholder={label}
            />
        </View>
        {error && <Text style={[styles.errorMessage, { color: isDarkMode ? '#09f7dc' : 'red' }]}>{errorMessage}</Text>}
    </View>
})

const styles = StyleSheet.create({
    inputRow: {
        alignItems: 'flex-start',
        marginTop: 12,    
        marginHorizontal: 12
    },
    textInputWrapper: {
        marginTop: 10,
        flexDirection: 'row'
    },
    errorMessage: {
        paddingHorizontal: 10,
        color: 'red'
    },
    inputField: {
        flex: 1,
        padding: 12,
        borderRadius: 10
    }
})