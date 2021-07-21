import { useState, useEffect } from 'react';
import './stylesheets/App.css';
import './stylesheets/app.sass';

function App() {
  return (
    <div className="App">
      <ChatBox />
    </div>
  );
}

function ChatBox() {

  // Create state for functional component, storing chat data:
  const [messages, setMessages] = useState([{chatterName: "streamlurkr", colour: "000000", content: "!lurk"}]);

  // Set up interval for new message to be added to state every 5 seconds:
  useEffect(() => {
    const updateChat = setInterval(() => {
      // Get random colour from list of hex codes:
      const colours = ["0000FF", "FF0000", "8A2BE2", "FF69B4", "1E90FF", "008000", "00FF7F", "B22222", "DAA520", "FF4500", "2E8B57", "5F9EA0", "D2691E"];
      let randColour = colours[Math.floor(Math.random() * colours.length)];
      
      // Create new message object and append to messages state list:
      const newMessage = {chatterName: "NewBoi_" + Math.floor(Math.random() * 1000), colour: randColour, content: "I'm new!"};
      setMessages([...messages, newMessage]);
    }, 5000);

    return () => clearInterval(updateChat);
  });

  let message_comps = [];   // message components

  // Collate list of components containing info from the messages state list:
  for (let i=0; i<messages.length; i++) {
    message_comps.push(<ChatMessage key={i} chatterName={messages[i].chatterName} colour={messages[i].colour} content={messages[i].content} />);
  }

  return (
    <div id="chat-box">
      {message_comps}
    </div>
  );
}


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
