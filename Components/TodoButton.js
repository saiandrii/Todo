import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Children, useContext } from "react";
import { colors } from "../assets/colors";
import { TodoContext } from "../context/AppContext";

const TodoButton = ({ onPress, children, style, styleButton }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          ...style,
        }}
      >
        <Text
          style={{
            padding: 15,
            fontWeight: "bold",
            color: colors.font,
            ...styleButton,
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TodoButton;

const styles = StyleSheet.create({});
