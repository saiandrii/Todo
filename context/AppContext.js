import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
const TodoContext = createContext();
const AppProvider = ({ children }) => {
  const [todosArray, setTodosArray] = useState([]);
  const [finishedTodosArray, setFinishedTodosArray] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState("flex");
  const [isSelected, setIsSelected] = useState([]);
  const [index, setIndex] = useState();
  const [isModalPressed, setIsModalPressed] = useState(false);
  const [modalTodoVisible, setModalTodoVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [finishVisible, setFinishVisible] = useState(true);
  const [todoItem, setTodoItem] = useState();
  const [textValue, setTextValue] = useState("");
  const [textFilterValue, setTextFilterValue] = useState("");
  const [isPinChecked, setIsPinChecked] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        finishedTodosArray,
        setFinishedTodosArray,
        modalVisible,
        setModalVisible,
        todosArray,
        setTodosArray,
        index,
        setIndex,
        isModalPressed,
        setIsModalPressed,
        todoItem,
        setTodoItem,
        isSelected,
        setIsSelected,
        modalTodoVisible,
        setModalTodoVisible,
        inputVisible,
        setInputVisible,
        textValue,
        setTextValue,
        textFilterValue,
        setTextFilterValue,
        isPinChecked,
        setIsPinChecked,
        buttonVisible,
        setButtonVisible,
        finishVisible,
        setFinishVisible,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, AppProvider };

const styles = StyleSheet.create({});
