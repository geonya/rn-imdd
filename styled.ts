import { DefaultTheme } from "styled-components/native";
import "styled-components/native";
import { Dimensions } from "react-native";

declare module "styled-components" {
	export interface DefaultTheme {
		mainBgColor: string;
		textColor: string;
		accentColor: string;
	}
}

export const lightTheme: DefaultTheme = {
	mainBgColor: "white",
	textColor: "#1e272e",
	accentColor: "#ffa801",
};
export const darkTheme: DefaultTheme = {
	mainBgColor: "#1e272e",
	textColor: "#d2dae2",
	accentColor: "#ffa801",
};

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");
