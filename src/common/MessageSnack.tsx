import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColor, useTextColor } from "./utils";
export type MessageSnackProps = {
    message: string | null,
    duration?: number
}
export default ({ message, duration = 2000 }: MessageSnackProps) => {
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {
        if (!message) return
        setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, duration)
    }, [message])
    const textColor = useColor('white', 'black')
    return showMessage ? <View style={styles.snackbarContainer}>
        <Text style={{ color: textColor }}>{message}</Text>
    </View> : null
}

const styles = StyleSheet.create({
    snackbarContainer: {
        position: 'absolute',
        bottom: 30,
        padding: 10,
        borderRadius: 5,
        width: '90%',
        backgroundColor: 'black'
    }
})