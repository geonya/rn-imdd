import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
	const [ready, setReady] = useState(false);
	const onFinish = () => setReady(true);
	const startLoading = async () => {
		const fonts = loadFonts([Ionicons.font]);
		await Promise.all([...fonts]);
	};
	if (!ready) {
		return (
			<AppLoading
				startAsync={startLoading}
				onFinish={onFinish}
				onError={console.error}
			/>
		);
	}
	return (
		<NavigationContainer>
			<Root />
		</NavigationContainer>
	);
}
