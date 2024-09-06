import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TodoItem from "../Components/TodoItem";
import { colors } from "../assets/colors";
import ModalAddItem from "../Components/ModalAddItem";
import ModalTodo from "../Components/ModalTodo";
import MarkedTodoItem from "../Components/FinishedTodos/MarkedTodoItem";

const FinishedTodo = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingTop: 60 }}>
        <MarkedTodoItem />
        <ModalAddItem />
        <ModalTodo />
      </View>
    </View>
  );
};

export default FinishedTodo;

const styles = StyleSheet.create({});
