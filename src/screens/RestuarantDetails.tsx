import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { DashboardNavigatorScreenProps } from "./Dashboard"
import GetLocation from 'react-native-get-location'
import MapView, { LatLng, Marker } from "react-native-maps"
import axios, { Axios } from "axios"
import Config from '../Config'
import sampleData from '../assets/restuarantsSampleData.json'

type ResturantDetailScreenProps = BottomTabScreenProps<DashboardNavigatorScreenProps, 'resturants'>
type CurrentLocationType = {
    latitude: number,
    longitude: number
}

type RestuarantParameters = {
    position: LatLng,
    name: string
}
export default () => {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocationType | null>(null)
    const [restuarants, setRestuarants] = useState<RestuarantParameters[]>([])
    const mapRef = useRef<MapView | null>(null)
    const loadBasedOnData = async () => {
        const locationInfo = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000
        })
        setCurrentLocation({
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude
        })
        // const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        //     params: {
        //         location: `${locationInfo.latitude}%${locationInfo.longitude}`,
        //         radius: 1500,
        //         key: Config.GOOGLE_PLACES_API_KEY
        //     }
        // })
        const parsedData = sampleData.results.map((restuarant) => ({
            position: {
                latitude: restuarant.geometry.location.lat,
                longitude: restuarant.geometry.location.lng,
            },
            name: restuarant.name
        } as RestuarantParameters))
        setRestuarants(parsedData)
        mapRef.current?.fitToCoordinates(parsedData.map((data) => data.position))
    }

    useEffect(() => {
        
        loadBasedOnData()
    }, [])

    return <View style={{ flex: 1 }}>
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            showsUserLocation={true}
            zoomControlEnabled={true}
            zoomEnabled={true}
             
            showsBuildings={true}
            initialRegion={currentLocation ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            } : undefined}
        >
            {restuarants.map((resturant, index) => (
                <Marker
                    id={`marker${index}`}
                    coordinate={resturant.position}
                />))}
        </MapView>
    </View>
}