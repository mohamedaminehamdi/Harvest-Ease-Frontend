


import ChatbotPage from "./ui/pages/ChatbotPage";
import Home from "./ui/pages/Home";
import  ResourcesTrackerPage from "./ui/pages/ResourcesTrackerPage";
import PlantHealth from "./ui/pages/PlantHealth";
import { Routes, Route, Link } from "react-router-dom";
import FarmSchedulerPage from "./ui/pages/FarmSchedulerPage";
import "./App.css";
import Layout from "../src/ui/components/Layout";
import SettingsPage from "../src/ui/pages/SettingsPage";
import CommunityPage from "../src/ui/pages/CommunityPage"
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
          <Route path="/Plant-Health-Scanner" element={<PlantHealth />} />
          <Route path="/Forum" element={<CommunityPage/>} />
          <Route path="Chatbot" element={<ChatbotPageLayout />}>
            <Route index element={<ChatPage />} /> 
            <Route path="Chat" element={<ChatPage />}/>
            <Route path="Saved-messages" element={<SavedMessagesPage />} />
          </Route>
        </Routes>
      </Layout>

    </div>
  );
}


export default App;