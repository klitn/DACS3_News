import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

const date = new Date();
const API_KEY = "AIzaSyASWUxre2cXksS42hb7INNV9K9apMhcjYA";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Response(props) {
	const [generatedText, setGeneratedText] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const prompt = props.prompt;
			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = await response.text();
			setGeneratedText(text);
		};
		fetchData();
	}, []);

	return (
		<View style={styles.response}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Image source={require("../../assets//icons/chatbot.png")} style={{height:40, width:25}} />
					<Text style={{ fontWeight: 600 }}>Kabar</Text>
				</View>
				<Text style={{ fontSize: 10, fontWeight: "600" }}>
					{date.getHours()}:{date.getMinutes()}
				</Text>
			</View>
			<Markdown>{generatedText}</Markdown>
		</View>
	);
}

const styles = StyleSheet.create({
	response: {
		flexDirection: "column",
		gap: 8,
		backgroundColor: "#ffffff",
		marginBottom: 8,
		padding: 16,
		borderRadius: 16,
		
	},
	icon: {
		width: 28,
		height: 28,
	},
});
