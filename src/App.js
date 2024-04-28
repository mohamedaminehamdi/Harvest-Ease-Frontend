import CommunityPage from "../src/ui/pages/CommunityPage";
import ChatbotPage from "../src/ui/pages/ChatbotPage";
import Home from "../src/ui/pages/Home";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import ChatbotPageLayout from "../src/ui/components/chatbot/ChatbotPageLayout"
import Layout from "../src/ui/components/Layout"
import SavedMessagePage from "../src/ui/pages/SavedMessagePage"
function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Forum" element={<CommunityPage />} />
          <Route path="Chatbot" element={<ChatbotPageLayout />}>
            {/* <Route index element={<ChatPage />} /> */}
            <Route path="Chat" element={<ChatbotPage />}/>
            <Route path="Saved-messages" element={<SavedMessagePage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
