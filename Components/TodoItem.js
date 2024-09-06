import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddItem from "./AddItem";
import { TodoContext } from "../context/AppContext";
import Todo from "./Todo";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddItemButton from "./AddItemButton";

const TodoItem = () => {
  const scrollRef = useRef();
  const { todosArray, setTodosArray } = useContext(TodoContext);
  const { textFilterValue, setTextFilterValue } = useContext(TodoContext);
  const { buttonVisible, setButtonVisible } = useContext(TodoContext);
  const windowHeight = Dimensions.get("screen").height;

  const fetchTodos = todosArray.map((item) => {
    const items = item.name;

    return items;
  });

  const filteredTodos = fetchTodos.filter((element) => {
    const res = element === textFilterValue;
    return res;
  });

  const mapFilteredTodos = () => {
    if (todosArray.length === 0) {
      return (
        <View
          style={[windowHeight > 700 ? styles.adviceHigh : styles.adviceLow]}
        >
          <Text style={{ fontSize: 15, color: "grey" }}>
            Press here to add some Todos
          </Text>
          <Feather
            name="arrow-right"
            size={20}
            color="grey"
            style={{ paddingLeft: 5 }}
          />
        </View>
      );
    } else {
      return todosArray.map((item, key) => {
        if (item.name === filteredTodos[0]) {
          return <Todo item={item} key={item.id} />;
        } else if (!filteredTodos[0]) {
          return <Todo item={item} key={item.id} />;
        }
      });
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          const highestPoint = (e.nativeEvent.contentOffset.y = 0);
          const direction = currentOffset > this.offset ? "down" : "up";
          this.offset = currentOffset;

          if (direction === "down") {
            setButtonVisible("none");
          } else if (direction === "up") {
            setButtonVisible("flex");
          }
        }}
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {mapFilteredTodos()}
      </ScrollView>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    fontSize: 20,
  },
  adviceLow: {
    flex: 1,
    paddingTop: 561,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 40,
  },
  adviceHigh: {
    flex: 1,
    paddingTop: 642,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 60,
  },
});
