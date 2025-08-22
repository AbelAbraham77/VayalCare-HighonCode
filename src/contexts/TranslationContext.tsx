import React, { createContext, useContext, useState, useEffect } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  // Create a translations map with inline data to avoid Vite import issues
  const translations = {
    en: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    },
    hi: {
      "welcome": "प्रोजेक्ट किसान में आपका स्वागत है",
      "phone_login": "फोन लॉगिन",
      "enter_phone": "अपना फोन नंबर दर्ज करें",
      "send_otp": "ओटीपी भेजें",
      "verify_login": "सत्यापन और लॉगिन",
      "voice_recognition": "आवाज़ पहचान",
      "fingerprint_login": "फिंगरप्रिंट लॉगिन",
      "back_to_phone": "फोन नंबर पर वापस जाएं",
      "enter_otp": "6-अंकीय ओटीपी दर्ज करें",
      "having_trouble": "समस्या हो रही है? एसएमएस लॉगिन आज़माएं।",
      "home": "होम",
      "notifications": "सूचनाएं",
      "profile": "प्रोफ़ाइल",
      "chatbot": "सहायक",
      "twin": "फार्म ट्विन",
      "resources": "संसाधन",
      "updates": "अपडेट"
    },
    bn: {
      "welcome": "প্রকল্প কিষাণে আপনাকে স্বাগতম",
      "phone_login": "ফোন লগিন",
      "enter_phone": "আপনার ফোন নম্বর লিখুন",
      "send_otp": "ওটিপি পাঠান",
      "verify_login": "যাচাই করুন ও লগিন",
      "voice_recognition": "ভয়েস রিকগনিশন",
      "fingerprint_login": "ফিঙ্গারপ্রিন্ট লগিন",
      "back_to_phone": "ফোন নম্বরে ফিরে যান",
      "enter_otp": "৬-সংখ্যার ওটিপি লিখুন",
      "having_trouble": "সমস্যা হচ্ছে? SMS লগিন চেষ্টা করুন।",
      "home": "হোম",
      "notifications": "বিজ্ঞপ্তি",
      "profile": "প্রোফাইল",
      "chatbot": "সহায়ক",
      "twin": "ফার্ম টুইন",
      "resources": "রিসোর্স",
      "updates": "আপডেট"
    },
    ta: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    },
    te: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    },
    kn: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    },
    ml: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    },
    mr: {
      "welcome": "Welcome to Project Kisan",
      "phone_login": "Phone Login",
      "enter_phone": "Enter your phone number",
      "send_otp": "Send OTP",
      "verify_login": "Verify & Login",
      "voice_recognition": "Voice Recognition",
      "fingerprint_login": "Fingerprint Login",
      "back_to_phone": "Back to Phone Number",
      "enter_otp": "Enter the 6-digit OTP",
      "having_trouble": "Having trouble? Try SMS login instead.",
      "home": "Home",
      "notifications": "Notifications",
      "profile": "Profile",
      "chatbot": "Assistant",
      "twin": "Farm Twin",
      "resources": "Resources",
      "updates": "Updates"
    }
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};