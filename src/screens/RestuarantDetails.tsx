import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"
import GetLocation from 'react-native-get-location'
import MapView, { LatLng, Marker } from "react-native-maps"
import axios, { Axios } from "axios"

type ResturantDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'resturants'>
type CurrentLocationType = {
    latitude: number,
    longitude: number
}

const GOOGLE_PLACES_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
console.log({ GOOGLE_PLACES_API_KEY })

export default () => {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocationType | null>(null)
    const [markers, setMarkers] = useState<LatLng[]>([])

    const loadBasedOnData = async () => {
        const locationInfo = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000
        })
        setCurrentLocation({
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude
        })
        const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${locationInfo.latitude}%${locationInfo.longitude}`,
                radius: 1500,
                key: GOOGLE_PLACES_API_KEY
            }
        })
        const markers = data.results.map((place: any) => {
            const placeLocation = place.geometry.location
            return ({
                latitude: placeLocation.lat,
                longitude: placeLocation.lng
            } as LatLng)
        })
        setMarkers(markers)
    }

    useEffect(() => {
        loadBasedOnData()
    }, [])

    return <View>
        <MapView
            initialRegion={currentLocation ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            } : undefined}
        >
            {markers.map((marker, index) => (
                <Marker
                    id={`marker${index}`}
                    coordinate={marker}
                />))}
        </MapView>
    </View>
}