import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {FontAwesome5} from '@expo/vector-icons';
import { WidgetDimensionsProps } from './interface';
import Widget from './base/Widget';
import { DEGREE_SYMBOL } from '../../../../utils/Constants';

const FeelsLikeWidget = ({width, height}: WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        Icon={FontAwesome5}
        iconProps={{name: "temperature-high"}}
        contentText="Feels Like"
      />
      <Widget.Body contentText={`19${DEGREE_SYMBOL}`} contentSize='Large' />
      <Widget.Footer contentText="Similar to the actual temperature." />
    </Widget>
  )
}

export default FeelsLikeWidget

const styles = StyleSheet.create({})