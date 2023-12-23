import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import PropertyDetails from "./src/screens/PropertyDetails";
import Summary from "./src/screens/Summary";
import ATRPlot from "./src/screens/ATRPlot";
import RevenueAnalysis from "./src/screens/RevenueAnalysis";
import { MyProvider } from "./src/context/DataContext";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./src/screens/HomePage";
import Dashboard1 from "./src/components/Dashboard1";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: "Real Estate Property Tax App" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="Dashboard1" component={Dashboard1} />
          <Stack.Screen name="Dashboard2" component={Dashboard2} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

function Dashboard2() {
  return (
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
                PROP TAX APP
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
  );
}
