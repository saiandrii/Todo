import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { TodoContext } from "../context/AppContext";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../assets/colors";

import TodoButton from "./TodoButton";
import ModalCheckBoxes from "./ModalCheckBoxes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalAddItem = () => {
  const { todosArray, setTodosArray } = useContext(TodoContext);
  const { finishedTodosArray, setFinishedTodosArray } = useContext(TodoContext);

  const { modalTodoVisible, setModalTodoVisible } = useContext(TodoContext);
  const { isModalPressed, setIsModalPressed } = useContext(TodoContext);

  const { todoItem, setTodoItem } = useContext(TodoContext);
  const windowHeight = Dimensions.get("screen").height;

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("finishedTodoArray");
      const parsed = JSON.parse(jsonValue);

      setFinishedTodosArray(parsed);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal visible={modalTodoVisible} animationType="fade" transparent={true}>
      <Pressable
        onPressOut={() => setModalTodoVisible(false)}
        activeOpacity={0.7}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={[windowHeight > 700 ? styles.modalHigh : styles.modalLow]}
          >
            <View
              style={{
                justifyContent: "center",
                paddingTop: 50,
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  bottom: 20,
                  paddingLeft: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Do you want to delete this todo?
                </Text>
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  bottom: 10,
                  paddingLeft: 20,
                }}
              >
                <Text style={{ fontSize: 15, paddingBottom: 2 }}>
                  Created: {todoItem?.created}
                </Text>
                {todoItem?.finished ? (
                  <Text style={{ fontSize: 15 }}>
                    Finished: {todoItem?.finished}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 15 }}>Not finished yet</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",

                  bottom: 15,
                  paddingRight: 10,
                }}
              >
                <TodoButton
                  children={"Cancel"}
                  style={{ fontWeight: "bold", color: "red" }}
                  onPress={() => {
                    setModalTodoVisible(false);
                  }}
                />
                <TodoButton
                  onPress={async () => {
                    try {
                      const newItems = [...finishedTodosArray].filter(
                        (todo) => todo != todoItem
                      );
                      const jsonValue = JSON.stringify(newItems);
                      await AsyncStorage.setItem(
                        "finishedTodoArray",
                        jsonValue
                      );
                      getData();
                    } catch (e) {
                      console.log(e);
                    }

                    setModalTodoVisible(false);
                  }}
                  children={"Delete"}
                  styleButton={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "red",
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalAddItem;

const styles = StyleSheet.create({
  modalHigh: {
    backgroundColor: colors.background,
    flex: 0.2,
    top: "40%",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalLow: {
    backgroundColor: colors.background,
    flex: 0.28,
    top: "40%",
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
