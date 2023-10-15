import React, { forwardRef } from "react"
import { StyleSheet, Text, TextInput, TextInputIOSProps, TextInputProps, View } from "react-native"
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
    const getInputType = (): TextInputProps['textContentType'] => {
        if (password) return 'password'
        else if (email) return 'emailAddress'
        return undefined
    }

    return <View style={styles.inputRow}>
        <Text>{label}</Text>
            
        <View style={styles.textInputWrapper}>
            <TextInput ref={ref} style={styles.inputField}
                secureTextEntry={password}
                autoCapitalize="none"
                value={value}
                onChangeText={setValue}
                placeholder={label}
            />
        </View>
        {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
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
        backgroundColor: 'white',
        padding: 12,
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
})