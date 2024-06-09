import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import Response from "../components/Chatbot/response";
import Message from "../components/Chatbot/message";

export default function ChatBot() {
	const [inputText, setInputText] = useState("");
	const [listData, setListData] = useState([]);
	const SearchInput = () => {
		setListData((prevList) => [...prevList, inputText]);
		setInputText("");
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			{/* Header */}
			<View style={styles.header}>
				<Image source={require("../assets/icons/chatbot.png")} style={styles.icon} />
				<Text style={{ fontSize: 24, fontWeight: "800", color: "#1877F2", }}>Kabar AI</Text>
			</View>

			{/* Content */}
			<FlatList
			showsVerticalScrollIndicator={false}
				style={{ paddingHorizontal: 16, marginBottom: 80 }}
				data={listData}
				renderItem={({ item }) => (
					<View>
						<Message message={item} />
						<Response prompt={item} />
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>

			{/* Search-Bar */}
			<View style={styles.searchBar}>
				<TextInput placeholder="Ask to Kabar AI" style={styles.input} value={inputText} onChangeText={(text) => setInputText(text)} selectionColor={"#323232"}></TextInput>
				<TouchableOpacity onPress={SearchInput}>
					<Image source={require("../assets/icons/right-arrow.png")} style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		paddingTop: 36,
		backgroundColor: "#ffffff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		margin: 8,
		gap: 8,
	},
	icon: {
		width: 25,
		height: 40,
	},
	searchBar: {
		backgroundColor: "#ffffff",
		width: "100%",
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		paddingVertical: 8,
		gap: 8,
	},
	input: {
		backgroundColor: "#fff",
		width: "100%",
		fontSize: 16,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 32,
		borderWidth: 0.1,
	},
});
