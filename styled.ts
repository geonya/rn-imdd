import { DefaultTheme } from "styled-components/native";

// import original module declarations
import "styled-components/native";

// and extend them!
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
	accentColor: "yellow",
};
export const darkTheme: DefaultTheme = {
	mainBgColor: "#1e272e",
	textColor: "#d2dae2",
	accentColor: "yellow",
};
