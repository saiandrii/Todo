import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FinishedTodo from "./FinishedTodo";
import MainScreen from "./MainScreen";
import { colors } from "../assets/colors";

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },

          tabBarIndicatorStyle: {
            backgroundColor: colors.font,
            width: "12%",
            height: 3,
            borderRadius: 1.5,
            marginLeft: 75,
          },
        }}
        name="Main"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
        }}
        name="FinishedTabs"
        component={FinishedTodo}
      />
    </Tab.Navigator>
  );
}
export default Tabs;
