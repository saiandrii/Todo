import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/AppContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

const Todo = ({ item }) => {
  const { modalTodoVisible, setModalTodoVisible } = useContext(TodoContext);

  const { finishedTodosArray, setFinishedTodosArray } = useContext(TodoContext);
  const [dateVisible, setIsDateVisible] = useState(false);

  const { todoItem, setTodoItem } = useContext(TodoContext);
  const [textLines, setTextLines] = useState(1);

  const { finishVisible, setFinishVisible } = useContext(TodoContext);

  return (
    <View key={item.id}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
            paddingBottom: 40,
          }}
        >
          <Text
            ellipsizeMode="tail"
            onPress={() => {
              setIsDateVisible(!dateVisible);
              {
                textLines == 1 ? setTextLines(0) : setTextLines(1);
              }
            }}
            numberOfLines={textLines}
            style={{
              fontSize: 20,
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
        {dateVisible ? (
          <View
            style={{
              bottom: 30,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "grey", paddingRight: 15 }}>
              {item.created}
            </Text>
            <Text style={{ color: "grey", paddingRight: 15 }}>
              {item.finished}
            </Text>
            <View>
              <Feather
                name="trash-2"
                size={18}
                color="red"
                onPress={() => {
                  setTodoItem(item);

                  setModalTodoVisible(true);
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
