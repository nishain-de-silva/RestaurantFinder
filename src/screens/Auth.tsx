import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamStack } from '../../Main';
import Textfield from '../common/Textfield';
type AuthPageProps = NativeStackScreenProps<RootParamStack, 'auth'>

export default ({ navigation }: AuthPageProps) => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    useEffect(() => {
        
    }, [])

    const signIn = () => {
        navigation.navigate('dashboard', { username: 'Nishain' })
    }
    
    return <View>
        <Text>{`Sign ${isLoginMode ? 'in' : 'up'}`}</Text>
        <Textfield label="Email" />
        <Textfield label="Password" />
        <TouchableOpacity 
        style={styles.primaryButton}
        onPress={signIn}
        ><Text>Sign In</Text>
            </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: 'blue'
    }
})