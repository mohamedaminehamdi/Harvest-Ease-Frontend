import Home from "./ui/pages/Home";
import ResourcesTrackerPage from "./ui/pages/ResourcesTrackerPage";
import PlantHealth from "./ui/pages/PlantHealth";
import { Routes, Route, Navigate } from "react-router-dom";
import FarmSchedulerPage from "./ui/pages/FarmSchedulerPage";
import "./App.css";
import Layout from "../src/ui/components/Layout";
import SettingsPage from "../src/ui/pages/SettingsPage";
import CommunityPage from "../src/ui/pages/CommunityPage";
import ChatPage from "../src/ui/pages/ChatbotPage";
import SavedMessagesPage from "../src/ui/pages/SavedMessagePage";
import ChatbotPageLayout from "../src/ui/components/chatbot/ChatbotPageLayout";
import Login from "./ui/pages/login";
import { useSelector } from "react-redux";
function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/Settings"
            element={isAuth ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Farm-scheduler"
            element={isAuth ? <FarmSchedulerPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/Resources-tracker"
            element={
              isAuth ? <ResourcesTrackerPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Plant-Health-Scanner"
            element={isAuth ? <PlantHealth /> : <Navigate to="/login" />}
          />
          <Route
            path="/Forum"
            element={isAuth ? <CommunityPage /> : <Navigate to="/login" />}
          />
          <Route
            path="Chatbot"
            element={isAuth ? <ChatbotPageLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<ChatPage />} />
            <Route path="Chat" element={<ChatPage />} />
            <Route
              path="Saved-messages"
              element={
                isAuth ? <SavedMessagesPage /> : <Navigate to="/login" />
              }
            />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
