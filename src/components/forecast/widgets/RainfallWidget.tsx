import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WidgetDimensionsProps } from './interface'
import Widget from './base/Widget'
import {FontAwesome5} from '@expo/vector-icons'

const RainfallWidget = ({width, height}: WidgetDimensionsProps) => {
  return (
    <Widget height={height} width={width}>
      <Widget.Header
				contentText="Rainfall"
        Icon={FontAwesome5}
        iconProps={{ name: "cloud-rain" }}
			/>
			<Widget.Body
				contentText="1.8mm"
				contentSize='Large'
				subContentText='in last hour'
			/>
			<Widget.Footer contentText="1.2 mm expected in next 24 hours." />
    </Widget>
  )
}

export default RainfallWidget

const styles = StyleSheet.create({})