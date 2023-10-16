import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
export type MessageSnackProps = {
    duration?: number
}

export type MessageSnackHandle = {
    show: (newMessage: string) => void
}
export default  forwardRef<MessageSnackHandle, MessageSnackProps>(({ duration = 2000 }, ref) => {
    const [message, setMessage] = useState<string|null>(null)
    useImperativeHandle(ref, () => ({
        show: (newMessage) => {
            setMessage(newMessage)
            setTimeout(() => {
                setMessage(null)
            }, duration)
        }
    }))
    
    const isDarkMode = useColorScheme() === 'dark'
    return !!message ? <View style={[styles.snackbarContainer, {
        backgroundColor: isDarkMode ? '#001e38' : 'black'
    }]}>
        <Text style={styles.snackbarText}>{message}</Text>
    </View> : null
})

const styles = StyleSheet.create({
    snackbarText: {
        color: 'white',
        textAlign: 'left',
        flex: 1
    },
    snackbarContainer: {
        flexDirection: 'row',
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