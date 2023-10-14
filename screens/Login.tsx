import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth'
import Textfield from 'common/Textfield';
export default (): Element => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    useEffect(() => {
        
    }, [])
    return <View>
        <Text>{`Sign ${isLoginMode ? 'in' : 'up'}`}</Text>
        <Textfield label="Email" />
        <Textfield label="Password" />
        <TouchableOpacity style={styles.primaryButton}>Sign In</TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: 'blue'
    }
})