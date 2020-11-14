import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors  } from './../utils/index';

const { PRIMARY, SECONDARY } = colors

export default function WeatherInfo({ currentWeather }) {

    const { 
        main: { temp },
        weather: [detail],
        name
    } = currentWeather

    const { icon, description, main } = detail;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    


    return (
        <View style={style.weatherInfo}>
            <Text>{name}</Text>
            <Image style={style.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={style.textPrimary}> {temp} &#176; </Text>
            <Text style={style.description}>{description}</Text>
            <Text style={style.textSecondary}>{main}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    description: { textTransform: 'capitalize' },
    weatherIcon: {
        width: 100,
        height: 100
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY,
        fontWeight: '900',
        marginTop: 10
    }
})
