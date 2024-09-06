import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import StackNavigator from "./StackNavigator";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <>
      <AppProvider>
        <StackNavigator />
      </AppProvider>
    </>
  );
}
