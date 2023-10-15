import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ListRenderItem, StyleSheet, Text, View, useColorScheme } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"
import axios from "axios"
import GetLocation from "react-native-get-location"
import emptyIcon from "../assets/emptyWeather.png"
import MessageSnack from "../components/MessageSnack"
import Config from "../Config"
import mockData from '../assets/sampleData.json'
import WeatherItem from "../components/WeatherItem"

type WeatherDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'weather'>
export type ForcastParameters = {
    morningTemp: number,
    dayTemp: number,
    nightTemp: number
    windSpeed: number,
    description: string,
    windDirection: number
}
export default ({ route }: WeatherDetailScreenProps) => {
    const [weatherData, setWeatherData] = useState<ForcastParameters[]>([])
    const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null)

    const loadBasedOnLocation = async () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000
        }).then(async (result) => {
            console.log('network call made')
            // const { data } = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
            //     params: {
            //         lat: result.latitude,
            //         lon: result.longitude,
            //         appid: Config.WEATHER_API_KEY,
            //         exclude: 'current,minutely,hourly,alerts'
            //     }
            // })
            const parsedData = mockData.daily.map((forcast) => ({
                morningTemp: forcast.temp.morn,
                dayTemp: forcast.temp.day,
                nightTemp: forcast.temp.night,
                windSpeed: forcast.wind_speed,
                description: forcast.summary,
                windDirection: forcast.wind_deg
            } as ForcastParameters))
            setWeatherData(parsedData)
        }).catch(({ code }) => {
            if(code == 'UNAUTHORIZED') {
                setSnackBarMessage('Please provide location permission to continue')
            }
        })
    }
    useEffect(() => {
        loadBasedOnLocation()
    }, [])

    const renderWeather: ListRenderItem<ForcastParameters> = ({ item }) => {
        return <WeatherItem item={item} />
    }

    const renderEmptyList = (): JSX.Element => {
        return <View style={{ height: '100%', backgroundColor: isDarkMode ? 'black' : 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 100, width: 100, tintColor: isDarkMode ? 'white' : 'black' }} source={emptyIcon} />
        </View>
    }
    const isDarkMode = useColorScheme() === 'dark'
   return <View>
        <FlatList 
        ListEmptyComponent={renderEmptyList}
        data={weatherData} renderItem={renderWeather}/>
        <MessageSnack 
            message={snackBarMessage} 
            setMessage={setSnackBarMessage} />
    </View>
}

const styles = StyleSheet.create({
    root: {
        height: '100%'
    }
})