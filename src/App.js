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
  return (
    <div id="chat-box">
      <ChatMessage
          chatterName="matashio"
          content="Respect that"
        />
      <ChatMessage
        chatterName="CactusSB"
        content="I don't believe you"
      />
      <ChatMessage
        chatterName="MateoElGoron"
        content="Yep, it's a bold move mind"
      />
    </div>
  );
}

function ChatMessage(props) {
  let colours = ["0000FF", "FF0000", "8A2BE2", "FF69B4", "1E90FF", "008000", "00FF7F", "B22222", "DAA520", "FF4500", "2E8B57", "5F9EA0", "D2691E"];
  let randColour = colours[Math.floor(Math.random() * colours.length)];
  const style = {color: `#${randColour}`};
  return (
        <div className="chat-message">
          <span className="chatter-name" style={style}>{props.chatterName}</span>:&nbsp;
          <span className="chatter-content">{props.content}</span>
        </div>
  );
}

export default App;
