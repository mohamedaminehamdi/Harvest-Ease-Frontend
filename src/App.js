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
          <Route path="/Settings" element={protectedRoute(<SettingsPage />)} />
          <Route path="/login" element={<Login />} />
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
            <Route index element={<ChatPage />} />
            <Route path="Chat" element={<ChatPage />} />
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
