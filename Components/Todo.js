import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../context/AppContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

const Todo = ({ item }) => {
  const { modalTodoVisible, setModalTodoVisible } = useContext(TodoContext);
  const { todosArray, setTodosArray } = useContext(TodoContext);
  const { finishedTodosArray, setFinishedTodosArray } = useContext(TodoContext);

  const { index, setIndex } = useContext(TodoContext);
  const { todoItem, setTodoItem } = useContext(TodoContext);
  const [textLines, setTextLines] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [dateVisible, setIsDateVisible] = useState(false);
  const { finishVisible, setFinishVisible } = useContext(TodoContext);

  const finishedTodosHandler = async () => {
    try {
      const jsonValue = JSON.stringify([
        ...finishedTodosArray,
        { ...item, finished: new Date().toISOString().slice(0, -14) },
      ]);
      await AsyncStorage.setItem("finishedTodoArray", jsonValue);
    } catch (e) {
      console.log(e);
    }
    deleteData();
    getFinishedData();
  };
  const getFinishedData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("finishedTodoArray");
      const parsed = JSON.parse(jsonValue);
      console.log(jsonValue);
      setFinishedTodosArray(parsed);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todoArray");
      const parsed = JSON.parse(jsonValue);

      setTodosArray(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async () => {
    try {
      const newItems = [...todosArray].filter((todo) => todo != item);
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem("todoArray", jsonValue);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View key={item.id}>
      {item.pinned === true ? (
        <View style={{}}>
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
              {item.name}
            </Text>
          </TouchableOpacity>
          {dateVisible ? (
            <View style={{ bottom: 30, flexDirection: "row" }}>
              <Text style={{ color: "grey", paddingRight: 15 }}>
                {item.created}
              </Text>
              <View>
                <Feather
                  name="trash-2"
                  size={18}
                  color="red"
                  onPress={() => {
                    setTodoItem(item);

                    deleteData();
                  }}
                />
              </View>
            </View>
          ) : null}

          {!finishVisible ? (
            <View
              style={{
                position: "absolute",

                flex: 1,

                left: "90%",
              }}
            >
              <Feather
                name="check"
                size={26}
                color="black"
                style={{ paddingLeft: 10 }}
                onPress={finishedTodosHandler}
              />
            </View>
          ) : (
            <View
              style={{
                position: "absolute",

                flex: 1,

                left: "93%",

                transform: [{ rotateY: "180deg" }],
              }}
            >
              <AntDesign name="pushpino" size={22} color="black" />
            </View>
          )}
        </View>
      ) : (
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              onPress={() => {
                setIsDateVisible(!dateVisible);
                {
                  textLines == 1 ? setTextLines(0) : setTextLines(1);
                }
              }}
              numberOfLines={textLines}
              style={{
                paddingBottom: 40,
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
          {dateVisible ? (
            <View style={{ bottom: 30, flexDirection: "row" }}>
              <Text style={{ color: "grey", paddingRight: 15 }}>
                {item.created}
              </Text>
              <View>
                <Feather
                  name="trash-2"
                  size={18}
                  color="red"
                  onPress={async () => {
                    setTodoItem(item);

                    deleteData();
                  }}
                />
              </View>
            </View>
          ) : null}

          {!finishVisible ? (
            <View
              style={{
                position: "absolute",

                flex: 1,

                left: "90%",
              }}
            >
              <Feather
                name="check"
                size={26}
                color="black"
                style={{ paddingLeft: 10 }}
                onPress={finishedTodosHandler}
              />
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
