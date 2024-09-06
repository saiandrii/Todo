import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TodoItem from "../Components/TodoItem";
import { colors } from "../assets/colors";
import ModalAddItem from "../Components/ModalAddItem";
import ModalTodo from "../Components/ModalTodo";
import AddItemButton from "../Components/AddItemButton";
import AddItem from "../Components/AddItem";

const MainScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View>
        <AddItem />
        <TodoItem />
        <ModalAddItem />
        <ModalTodo />
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        <View style={{ justifyContent: "flex-end" }}>
          <AddItemButton />
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
