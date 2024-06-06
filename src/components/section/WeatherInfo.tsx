import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Weather } from '../../models/Weather';
import { DEGREE_SYMBOL } from '../../../utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface WeatherInfoProps {
  weather: Weather;
};

const WeatherInfo = ({weather}: WeatherInfoProps) => {
  const { city, temperature, condition, high, low } = weather;
  const {top} = useSafeAreaInsets();
  const weatherInfoMargin = top + 52;

  return (
    <View style={{alignItems: 'center', marginTop: weatherInfoMargin}}>
      <Text style={styles.cityTxt}>{city}</Text>
      <Text style={styles.temperatureTxt}>{temperature}</Text>
      <Text style={styles.conditionTxt}>{condition}</Text>
      <Text style={styles.minMaxTxt}>H: {high}{DEGREE_SYMBOL} L: {low}{DEGREE_SYMBOL}</Text>
    </View>
  )
}

export default WeatherInfo

const styles = StyleSheet.create({
  temperatureTxt: {
    fontFamily: 'SF-Thin',
    fontSize: 96,
    color: 'white',
    lineHeight: 96,
  },
  cityTxt: {
    fontFamily: 'SF-Regular',
    color: 'white',
    fontSize: 34,
    lineHeight: 41,
  },
  conditionTxt: {
    fontFamily: 'SF-Semibold',
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 20,
    lineHeight: 20,
  },
  minMaxTxt: {
    fontFamily: 'SF-Semibold',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
  }
})