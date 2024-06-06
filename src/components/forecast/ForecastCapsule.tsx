import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Forecast, ForecastType } from '../../models/Weather'
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';
import { DEGREE_SYMBOL } from '../../../utils/Constants';
import { convertDate12HrFormat, getDayOfWeek } from '../../../utils/DateHelper';

interface ForeacastCapsuleProps {
  forecast: Forecast;
  width: number;
  height: number;
  radius: number;
};

const ForeacastCapsule = ({
  forecast,
  width,
  height,
  radius
}: ForeacastCapsuleProps) => {
  const {date, icon, probability, temperature, type} = forecast;
  const timeDateOpacityDisplay = ():[string, number] => {
    let opacity = 1;
    let timeOrDay = '';
    if (type === ForecastType.Hourly) {
      timeOrDay = convertDate12HrFormat(date);
      opacity = timeOrDay.toLowerCase() === 'now' ? 1 : 0.2;
    } else {
      const [dayOfTheWeek, isToday] = getDayOfWeek(date);
      timeOrDay = dayOfTheWeek;
      opacity = isToday ? 1 : 0.2;
    }
    return [timeOrDay, opacity];
  }
  const [timeToDisplay, capsuleOpacity] = timeDateOpacityDisplay();

  return (
    <View style={{width: width, height: height}}>
      <Canvas style={{...StyleSheet.absoluteFillObject}}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={radius}
          color={`rgba(24, 119, 242,${capsuleOpacity})`}
        >
          <Shadow dx={1} dy={1} blur={0} color={'#1877F2'} inner />
        </RoundedRect>
      </Canvas>
      <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 19}}>
        <Text style={styles.timeTxt}>{timeToDisplay}</Text>
        <View>
          <Image source={icon} style={{width: width / 2, height: width / 2}} />
          <Text style={styles.probabilityTxt}>{probability}%</Text>
        </View>
        <Text style={styles.temperatureTxt}>{temperature} {DEGREE_SYMBOL}</Text>
      </View>
    </View>
  )
}

export default ForeacastCapsule

const styles = StyleSheet.create({
  timeTxt: {
    fontFamily: 'SF-Semibold',
    fontSize: 15,
    lineHeight: 20,
    color: 'white',
    letterSpacing: -0.5,
  },
  probabilityTxt: {
    fontFamily: 'SF-Semibold',
    fontSize: 13,
    lineHeight: 18,
    color: '#40CBD8',
    textAlign: 'center',
  },
  temperatureTxt: {
    fontFamily: 'SF-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    letterSpacing: 0.38,
  }
})