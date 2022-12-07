import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const backgroundColors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.image}>
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.mainView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>
            <View style={styles.colorView}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.black },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.black })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.purple },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.purple })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.grey },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.grey })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.green },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.green })
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", { name: this.state.name, color: this.state.color })
              } >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    paddingVertical: "10%"
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    paddingTop: "12%",
    textAlign: "center",
  },
  mainView: {
    flex: 2,
    backgroundColor: "white",
    width: "88%",
    maxHeight: "60%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputView: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 4,
    paddingLeft: 4,
    opacity: 50,
    height: 60,
    width: "88%"
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    position: "absolute",
    height: 60,
    paddingLeft: 120
  },
  colorView: {
    width: "88%"
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colors: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  color: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 25
  },
  button: {
    height: 65,
    width: "88%",
    justifyContent: "center",
    backgroundColor: "#757083"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    width: "88%"
  }

});