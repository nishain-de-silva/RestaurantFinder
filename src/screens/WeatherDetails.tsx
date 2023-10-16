import React, { useEffect, useRef, useState } from "react"
import { FlatList, Image, ListRenderItem, StyleSheet, Text, View, useColorScheme } from "react-native"
import axios from "axios"
import GetLocation from "react-native-get-location"
import emptyIcon from "../assets/searching.png"
import MessageSnack, { MessageSnackHandle } from "../components/MessageSnack"
import Config from "../Config"
import WeatherItem from "../components/WeatherItem"
import { ImageStyle } from "../common/utils"

export type ForcastParameters = {
    morningTemp: number,
    dayTemp: number,
    nightTemp: number
    windSpeed: number,
    description: string,
    windDirection: number
}
export default () => {
    const [weatherData, setWeatherData] = useState<ForcastParameters[]>([])
    const snackBarRef = useRef<MessageSnackHandle>(null)

    const loadBasedOnLocation = async () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000
        }).then(async (result) => {

            const { data } = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
                params: {
                    lat: result.latitude,
                    lon: result.longitude,
                    appid: Config.WEATHER_API_KEY,
                    exclude: 'current,minutely,hourly,alerts'
                }
            })
            const parsedData = data.daily.map((forcast: any) => ({
                morningTemp: forcast.temp.morn,
                dayTemp: forcast.temp.day,
                nightTemp: forcast.temp.night,
                windSpeed: forcast.wind_speed,
                description: forcast.summary,
                windDirection: forcast.wind_deg
            } as ForcastParameters))
            setWeatherData(parsedData)
        }).catch(({ code }) => {
            if (code == 'UNAUTHORIZED') {
                snackBarRef.current?.show('Please provide location permission to continue')
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
        return <View style={{ padding: 30, height: '100%', flex: 1, backgroundColor: isDarkMode ? 'black' : 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={ImageStyle(isDarkMode, styles.loadingIcon)} source={emptyIcon} />
            <Text>Fetching weather...</Text>
        </View>
    }
    const isDarkMode = useColorScheme() === 'dark'
    return <View>
        <FlatList
            ListEmptyComponent={renderEmptyList}
            data={weatherData} renderItem={renderWeather} />
        <MessageSnack
            ref={snackBarRef} />
    </View>
}

const styles = StyleSheet.create({
    loadingIcon: {
        height: 100,
        width: 100,
    }
})