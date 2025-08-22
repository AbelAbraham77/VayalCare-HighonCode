import React, { useState } from "react";
import { Phone, Mic, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LanguageSelector from "./LanguageSelector";

interface LoginPageProps {
  onLogin: () => void;
  onLanguageChange?: (languageCode: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onLanguageChange }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handlePhoneLogin = () => {
    if (phoneNumber.length === 10) {
      setShowOtp(true);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  const handleVoiceLogin = () => {
    // Simulate voice recognition
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <LanguageSelector onLanguageChange={onLanguageChange} />
        </div>

        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-0 dark:shadow-2xl transition-colors duration-300">
          <CardHeader className="text-center pb-6">
            {/* Logo */}
            <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <img
                src="/lovable-uploads/b68830df-4731-4efe-b233-08588e1334b3.png"
                alt="VayalCare Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2 transition-colors duration-300">
              VayalCare
            </h1>
            <p className="text-green-600 dark:text-green-300 text-sm transition-colors duration-300">
              Your Personal Farming Assistant
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showOtp ? (
              <>
                {/* Phone Number Login */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                      +91
                    </span>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="rounded-l-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-300"
                      maxLength={10}
                    />
                  </div>
                  <Button
                    onClick={handlePhoneLogin}
                    disabled={phoneNumber.length !== 10}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white transition-colors duration-300"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send OTP
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors duration-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      Or login with
                    </span>
                  </div>
                </div>

                {/* Voice Recognition */}
                <Button
                  onClick={handleVoiceLogin}
                  variant="outline"
                  className="w-full border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors duration-300"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Recognition
                </Button>

                {/* Biometric Login */}
                <Button
                  onClick={handleBiometricLogin}
                  variant="outline"
                  className="w-full border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-300"
                >
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Fingerprint Login
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
                  Having trouble? Try SMS login instead.
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                    Enter the 6-digit OTP sent to +91 {phoneNumber}
                  </p>
                </div>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-300"
                />
                <Button
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white transition-colors duration-300"
                >
                  Verify & Login
                </Button>
                <Button
                  onClick={() => setShowOtp(false)}
                  variant="ghost"
                  className="w-full dark:hover:bg-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  Back to Phone Number
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
