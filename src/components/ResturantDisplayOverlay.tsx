import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Image } from "react-native";
import { BackgroundStyle, ImageStyle, TextStyle } from "../common/utils";
import { RestuarantParameters } from "../screens/RestuarantDetails";
import closeIcon from '../assets/close.png'

export type ResturantDisplayOverlayHandle = {
    open: (newItem: RestuarantParameters) => void
}
export default forwardRef<ResturantDisplayOverlayHandle, {}>(({}, ref) => {
    const [item, setItem] = useState<RestuarantParameters|null>(null)
    useImperativeHandle(ref, () => ({
        open: (newItem: RestuarantParameters) => {
            setItem(newItem)
        }
    }), [])

    const isDarkMode = useColorScheme() === 'dark'
    
    const getRating = (): string => {
        if(item && item.rating && item.totalRating) return `${item.rating} / ${item.totalRating}`
        return 'No rating give'
    }

    const onClose = () => {
        setItem(null)
    }

    return item != null ? <View style={BackgroundStyle(isDarkMode, styles.container)}>
        <View style={styles.topLayer}>
            <TouchableOpacity onPress={onClose}>
                <Image source={closeIcon} style={ImageStyle(isDarkMode, styles.closeIcon)} />
            </TouchableOpacity>
        </View>
        <Text style={TextStyle(isDarkMode, styles.nameHeadline)}>{item.name}</Text>
        <Text style={TextStyle(isDarkMode, styles.ratingsHeadline)}>Rating</Text>
        <Text style={TextStyle(isDarkMode)}>{getRating()}</Text>
    </View> : null
}) 

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    closeIcon: {
        height: 20,
        width: 20,
        padding: 10
    },
    topLayer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'flex-end'
    },
    nameHeadline: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    ratingsHeadline: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: "bold"
    }
})