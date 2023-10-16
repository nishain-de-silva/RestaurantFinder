import React, { useEffect, useRef, useState } from "react"
import { Platform, View } from "react-native"
import GetLocation from 'react-native-get-location'
import MapView, { LatLng, Marker } from "react-native-maps"
import axios from "axios"
import Config from '../Config'
import RestuarantItem, { ResturantDisplayOverlayHandle } from "../components/ResturantDisplayOverlay"

type CurrentLocationType = {
    latitude: number,
    longitude: number
}

export type RestuarantParameters = {
    position: LatLng,
    name: string,
    rating: number,
    totalRating: number
}
export default () => {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocationType | null>(null)
    const [restuarants, setRestuarants] = useState<RestuarantParameters[]>([])
    const mapRef = useRef<MapView | null>(null)
    const overlayRef = useRef<ResturantDisplayOverlayHandle>(null)

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
                location: `${locationInfo.latitude},${locationInfo.longitude}`,
                radius: 1500,
                key: Config.GOOGLE_PLACES_API_KEY
            }
        })
        const parsedData = data.results.map((restuarant: any) => ({
            position: {
                latitude: restuarant.geometry.location.lat,
                longitude: restuarant.geometry.location.lng,
            },
            name: restuarant.name,
            rating: restuarant.rating,
            totalRating: restuarant.user_ratings_total,
        } as RestuarantParameters))
        setRestuarants(parsedData)
        mapRef.current?.fitToCoordinates(parsedData.map((data: RestuarantParameters) => data.position))
    }

    useEffect(() => {
        
        loadBasedOnData()
    }, [])


    const onPressMarker = (item: RestuarantParameters) => {
        return () => {
            if (Platform.OS == 'ios') {
                mapRef.current?.animateCamera({
                    center: item.position
                })
            }
            overlayRef.current?.open(item)
        }
    }

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
                    onPress={onPressMarker(resturant)}
                    key={`marker${index}`}
                    id={`marker${index}`}
                    coordinate={resturant.position}
                />))}
        </MapView>
            <RestuarantItem ref={overlayRef} />
    </View>
}