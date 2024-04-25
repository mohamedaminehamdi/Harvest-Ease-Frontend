import CommunityPage from "./pages/CommunityPage";
import ChatbotPage from "./pages/ChatbotPage";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Link to="/"></Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Forum" element={<CommunityPage />} />
        <Route path="/Chatbot" element={<ChatbotPage />} />
      </Routes>
    </div>
  );
}

export default App;
