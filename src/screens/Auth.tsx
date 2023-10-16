import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import auth from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamStack } from '../../Main';
import Textfield from '../common/Textfield';
import MessageSnack, { MessageSnackHandle } from '../components/MessageSnack';
import FacebookIcon from '../assets/facebook.png'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { BackgroundStyle, TextStyle } from '../common/utils';

type AuthPageProps = NativeStackScreenProps<RootParamStack, 'auth'>

export default ({ navigation }: AuthPageProps) => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const snackBarRef = useRef<MessageSnackHandle>(null)
    const [facebookSignInLoading, setFacebookSignInLoading] = useState(false)
    const [emailSignLoading, setEmailSignLoading] = useState(false)

    const navigateToDashBoard = (username: string | null) => {
        navigation.navigate('dashboard', { username: username || 'user' })
    }

    useEffect(() => {
        const currentUser = auth().currentUser
        if (currentUser != null) { // user already signed in...
            navigation.navigate('dashboard', { username: currentUser.displayName || 'user' })
        }
    }, [])

    const performSignInOrRegistration = () => {
        if (isEmailInvalid) return // common for both paths...
        if (isLoginMode) signIn()
        else registerAccount()
    }

    const showErrorMessage = (message: string) => {
        snackBarRef.current?.show(message)
    }

    const signIn = () => {
        setEmailSignLoading(true)
        auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                navigateToDashBoard(result.user.displayName)
            })
            .catch((error) => {
                const { code } = error
                let message: string
                if (['auth/invalid-login', 'auth/user-not-found', 'auth/wrong-password'].includes(code))
                    message = 'email or password is incorrect please try again'
                else message = 'authentication failed'
                showErrorMessage(message)
            }).finally(() => {
                setEmailSignLoading(false)
            })
    }

    const registerAccount = () => {
        if (!username.length) {
            showErrorMessage('Provide a username please')
            return
        }
        if (!isPasswordStrong()) {
            showErrorMessage('Password has to 8 characters long and should include number and capital letter')
            return
        }
        if (password != confirmPassword) {
            return
        }
        if (password != confirmPassword) return
        setEmailSignLoading(true)
        auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.updateProfile({
                    displayName: username
                })
                navigateToDashBoard(username)
            })
            .catch((error) => {
                const { code } = error
                let message: string
                if (code == 'auth/email-already-in-use')
                    message = 'user already exist with given email'
                else if (code == 'auth/weak-password')
                    message = 'password is not strong enough'
                else message = 'resgistration failed'
                showErrorMessage(message)
            }).finally(() => {
                setEmailSignLoading(false)
            })
    }

    const signInWithFacebook = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile']);
        if (result.isCancelled) {
            return
        }

        setFacebookSignInLoading(true)
        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();


        if (!data) {
            console.log('Something went wrong obtaining access token')
            setFacebookSignInLoading(false)
            return
        }
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential).then((result) => {
            setFacebookSignInLoading(false)
            navigateToDashBoard(result.user.displayName)
        });
    }

    const swapLoginMode = () => {
        setIsLoginMode(!isLoginMode)
    }

    const isPasswordStrong = (): boolean => {
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

    const isEmailInvalid = useMemo((): boolean => {
        if (!email.length) return false
        const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        return !emailregex.test(email)
    }, [email])

    const darkMode = useColorScheme() === 'dark'

    return <View style={styles.root}>
        <View style={BackgroundStyle(darkMode, styles.cardContent)}>
            <View style={styles.innerContent}>
                <Text style={{ fontSize: 25, color: darkMode ? 'white' : 'black' }}>{`Sign ${isLoginMode ? 'in' : 'up'}`}</Text>
                {!isLoginMode &&
                    <Textfield value={username} setValue={setUsername} label="Username" />}
                <Textfield
                    value={email}
                    email
                    error={isEmailInvalid}
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
            <TouchableOpacity disabled={emailSignLoading} onPress={performSignInOrRegistration} style={styles.primaryButton}>
                {emailSignLoading ? <ActivityIndicator
                    style={styles.loadingIndicator}
                    size={'small'}
                    color={'white'}
                /> : <Text style={{ color: 'white' }}>{`Sign ${isLoginMode ? 'In' : 'Up'}`}</Text>}

            </TouchableOpacity>
            <TouchableOpacity disabled={facebookSignInLoading} style={styles.facebookButton} onPress={signInWithFacebook}>
                {facebookSignInLoading ?
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size={'small'}
                        color={'white'}
                    />
                    : <>
                        <Image source={FacebookIcon} style={styles.facebookIcon} />
                        <Text style={{ color: 'white' }}>Sign with facebook</Text>
                    </>
                }

            </TouchableOpacity>
            <View style={styles.secondaryOptionPanel}>
                <Text style={TextStyle(darkMode)}>{isLoginMode ? "No account ?" : "Have account ?"}</Text>
                <TouchableOpacity onPress={swapLoginMode}>
                    <Text style={[styles.secondaryButton, { color: darkMode ? '#f4aac2' : '#b13354' }]}>{isLoginMode ? "Register" : "Login instead"}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
        </View>
        <MessageSnack
            ref={snackBarRef}
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
    cardContent: {
        width: '90%',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center'
    },
    secondaryOptionPanel: {
        flexDirection: 'row',
        marginVertical: 12
    },
    secondaryButton: {
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
    loadingIndicator: {
        marginHorizontal: 20
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