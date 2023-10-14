import React, { forwardRef } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
type TextFieldProps = {
    label: string,
    value: string|null
    setValue: Function,
    password?: boolean
}

export default forwardRef<TextInput, TextFieldProps>(({ label, password }, ref) => {
    return <View style={styles.inputRow}>
        <Text>{label}</Text>
        <TextInput ref={ref}style={styles.inputField}
            textContentType={password ? "password" : undefined}
            placeholder={label}
        />
    </View> 
})

const styles = StyleSheet.create({
    inputRow: {
        alignItems: 'center',
        marginVertical: 12,
        flexDirection: 'row',
        marginHorizontal: 12
    },
    inputField: {
        flex: 1,
        marginStart: 12,
        backgroundColor: 'white',
        padding: 12,
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
})