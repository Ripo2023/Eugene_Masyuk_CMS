import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { RootScreens } from "./config";
import { OrdersScreen } from "./Orders";

export type RootStackListType = {
	Authentication: undefined;
	Dashboard: undefined;
	Home: undefined;
	Orders: undefined;
};

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing = () => {
	return (
		<>
			<Stack.Navigator
				initialRouteName={RootScreens.ORDERS}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name={RootScreens.ORDERS}
					component={OrdersScreen}
				/>
			</Stack.Navigator>
		</>
	);
};
