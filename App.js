import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import PropertyDetails from "./screens/PropertyDetails";
import Summary from "./screens/Summary";
import ATRPlot from "./screens/ATRPlot";
import RevenueAnalysis from "./screens/RevenueAnalysis";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  width: "100%",
                  height: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(224 224 255)",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  GOV PAK TAX APP
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "rgb(224 224 255)",
          },
          headerTintColor: "#111",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "blue",
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="PropertyDetails"
          options={{
            drawerLabel: "Property Details",
            title: "Real Estate Property Tax App",
          }}
          component={PropertyDetails}
        />
        <Drawer.Screen
          name="Summary"
          options={{
            drawerLabel: "Summary",
            title: "Real Estate Property Tax App",
          }}
          component={Summary}
        />
        <Drawer.Screen
          name="ATRPlot"
          options={{
            drawerLabel: "ATR Plot",
            title: "Real Estate Property Tax App",
          }}
          component={ATRPlot}
        />
        <Drawer.Screen
          name="RevenueAnalysis"
          options={{
            drawerLabel: "Revenue Analysis",
            title: "Real Estate Property Tax App",
          }}
          component={RevenueAnalysis}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
