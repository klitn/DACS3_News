import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import ForecastSheetBackground from './ForecastSheetBackground';
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import ForecastControl from './elements/ForecastControl';
import Separator from './elements/Separator';
import { hourly, weekly } from '../../data/ForecastData';
import ForecastScroll from '../forecast/ForecastScroll';
import { ForecastType } from '../../models/Weather';
import AirQualityWidget from '../forecast/widgets/AirQualityWidget';
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget';
import PressureWidget from '../forecast/widgets/PressureWidget';
import RainfallWidget from '../forecast/widgets/RainfallWidget';
import SunriseWidget from '../forecast/widgets/SunriseWidget';
import UvIndexWidget from '../forecast/widgets/UvIndexWidget';
import VisibilityWidget from '../forecast/widgets/VisibilityWidget';
import WindWidget from '../forecast/widgets/WindWidget';
import { ScrollView } from 'react-native-gesture-handler';

const ForecastSheet = () => {
  const snapPoints = ['38.5%', '83%'];
  const {width, height} = useApplicationDimensions();
  const smallWidgetSize = width / 2 - 20;
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const [selectedForeacastType, setSelectedForeacastType] = useState<ForecastType>(ForecastType.Hourly);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.bottomSheeHandleIndicator}
      backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius} />
      )}
      >
        <>
          <ForecastControl onPress={setSelectedForeacastType} />
          <Separator height={3} width={width} />
          <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
            <ForecastScroll
              capsuleWidth={capsuleWidth}
              capsuleHeight={capsuleHeight}
              capsuleRadius={capsuleRadius}
              forecasts={selectedForeacastType === ForecastType.Hourly ? hourly : weekly}
            />
            <View style={styles.sheetDetails}>
              <AirQualityWidget width={width-30} height={150} />
              <View style={styles.widget1Content}>
                <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
                <FeelsLikeWidget width={smallWidgetSize} height={smallWidgetSize} />
                <PressureWidget width={smallWidgetSize} height={smallWidgetSize} />
                <RainfallWidget width={smallWidgetSize} height={smallWidgetSize} />
                <SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
                <VisibilityWidget width={smallWidgetSize} height={smallWidgetSize} />
                <WindWidget width={smallWidgetSize} height={smallWidgetSize} />
              </View>
            </View>
            
          </ScrollView>
        </>
    </BottomSheet>
  )
}

export default ForecastSheet

const styles = StyleSheet.create({
  widget1Content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  bottomSheeHandleIndicator: {
    width: 84,
    height: 5,
    backgroundColor: '#1877F2',
  },
  sheetDetails: {
    flex: 1,
    padding: 30,
    paddingBottom: 50,
  },
})