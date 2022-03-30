import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenOne = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate("Two")}>
		<Text>Go To Two</Text>
	</TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate("Three")}>
		<Text>Go To Three</Text>
	</TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
	<TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
		<Text>Change Title</Text>
	</TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
	<NativeStack.Navigator
		screenOptions={{ animation: "flip", headerBackTitleVisible: false }}
	>
		<NativeStack.Screen
			options={{ title: "1" }}
			name="One"
			component={ScreenOne}
		/>
		<NativeStack.Screen name="Two" component={ScreenTwo} />
		<NativeStack.Screen
			name="Three"
			component={ScreenThree}
			options={{ presentation: "modal" }}
		/>
	</NativeStack.Navigator>
);

export default Stack;
