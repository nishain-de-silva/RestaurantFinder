import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColor, useTextColor } from "./utils";
export type MessageSnackProps = {
    message: string | null,
    duration?: number,
    setMessage: (message: string | null) => void
}
export default ({ message, setMessage, duration = 2000 }: MessageSnackProps) => {
    useEffect(() => {
        if (message != null && message.length > 0) {
            setTimeout(() => {
                setMessage(null)
            }, duration)
        }
    }, [message])

    return !!message ? <View style={styles.snackbarContainer}>
        <Text style={styles.snackbarText}>{message}</Text>
    </View> : null
}

const styles = StyleSheet.create({
    snackbarText: {
        color: 'white',
        textAlign: 'left',
        flex: 1
    },
    snackbarContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        color: 'white',
        padding: 15,
        alignSelf: 'stretch',
        marginHorizontal: 10,
        flex: 0,
        position: 'absolute',
        bottom: 10,
        borderRadius: 10
    }
})