import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState }from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

const WEATHER_API_KEY = 'b0384b8feef6e5a265d76971ad9081d2';
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null); 
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem , setUnitsSystem] = useState('metric');

  useEffect( () => {
    load()
  }, [unitsSystem])

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)

    try{
      let { status } = await Location.requestPermissionsAsync();

      if(status !== 'granted'){

        setErrorMessage(`Permission to access location was denied`);

      }
  
      let location = await Location.getCurrentPositionAsync({});
      
      const {latitude, longitude} = location.coords;

      const weatherUrl = `${BASE_URL_WEATHER}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);
      const data = await response.json();

      if(response.ok){
        setCurrentWeather(data);
      }else{
        setErrorMessage(data.message)
      }


      
    }catch(error){
      alert(error)
    }
  }


  if(currentWeather){

    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <ReloadIcon 
              load={load}
            />
            <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    );
  }else if(errorMessage){

    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        
        <StatusBar style="auto" />
      </View>
    );

  }else{
    return (
      <View style={styles.centering}>
        <ActivityIndicator size="large" color="#000" />
        
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  centering: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
