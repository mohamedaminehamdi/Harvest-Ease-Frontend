import CommunnityPage from "../src/ui/pages/CommunityPage";
import ChatbotPage from "../src/ui/pages/chatpage";
import Home from "../src/ui/pages/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "../src/ui/components/Layout";
import SettingsPage from "../src/ui/pages/SettingsPage";
import FarmSchedulerPage from "../src/ui/pages/FarmSchedulerPage";
import ResourcesTrackerPage from "../src/ui/pages/ResourcesTrackerPage";
import ChatPage from "../src/ui/pages/ChatbotPage";
import SavedMessagesPage from "../src/ui/pages/SavedMessagePage";
import ChatbotPageLayout from "../src/ui/components/chatbot/ChatbotPageLayout";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/Farm-scheduler" element={<FarmSchedulerPage />} />
          <Route path="/Resources-tracker" element={<ResourcesTrackerPage />} />
          <Route path="/Forum" element={<CommunnityPage />} />
          <Route path="Chatbot" element={<ChatbotPageLayout />}>
            {/* <Route index element={<ChatPage />} /> */}
            <Route path="Chat" element={<ChatPage />}/>
            <Route path="Saved-messages" element={<SavedMessagesPage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;