import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";

import React, { useContext, useRef, useState } from "react";

import { TodoContext } from "../context/AppContext";
import { colors } from "../assets/colors";

const AddItem = () => {
  const { todosArray, setTodosArray } = useContext(TodoContext);

  const { inputVisible, setInputVisible } = useContext(TodoContext);
  const { finishVisible, setFinishVisible } = useContext(TodoContext);

  const { textFilterValue, setTextFilterValue } = useContext(TodoContext);

  const navigation = useNavigation();
  const refFocus = useRef();
  if (todosArray?.length === 0) {
    setInputVisible(false);
    setFinishVisible(true);
  }
  return (
    <View
      style={{
        backgroundColor: colors.background,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingTop: 40,
        paddingRight: 20,
      }}
    >
      <TextInput
        value={textFilterValue}
        onChangeText={(text) => setTextFilterValue(text)}
        maxLength={124}
        ref={refFocus}
        style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 10,
          fontSize: 15,
          display: "flex",
          top: 2,
        }}
      />
      <TouchableOpacity style={{ flexDirection: "row" }}>
        {textFilterValue != "" ? setInputVisible(true) : null}

        {finishVisible ? (
          inputVisible === false ? (
            <Feather
              name="search"
              size={24}
              color="black"
              onPress={() => {
                setInputVisible(true);
                refFocus.current?.focus();
              }}
            />
          ) : (
            <Feather
              name="x"
              size={24}
              color="black"
              onPress={() => {
                setInputVisible(false);

                refFocus.current?.blur();
                setTextFilterValue("");
              }}
            />
          )
        ) : null}

        {finishVisible ? (
          <Feather
            name="list"
            size={24}
            color="black"
            style={{ paddingLeft: 10 }}
            onPress={() => {
              setFinishVisible(false);
              setInputVisible(true);
            }}
          />
        ) : (
          <Feather
            name="x"
            size={26}
            color="black"
            style={{ paddingLeft: 10 }}
            onPress={() => {
              setFinishVisible(true);
              setInputVisible(false);
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
