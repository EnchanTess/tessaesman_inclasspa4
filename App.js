import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";

// import the library to perform state management
import React, { useState } from "react";

// import your components
import Task from "./components/Task.js";

export default function App() {
  // state container to receive the indivuidual input of todo tasks from user
  const [task, setTask] = useState();

  // state management for all the tasks that need to be stored and displayed
  const [taskItems, setTaskItems] = useState([]);

  // event handler or listener to recieve input from the user -- input
  const handleAddTask = () => {
    // dismiss the virtual keyboard
    Keyboard.dismiss();

    // register the new input to the state mangement
    setTaskItems([...taskItems, task]);
    // reset of the state management to handle the individual input
    setTask(null);
  };

  // event logic to delete a task -- delete
  const completeTask = (index) => {
    // create a clone of the original state i.e. all task items
    let itemsCopy = [...taskItems];
    // remove the index from the clone copy
    itemsCopy.splice(index, 1);
    //update the original state using the clone
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* display the list of todo items or tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>My ToDo App</Text>

        {/* container to show the individual tasks by calling the Task.js component */}
        <View style={styles.items}>
          {/* iterate over the list that stores all tasks and render them on UI*/}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* sub section that allows users to give input */}
      {/* make sure that keyboard does not bleed into the app display area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {/* UI compornent to get input from the user*/}
        <TextInput
          style={styles.input}
          placeholder={"Add ToDo items"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        {/* A btn like UI component to add the tasks*/}
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            {/* include an icon or build your own icon from scratch */}
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    // allows us with postion absolute to place this item anywhere on the screen UI
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
