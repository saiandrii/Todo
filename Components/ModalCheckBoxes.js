import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import CheckBox from "react-native-check-box";
import { TodoContext } from "../context/AppContext";

const ModalCheckBoxes = () => {
  const { isPinChecked, setIsPinChecked } = useContext(TodoContext);

  return (
    <View style={{ paddingLeft: 15, paddingTop: 30 }}>
      <CheckBox
        rightText="Pin Todo"
        rightTextStyle={{ fontSize: 15 }}
        style={{ paddingBottom: 15 }}
        isChecked={isPinChecked}
        onClick={() => {
          setIsPinChecked(!isPinChecked);
        }}
      />
    </View>
  );
};

export default ModalCheckBoxes;

const styles = StyleSheet.create({});
