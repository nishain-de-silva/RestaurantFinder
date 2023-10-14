import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React, { useEffect, useState } from "react"
import { FlatList, FlatListProps, ListRenderItem, Text, View } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"
import axios from "axios"
import GetLocation from "react-native-get-location"

type WeatherDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'weather'>
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

console.log({ WEATHER_API_KEY })
export default ({ route }: WeatherDetailScreenProps) => {
    const [weatherData, setWeatherData] = useState([])
    const loadBasedOnLocation = async () => {
        const result = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000
        })
        const { data } = await axios.get('api.openweathermap.org/data/2.5/forecast/daily', {
            params: {
                lat: result.latitude,
                lon: result.longitude,
                appid: WEATHER_API_KEY
            }
        })
        setWeatherData(data.list.map((forcast: any) => forcast.temp.day))
    }
    useEffect(() => {
        loadBasedOnLocation()
    }, [])

    const renderWeather: ListRenderItem<any> = ({ item }) => {
        return <Text>{item.dayTemp}</Text>
    }

   return <View>
        <FlatList data={weatherData} renderItem={renderWeather}/>
    </View>
}