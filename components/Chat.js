import React from "react";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

import { View, Platform, KeyboardAvoidingView } from "react-native";

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
    };

    //Set up firebase
    const firebaseConfig = {
      // Firestone credentials
      apiKey: "AIzaSyDRNdpAP5fCkTP4k4WrQdEgzdmNLxtgN8g",
      authDomain: "chatapp-ce5f4.firebaseapp.com",
      projectId: "chatapp-ce5f4",
      storageBucket: "chatapp-ce5f4.appspot.com",
      messagingSenderId: "304364997376",
      appId: "1:304364997376:web:7bfa30463e942bbc6341e5",
      measurementId: "G-QC6XL9MF21"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase
      .firestore()
      .collection("messages");
  }


  //Retrieve collection data and store messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  // the user authentication
  componentDidMount() {

    //Display username in navigation
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        }
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }


  // save messages to database
  addMessages() {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  }


  //this is what will be called when a user sends a message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {

    });
  }

  //the code for actually rendering your chat interface 
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        //Colors for the messages
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#fff",
          }
        }}
      />
    );
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
          }}
        />
        {/*Prevent hidden input field on Andriod*/}
        {Platform.OS === "android" ?
          <KeyboardAvoidingView behavior="height" />
          : null}
      </View>
    );
  }
}



