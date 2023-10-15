import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ForcastParameters } from "../screens/WeatherDetails";
import morning from "../assets/morning.png"
import sun from "../assets/sun.png"
import night from "../assets/night.png"
import wind from "../assets/wind.png"
import compass from "../assets/compass.png"

type WeatherItemParams = {
    item: ForcastParameters
}

export default ({ item }: WeatherItemParams) => {
    return <View style={styles.container}>
        <View style={styles.temperatureRow}>
            <View style={styles.temperatureCell}>
                <Image source={morning} style={styles.temperatureIcon} />
                <Text style={styles.temperature}>{`Morning temp ${item.morningTemp} K`}</Text>
            </View>
            <View style={styles.temperatureCell}>
                <Image source={sun} style={styles.temperatureIcon} />
                <Text style={styles.temperature}>{`Day temp ${item.dayTemp} K`}</Text>
            </View>
            <View style={styles.temperatureCell}>
                <Image source={night} style={styles.temperatureIcon} />
                <Text style={styles.temperature}>{`Night temp ${item.nightTemp} K`}</Text>
            </View>
        </View>
        <View style={styles.windRow}>
            <View style={styles.windCell}>
                <Image source={wind} style={styles.smallIcon} />
                <Text>{`Wind speed ${item.windSpeed} m/s ${item.windDirection} deg`}</Text>
            </View>
            <View style={styles.windCell}>
                <Image source={compass} style={styles.smallIcon} />
                <Text>{`${item.windDirection} deg`}</Text>
            </View>

        </View>
        <Text style={styles.summaryHeadline}>Summary</Text>
        <Text>{item.description}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    summaryHeadline: {
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10
    },
    temperatureCell: {
        alignItems: 'center',
        flex: 1
    },
    temperatureIcon: {
        height: 50,
        width: 50
    },
    temperature: {
        flex: 1
    },
    temperatureRow: {
        textAlign: 'center',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
    windRow: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    windCell: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallIcon: {
        marginRight: 12,
        height: 30,
        width: 30
    }
})