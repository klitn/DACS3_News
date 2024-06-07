import { StyleSheet, Text, View,LogBox } from 'react-native'
import { Weather } from '../../models/Weather';
import { DEGREE_SYMBOL } from '../../../utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface WeatherInfoProps {
  weather: Weather;
};
LogBox.ignoreAllLogs();

const WeatherInfo = ({weather}: WeatherInfoProps) => {
  
  const {top} = useSafeAreaInsets();
  const weatherInfoMargin = top + 52;
  const [city, setCity] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchCityAndWeather = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let reverseGeocodedAddress = await Location.reverseGeocodeAsync({ latitude, longitude });
      const city = reverseGeocodedAddress[0].region;
      setCity(city);

      const API_KEY = '8de0d4af64ecd523a527ebf81031f1d8';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    };

    fetchCityAndWeather();
  }, []);
  if (weatherData) {
    const temperatureK = weatherData.main.temp;
    const temperatureC = temperatureK - 273.15;
    const highK = weatherData.main.temp_max;
    const highC = highK - 273.15;
    const lowK = weatherData.main.temp_min;
    const lowC = lowK - 273.15;
    const condition = weatherData.weather[0].main;
    // ...rest of your code...
    return (
      <View style={{alignItems: 'center', marginTop: weatherInfoMargin}}>
      <Text style={styles.cityTxt}>{city}</Text>
      <Text style={styles.temperatureTxt}>{temperatureC.toFixed(2)}</Text>
      <Text style={styles.conditionTxt}>{condition}</Text>
      <Text style={styles.minMaxTxt}>H: {highC.toFixed(2)}{DEGREE_SYMBOL} L: {lowC.toFixed(2)}{DEGREE_SYMBOL}</Text>
    </View>
    )
  }
  
}

export default WeatherInfo

const styles = StyleSheet.create({
  temperatureTxt: {
    fontFamily: "SF-Thin",
    fontSize: 96,
    color: "white",
    lineHeight: 96,
  },
  cityTxt: {
    fontFamily: "SF-Regular",
    color: "white",
    fontSize: 34,
    lineHeight: 41,
  },
  conditionTxt: {
    fontFamily: "SF-Semibold",
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 20,
    lineHeight: 20,
  },
  minMaxTxt: {
    fontFamily: "SF-Semibold",
    color: "white",
    fontSize: 20,
    lineHeight: 20,
  },
});
