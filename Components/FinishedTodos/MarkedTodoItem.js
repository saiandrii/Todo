import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/AppContext";
import MarkedTodo from "../FinishedTodos/MarkedTodo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoItem = () => {
  const scrollRef = useRef();

  const { finishedTodosArray, setFinishedTodosArray } = useContext(TodoContext);

  const { buttonVisible, setButtonVisible } = useContext(TodoContext);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View>
          {finishedTodosArray?.length === 0 ? (
            <View
              style={{
                paddingTop: 300,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                Finished Todos will appear here...
              </Text>
            </View>
          ) : (
            finishedTodosArray?.map((item, key) => {
              return <MarkedTodo item={item} key={item?.id} />;
            })
          )}
        </View>
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
});
