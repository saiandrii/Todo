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
import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/AppContext";
import Feather from "@expo/vector-icons/Feather";

import { Entypo } from "@expo/vector-icons";
import { colors } from "../assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoButton from "./TodoButton";
import ModalCheckBoxes from "./ModalCheckBoxes";

const ModalAddItem = () => {
  const { todosArray, setTodosArray } = useContext(TodoContext);
  const { isPinChecked, setIsPinChecked } = useContext(TodoContext);
  const { finishedTodosArray, setFinishedTodosArray } = useContext(TodoContext);

  const { modalVisible, setModalVisible } = useContext(TodoContext);
  const { index, setIndex } = useContext(TodoContext);

  const { textValue, setTextValue } = useContext(TodoContext);
  const windowHeight = Dimensions.get("screen").height;

  const buttonHanlder = () => {
    setModalVisible(false);
    setTextValue("");
    setIsPinChecked(false);
    storeData();
    getData();
  };
  useEffect(() => {
    const timeout = setInterval(getData());

    return clearInterval(timeout);
  }, []);

  const storeData = async () => {
    if (!isPinChecked) {
      try {
        const jsonValue = JSON.stringify([
          ...todosArray,
          {
            name: textValue,
            id: new Date() + Math.random(),
            created: new Date().toISOString().slice(0, -14),
          },
        ]);
        await AsyncStorage.setItem("todoArray", jsonValue);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const jsonValue = JSON.stringify([
          {
            name: textValue,
            pinned: true,
            id: toString(Date.now()) + Math.random(),
            created: new Date().toISOString().slice(0, -14),
          },
          ...todosArray,
        ]);
        await AsyncStorage.setItem("todoArray", jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todoArray");
      if (jsonValue === null) {
        try {
          const jsonValue = JSON.stringify([
            ...todosArray,
            {
              name: "This is your first todo :)",
              id: new Date() + Math.random(),
              created: new Date().toISOString().slice(0, -14),
            },
          ]);
          await AsyncStorage.setItem("todoArray", jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        const parsed = JSON.parse(jsonValue);
        setTodosArray(parsed);
      }
      const finishedJsonValue = await AsyncStorage.getItem("finishedTodoArray");
      if (finishedJsonValue === null) {
        try {
          const jsonValue = JSON.stringify([
            ...finishedTodosArray,
            {
              name: "This is your first finished todo :)",
              id: new Date() + Math.random(),
              created: new Date().toISOString().slice(0, -14),
            },
          ]);
          await AsyncStorage.setItem("finishedTodoArray", jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        const finishedParsed = JSON.parse(finishedJsonValue);
        setFinishedTodosArray(finishedParsed);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <Pressable
        onPressOut={() => setModalVisible(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",

          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior="padding"
            style={[windowHeight > 700 ? styles.modalHigh : styles.modalLow]}
          >
            <View
              style={{
                alignItems: "flex-end",
                paddingTop: 16,
                paddingRight: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{}}
              >
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingTop: 25,
                marginHorizontal: 20,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                paddingBottom: 2,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                autoFocus={true}
                value={textValue}
                onChangeText={(text) => setTextValue(text)}
                maxLength={40}
                autoCapitalize={true}
                multiline={true}
                placeholder="Add your Todo here..."
                style={{
                  fontSize: 15,
                }}
              ></TextInput>
              {textValue.trim().length === 0 ? null : (
                <View style={{}}>
                  <Feather
                    name="check"
                    size={24}
                    color="black"
                    onPress={buttonHanlder}
                  />
                </View>
              )}
            </View>

            <ModalCheckBoxes />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalAddItem;

const styles = StyleSheet.create({
  modalHigh: { backgroundColor: colors.background, flex: 0.5, top: "65%" },
  modalLow: { backgroundColor: colors.background, flex: 0.5, top: "55%" },
});
