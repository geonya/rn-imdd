import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === "dark";

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: isDark ? "black" : "white",
				},
			}}
		>
			<Tab.Screen name="Movies" component={Movies} />
			<Tab.Screen name="Tv" component={Tv} />
			<Tab.Screen name="Search" component={Search} />
		</Tab.Navigator>
	);
};

export default Tabs;
