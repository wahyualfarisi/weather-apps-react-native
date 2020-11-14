import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { colors  } from './../utils/index'

export default function ReloadIcon({load}) {
    return (
        <View style={styles.reloadIcon}>
            <Ionicons 
                name="ios-refresh" 
                size={24} 
                color={colors.PRIMARY} 
                onPress={load}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 40,
        right: 30
    }
})
