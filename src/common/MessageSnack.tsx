import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTextColor } from "./utils";
export type MessageSnackProps = {
    message: string | null,
    duration?: number
}
export default ({ message, duration = 2000 }: MessageSnackProps) => {
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {
        if (showMessage == null) return
        setShowMessage(true)
        setTimeout(() => {
            setShowMessage(true)
        }, duration)
    }, [message])
    return showMessage ? <View style={styles.snackbarContainer}>
        <Text style={{ color: useTextColor() }}>{message}</Text>
    </View> : null
}

const styles = StyleSheet.create({
    snackbarContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        margin: 10,
        backgroundColor: 'black'
    }
})