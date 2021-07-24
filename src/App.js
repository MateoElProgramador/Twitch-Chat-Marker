import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './stylesheets/App.css';
import './stylesheets/app.sass';
// import './js/twitch';

function App() {
  return (
    <div className="App">
      <ChatBox />
    </div>
  );
}

function ChatBox() {
  // Create state for functional component, storing chat data and index of chat marker:
  const [messages, setMessages] = useState([{chatterName: "streamlurkr", colour: "000000", content: "!lurk"}]);
  const [markerInd, setMarkerInd] = useState(0);
  const [isRealChat, setIsRealChat] = useState(true);


  
  useEffect(() => {
    // Set up Twitch chat listener:
    if (isRealChat) {
      let client = setUpChat();
      return () => client.disconnect();
    // Set up interval for new fake message to be added to state every 3 seconds:
    } else {
      const updateChat = setInterval(newFakeMessage, 3000);
      return () => clearInterval(updateChat);
    }

  }, [messages]);  // only calls this if messages changes - prevents spamming marker buttons breaking everything!

  useEffect(() => {
    console.log("Marker updated!")
  }, [markerInd]);



  const setUpChat = () => {
    // Set up twitch chat:
    const tmi = require('tmi.js');

    const client = new tmi.Client({
      channels: [ 'vgbootcamp' ]
    });

    client.connect();

    // Callback upon a new chat message:
    client.on("message", (channel, tags, message, self) => {
      console.log(`${tags["display-name"]}: ${message}`);
      
      // Create new message object and add to messages state list:
      const newRealMessage = {chatterName: tags["display-name"], colour: getRandColour(), content: message};
      setMessages([...messages, newRealMessage]);
    });

    return client;
  }


  // Create new fake message with random name colour, and add to messages state list:
  const newFakeMessage = () => {
    if (isRealChat) return;   // If real chat selected, do nothing

    const randColour = getRandColour();
    
    // Create new message object and append to messages state list:
    const newMessage = {chatterName: "NewBoi_" + Math.floor(Math.random() * 1000), colour: randColour, content: "I'm new!"};
    setMessages([...messages, newMessage]);
  }

  // Return random colour from list of hex codes:
  const getRandColour = () => {  
    const colours = ["0000FF", "FF0000", "8A2BE2", "FF69B4", "1E90FF", "008000", "00FF7F", "B22222", "DAA520", "FF4500", "2E8B57", "5F9EA0", "D2691E"];
    const randColour = colours[Math.floor(Math.random() * colours.length)];
    return randColour;
  }


  const jumpToMarker = () => {
    $(".chat-marker")[0].scrollIntoView(true);
  };

  // Callback for catchup button, moves marker position to bottom of chat list:
  const catchup = () => {
    setMarkerInd(messages.length-1);
    $("#chat-end")[0].scrollIntoView(true);
    // $(".chat-marker")[0].scrollIntoView(false);
  };

  // Callback for up button, decrements marker index if it's not already 0:
  const markerUp = () => {
    if (markerInd !== 0) {
      setMarkerInd(markerInd-1);
    }
  };

  // Callback for down button, increments marker index if it's not already at the end of the messages list:
  const markerDown = () => {
    if (markerInd !== messages.length-1)
      setMarkerInd(markerInd+1);
  };

  // Callback for real chat checkbox:
  const toggleRealChat = (event) => {
    setIsRealChat(!isRealChat);
  }


  let message_comps = [];   // message components

  // Collate list of components containing info from the messages state list:
  for (let i=0; i<messages.length; i++) {
    message_comps.push(<ChatMessage
                          key={i}
                          chatterName={messages[i].chatterName}
                          colour={messages[i].colour}
                          content={messages[i].content}
                        />
    );

    // Add chat marker at correct position:
    if (i === markerInd) {
      message_comps.push(<hr key="marker" className="chat-marker"/>);
    }
  }

  // Add hidden element to bottom of chat box to mark end of messages:
  message_comps.push(<span id="chat-end" key="chat-end"/>);

  return (
    <div id="chat-box-container">
      <div id="chat-box">
        {message_comps}
      </div>
      
      <button id="jumpto-marker" onClick={jumpToMarker}>Jump to marker</button>
      <button id="catchup-button" onClick={catchup}>Catch up</button>
      <button id="marker-up" onClick={markerUp}>Up</button>
      <button id="marker-down" onClick={markerDown}>Down</button>
      <div>
        <label id="real-chat-label">
          <input name="realChatCheckbox" type="checkbox" checked={isRealChat} onChange={toggleRealChat}/>
          Real chat
        </label>
      </div>
    </div>
  );
}


// Component for an invididual chat message:
function ChatMessage(props) {
  const style = {color: `#${props.colour}`};
  return (
        <div className="chat-message">
          <span className="chatter-name" style={style}>{props.chatterName}</span>:&nbsp;
          <span className="chatter-content">{props.content}</span>
        </div>
  );
}

export default App;
