
import ResourcesTrackerPage from "./ui/pages/ResourcesTrackerPage";
import PlantHealth from "./ui/pages/PlantHealth";
import { Routes, Route, Navigate } from "react-router-dom";
import FarmSchedulerPage from "./ui/pages/FarmSchedulerPage";

import ChatPage from "./ui/pages/chatpage";
import './App.css';
import Home from "../src/ui/pages/Home";

import "./App.css";
import Layout from "../src/ui/components/Layout";
import SettingsPage from "../src/ui/pages/SettingsPage";
import CommunityPage from "../src/ui/pages/CommunityPage";
import SavedMessagesPage from "../src/ui/pages/SavedMessagePage";
import ChatbotPageLayout from "../src/ui/components/chatbot/ChatbotPageLayout";
import { useSelector } from "react-redux";
import Login from "./ui/pages/login";
function App() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const protectedRoute = (element) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return element;
  };
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/Settings" element={protectedRoute(<SettingsPage />)} />
          <Route
            path="/Farm-scheduler"
            element={protectedRoute(<FarmSchedulerPage />)}
          />
          <Route
            path="/Resources-tracker"
            element={protectedRoute(<ResourcesTrackerPage />)}
          />
          <Route
            path="/Plant-Health-Scanner"
            element={protectedRoute(<PlantHealth />)}
          />
          <Route path="/Forum" element={protectedRoute(<CommunityPage />)} />
          <Route path="Chatbot" element={protectedRoute(<ChatbotPageLayout />)}>
            <Route index element={protectedRoute(<ChatPage />)} />
            <Route path="Chat" element={protectedRoute(<ChatPage />)} />
            <Route
              path="Saved-messages"
              element={protectedRoute(<SavedMessagesPage />)}
            />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
