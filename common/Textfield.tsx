import React, { forwardRef } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
type TextFieldProps = {
    label: string
}

export default forwardRef<TextInput, TextFieldProps>(({ label }, ref) => {
    return <View style={styles.inputRow}>
        <Text>{label}</Text>
        <TextInput ref={ref} placeholder={label} />
    </View> 
})

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row'
    }
})