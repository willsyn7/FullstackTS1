import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return (
    <>
      <h1>Message Board</h1>
      <div id="new-message-container">
        <input id="pass" placeholder="Password" type="password"></input>
        <textarea id="text" placeholder="New message here..."></textarea>
      </div>
      <ul id="message-list"></ul>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
