import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamStack } from '../../Main';
import Textfield from '../common/Textfield';
import MessageSnack from '../components/MessageSnack';
import FacebookIcon from '../assets/facebook.png'

type AuthPageProps = NativeStackScreenProps<RootParamStack, 'auth'>

export default ({ navigation }: AuthPageProps) => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const navigateToDashBoard = (username: string | null) => {
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

    const swapMode = () => {
        setIsLoginMode(!isLoginMode)
    }

    const isPasswordStrong = () => {
        const strengthCheck = {
            upperCase: false,
            includeNumber: false,
            isLong: false
        }
        for (const char of password) {
            strengthCheck.includeNumber ||= '0123456789'.includes(char)
            strengthCheck.upperCase ||= char == char.toUpperCase()
        }
        strengthCheck.isLong = password.length > 8
        return Object.values(strengthCheck) // check if all score are true...
            .reduce((overallScore, currentScore) => overallScore && currentScore, true)
    }

    const validateEmail = (newEmail: string): boolean => {
        if (!newEmail.length) return false
        const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        return !emailregex.test(newEmail)
    }

    const registerAccount = () => {
        if (!isPasswordStrong()) {
            console.log('called this point')
            setErrorMessage('Password has to 8 characters long and should include number and capital letter')
            return
        }
        if (password != confirmPassword) {
            setErrorMessage('Password does not match')
            return
        }
        if (!(isPasswordStrong() && password == confirmPassword)) return
        auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.updateProfile({
                    displayName: username
                })
                navigateToDashBoard(username)
            })
    }

    return <View style={styles.root}>
        <View style={{ backgroundColor: 'white', width: '90%', padding: 10, borderRadius: 15, alignItems: 'center' }}>
            <View style={styles.innerContent}>
                <Text style={{ fontSize: 25 }}>{`Sign ${isLoginMode ? 'in' : 'up'}`}</Text>
                {!isLoginMode &&
                    <Textfield value={username} setValue={setUsername} label="Username" />}
                <Textfield
                    value={email}
                    email
                    error={validateEmail(email)}
                    errorMessage='Email should be in valid format'
                    setValue={setEmail}
                    label="Email" />
                <Textfield value={password} setValue={setPassword} label="Password" password />
                {!isLoginMode &&
                    <Textfield
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        error={confirmPassword != password}
                        errorMessage='confirm password and password must match'
                        label="Confirm Password" password />}
            </View>
            <TouchableOpacity onPress={performPrimaryAction} style={styles.primaryButton}>
                <Text style={{ color: 'white' }}>{`Sign ${isLoginMode ? 'In' : 'Up'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebookButton} onPress={signInWithFacebook}>
                <Image source={FacebookIcon} style={styles.facebookIcon} />
                <Text style={{ color: 'white' }}>Sign with facebook</Text>
            </TouchableOpacity>
            <View style={styles.secondaryOptionPanel}>
                <Text>{isLoginMode ? "No account ?" : "Have account ?"}</Text>
                <TouchableOpacity onPress={swapMode}>
                    <Text style={styles.secondaryButton}>{isLoginMode ? "Register" : "Login instead"}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
        </View>
        <MessageSnack
            message={errorMessage}
            setMessage={setErrorMessage}
            duration={5000}
        />
    </View>
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#b13354',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    secondaryOptionPanel: {
        flexDirection: 'row',
        marginVertical: 12
    },
    secondaryButton: {
        color: '#b13354',
        marginStart: 12,
        fontWeight: 'bold'
    },
    innerContent: {
        alignItems: 'flex-start',
        paddingHorizontal: 12
    },
    primaryButton: {
        marginTop: 12,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#b13354',
    },
    facebookIcon: {
        height: 30,
        width: 30,
        marginEnd: 12,
        tintColor: 'white'
    },
    facebookButton: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#3b5998'
    }
})