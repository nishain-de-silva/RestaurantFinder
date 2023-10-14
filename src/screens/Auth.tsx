import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamStack } from '../../Main';
import Textfield from '../common/Textfield';
type AuthPageProps = NativeStackScreenProps<RootParamStack, 'auth'>

export default ({ navigation }: AuthPageProps) => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigateToDashBoard = (username: string|null) => {
        navigation.navigate('dashboard', { username: username || 'user' })
    }

    useEffect(() => {
        const currentUser = auth().currentUser
        if (currentUser != null) { // user already signed in...
            navigation.navigate('dashboard', { username: currentUser.displayName || 'user' }) 
        }
    }, [])

    const performPrimaryAction = () => {
        if (isLoginMode) signIn()
        else registerAccount()
    }

    const signIn = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
             navigateToDashBoard(result.user.displayName)
        })
        .catch((error) => console.log(error))
    }

    const signInWithFacebook = async () => {
        console.log('need to be implemented')
    }

    const registerAccount = () => {
        auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.updateProfile({
                displayName: username
            })
            navigateToDashBoard(username)
        })
    }
    
    return <View style={styles.root}>
        <View style={styles.innerContent}>
        <Text style={{ fontSize: 25 }}>{`Sign ${isLoginMode ? 'in' : 'up'}`}</Text>
        {!isLoginMode &&
            <Textfield value={username} setValue={setUsername} label="Username" />} 
        <Textfield value={email} setValue={setEmail} label="Email" />
        <Textfield value={password} setValue={setPassword} label="Password" password />
        {!isLoginMode &&
            <Textfield value={confirmPassword} setValue={setConfirmPassword} label="Confirm Password" password />} 
        </View>
        <TouchableOpacity onPress={performPrimaryAction} style={styles.primaryButton}>
            <Text>{`Sign ${isLoginMode ? 'In' : 'Up'}`}</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    innerContent: {
        alignItems: 'flex-start',
        paddingHorizontal: 12
    },
    primaryButton: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#45d1df',
        color: 'white'
    }
})