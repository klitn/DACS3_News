import { StyleSheet, Text, View,FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import NewsItem from './NewsItem'


const LastestItemList = ({lastestItemList}) => {
  return (
    
    <View style={{backgroundColor: "#fff"}} >
      <FlatList
      showsVerticalScrollIndicator={false}
      data={lastestItemList}
      renderItem={({ item, index }) => (
        <NewsItem item={item}/>
      )}
      
    />
    </View>
  )
}

export default LastestItemList

const styles = StyleSheet.create({
 
  });