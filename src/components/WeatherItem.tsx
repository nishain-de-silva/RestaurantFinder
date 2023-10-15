import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import { ForcastParameters } from "../screens/WeatherDetails";
import morning from "../assets/morning.png"
import sun from "../assets/sun.png"
import night from "../assets/night.png"
import wind from "../assets/wind.png"
import compass from "../assets/compass.png"
import { TextStyle } from "../common/utils";

type WeatherItemParams = {
    item: ForcastParameters
}

export default ({ item }: WeatherItemParams) => {
    const isDarkMode = useColorScheme() === 'dark'
    const temperatureTextStyle = TextStyle(isDarkMode, styles.temperature)
    const smallIconStyle = [styles.smallIcon, { tintColor: isDarkMode ? 'white' : 'black' }]

    return <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
        <View style={styles.temperatureRow}>
            <View style={styles.temperatureCell}>
                <Image source={morning} style={styles.temperatureIcon} />
                <Text style={temperatureTextStyle}>{`Morning temp\n${item.morningTemp} K`}</Text>
            </View>
            <View style={styles.temperatureCell}>
                <Image source={sun} style={styles.temperatureIcon} />
                <Text style={temperatureTextStyle}>{`Day temp\n${item.dayTemp} K`}</Text>
            </View>
            <View style={styles.temperatureCell}>
                <Image source={night} style={styles.temperatureIcon} />
                <Text style={temperatureTextStyle}>{`Night temp\n${item.nightTemp} K`}</Text>
            </View>
        </View>
        <View style={[styles.windRow, { borderColor: isDarkMode ? 'white' : 'black' }]}>
            <View style={styles.windCell}>
                <Image source={wind} style={smallIconStyle} />
                <Text style={TextStyle(isDarkMode)}>{`Wind speed ${item.windSpeed} m/s ${item.windDirection} deg`}</Text>
            </View>
            <View style={styles.windCell}>
                <Image source={compass} style={smallIconStyle} />
                <Text style={TextStyle(isDarkMode)}>{`${item.windDirection} deg`}</Text>
            </View>

        </View>
        <Text style={TextStyle(isDarkMode, styles.summaryHeadline)}>Summary</Text>
        <Text style={TextStyle(isDarkMode)}>{item.description}</Text>
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
        flex: 1,
        textAlign: 'center'
    },
    temperatureRow: {
        textAlign: 'center',
        flexDirection: 'row',
        padding: 10,
        flex: 1
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