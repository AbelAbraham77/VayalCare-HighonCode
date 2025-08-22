import React, { useState } from "react";
import LoginPage from "../components/LoginPage";
import HomeScreen from "../components/HomeScreen";
import FarmingTwinScreen from "../components/FarmingTwinScreen";
import FarmerAssistantScreen from "../components/FarmerAssistantScreen";
import AlertsScreen from "../components/AlertsScreen";
import ProfileScreen from "../components/ProfileScreen";
import DiagnoseCropScreen from "../components/DiagnoseCropScreen";
import MarketPricesScreen from "../components/MarketPricesScreen";
import CropPlannerScreen from "../components/CropPlannerScreen";
import WeatherAlertsScreen from "../components/WeatherAlertsScreen";
import FarmerForumScreen from "../components/FarmerForumScreen";
import KnowledgeCenterScreen from "../components/KnowledgeCenterScreen";
import BuyInputsScreen from "../components/BuyInputsScreen";
import ScanPestScreen from "../components/ScanPestScreen";
import ExpenseTrackerScreen from "../components/ExpenseTrackerScreen";
import AgricultureNewsScreen from "../components/AgricultureNewsScreen";
import GovtSchemesScreen from "../components/GovtSchemesScreen";
import BottomNavigation from "../components/BottomNavigation";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [initialChatQuestion, setInitialChatQuestion] = useState<string | null>(
    null
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLanguageChange = (languageCode: string) => {
    console.log("Language changed to:", languageCode);
    setSelectedLanguage(languageCode);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            onFeatureClick={(id) => {
              // Reset any pending chat question unless going to chatbot via voice
              if (id !== "chatbot") setInitialChatQuestion(null);
              setActiveTab(id);
            }}
            onVoiceChat={(q) => {
              setInitialChatQuestion(q);
              setActiveTab("chatbot");
            }}
            language={selectedLanguage}
          />
        );
      case "twin":
        return <FarmingTwinScreen onBack={() => setActiveTab("home")} />;
      case "chatbot":
        return (
          <FarmerAssistantScreen
            initialQuestion={initialChatQuestion || undefined}
            onExit={() => {
              setActiveTab("home");
              setInitialChatQuestion(null);
            }}
          />
        );
      case "notifications":
        return <AlertsScreen onBack={() => setActiveTab("home")} />;
      case "profile":
        return <ProfileScreen />;
      case "diagnose":
        return <DiagnoseCropScreen onBack={() => setActiveTab("home")} />;
      case "market":
        return <MarketPricesScreen onBack={() => setActiveTab("home")} />;
      case "planner":
        return <CropPlannerScreen onBack={() => setActiveTab("home")} />;
      case "weather":
        return <WeatherAlertsScreen onBack={() => setActiveTab("home")} />;
      case "forum":
        return <FarmerForumScreen onBack={() => setActiveTab("home")} />;
      case "resources":
        return (
          <KnowledgeCenterScreen
            onBack={() => setActiveTab("home")}
            onFeatureClick={setActiveTab}
          />
        );
      case "knowledge":
        return (
          <KnowledgeCenterScreen
            onBack={() => setActiveTab("home")}
            onFeatureClick={setActiveTab}
          />
        );
      case "buy":
        return <BuyInputsScreen onBack={() => setActiveTab("home")} />;
      case "scan":
        return <ScanPestScreen onBack={() => setActiveTab("home")} />;
      case "expense":
        return <ExpenseTrackerScreen onBack={() => setActiveTab("home")} />;
      case "news":
        return <AgricultureNewsScreen onBack={() => setActiveTab("home")} />;
      case "schemes":
        return <GovtSchemesScreen onBack={() => setActiveTab("home")} />;
      default:
        return (
          <HomeScreen
            onFeatureClick={setActiveTab}
            language={selectedLanguage}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {renderScreen()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
