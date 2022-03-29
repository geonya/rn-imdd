import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

export default function App() {
	const [assets] = useAssets([require("./geony-profile.jpeg")]);
	const [loaded] = Font.useFonts(Ionicons.font);
	if (!assets || !loaded) {
		return <AppLoading />;
	}
	return (
		<NavigationContainer>
			<Tabs />
		</NavigationContainer>
	);
}
