import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Forecast } from '../../models/Weather';
import ForeacastCapsule from './ForecastCapsule';

interface ForecastScrollProps {
  forecasts: Forecast[];
  capsuleWidth: number;
  capsuleHeight: number;
  capsuleRadius: number;
}

const ForecastScroll = ({forecasts, capsuleHeight, capsuleRadius, capsuleWidth}: ForecastScrollProps) => {
  return (
    <View>
      <ScrollView horizontal style={styles.scrollViewStl}>
          <View style={styles.forecastView}>
            {forecasts.map((forecast, index) => (
              <ForeacastCapsule key={index} forecast={forecast} width={capsuleWidth} height={capsuleHeight} radius={capsuleRadius} />
            ))}
          </View>
        </ScrollView>
    </View>
  )
}

export default ForecastScroll

const styles = StyleSheet.create({
  scrollViewStl: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  forecastView: {
    // flex: 1,
    flexDirection: 'row',
    gap: 12,
    // backgroundColor: 'blue',
  }
})