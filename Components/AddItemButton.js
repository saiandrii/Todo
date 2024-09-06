import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { TodoContext } from "../context/AppContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../assets/colors";

const AddItemButton = () => {
  const { modalVisible, setModalVisible } = useContext(TodoContext);
  const { buttonVisible, setButtonVisible } = useContext(TodoContext);
  const windowHeight = Dimensions.get("screen").height;

  return (
    <TouchableOpacity
      style={[
        windowHeight > 700
          ? styles.addbuttonHighScreen
          : styles.addbuttonLowScreen,
      ]}
    >
      <Pressable
        style={{
          display: buttonVisible,
          backgroundColor: colors.background,
          width: 40,
          height: 40,
        }}
        onPress={() => setModalVisible(true)}
      >
        <View>
          <FontAwesome6 name="add" size={40} color="black" />
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default AddItemButton;

const styles = StyleSheet.create({
  addbuttonLowScreen: { top: 640, left: 340 },
  addbuttonHighScreen: { top: 720, left: 340 },
});
