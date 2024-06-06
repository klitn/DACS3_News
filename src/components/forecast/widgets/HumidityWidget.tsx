import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { WidgetDimensionsProps } from './interface'
import Widget from './base/Widget'

const HumidityWidget = ({width, height}: WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        Icon={MaterialCommunityIcons}
        iconProps={{name: "water"}}
        contentText="Humidity"
      />
      <Widget.Body contentText="90%" contentSize='Large' />
      <Widget.Footer contentText="The amount of water vapor in the air." />
    </Widget>
  )
}

export default HumidityWidget

const styles = StyleSheet.create({})