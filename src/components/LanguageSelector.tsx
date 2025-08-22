
import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

interface LanguageSelectorProps {
  onLanguageChange?: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    onLanguageChange?.(language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white/90 backdrop-blur-sm">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{selectedLanguage.native}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language)}
            className="flex justify-between items-center cursor-pointer hover:bg-green-50"
          >
            <span>{language.name}</span>
            <span className="text-green-600 font-medium">{language.native}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
