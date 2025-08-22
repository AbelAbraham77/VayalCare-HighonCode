import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  TestTube,
  DollarSign,
  Calendar,
  Users,
  Cloud,
  BookOpen,
  ShoppingCart,
  Camera,
  Calculator,
  Newspaper,
  FileText,
  MapPin,
  SprayCan,
  Map,
  Wheat,
  LifeBuoy,
  PlayCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { routeFromTranscript } from "@/lib/voiceNavigation";
// Crop Wise icon now served from public uploads
// Mapping icon now served from public uploads

interface HomeScreenProps {
  onFeatureClick: (featureId: string) => void;
  onVoiceChat?: (question: string) => void; // open chatbot with initial question
  language?: string;
}
const HomeScreen: React.FC<HomeScreenProps> = ({
  onFeatureClick,
  onVoiceChat,
  language = "en",
}) => {
  const userName = language === "ml" ? "രമേശ്" : "Ramesh";
  const { toast } = useToast();
  const getTranslatedText = (englishText: string) => {
    if (language !== "ml") return englishText;
    const translations: {
      [key: string]: string;
    } = {
      "Welcome back": "തിരികെ വരവിന് സ്വാഗതം",
      "Let's check your farm status": "നിങ്ങളുടെ കൃഷിയുടെ നില പരിശോധിക്കാം",
      "Farm Management": "കാർഷിക മാനേജ്മെന്റ്",
      "More Tools": "കൂടുതൽ ഉപകരണങ്ങൾ",
      "Diagnose Crop": "വിള രോഗനിർണയം",
      "Market Prices": "വിപണി വിലകൾ",
      "Crop Planner": "വിള ആസൂത്രണം",
      "Farming Twin": "കാർഷിക ട്വിൻ",
      "Weather Alerts": "കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ",
      "Farmer Forum": "കർഷക ഫോറം",
      "Knowledge Center": "വിജ്ഞാന കേന്ദ്രം",
      "Buy Inputs": "വസ്തുക്കൾ വാങ്ങുക",
      "Scan Pest": "കീടങ്ങൾ സ്കാൻ ചെയ്യുക",
      "Expense Tracker": "ചെലവ് ട്രാക്കർ",
      "Agriculture News": "കാർഷിക വാർത്തകൾ",
      "Govt Schemes": "സർക്കാർ പദ്ധതികൾ",
    };
    return translations[englishText] || englishText;
  };
  const features = [
    {
      id: "diagnose",
      title: getTranslatedText("Diagnose Crop"),
      icon: TestTube,
      color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300",
      image: "/lovable-uploads/02d46ce4-171b-42cd-a9a3-686dbd10e8de.png",
    },
    {
      id: "market",
      title: getTranslatedText("Market Prices"),
      icon: DollarSign,
      color:
        "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300",
    },
    {
      id: "planner",
      title: getTranslatedText("Crop Planner"),
      icon: Calendar,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
      image: "/lovable-uploads/5da1f9d1-e030-46f1-9d61-291928623066.png",
    },
    {
      id: "twin",
      title: getTranslatedText("Farming Twin"),
      icon: Users,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300",
      image: "/lovable-uploads/0978174b-ae5f-40db-bd58-07833d59465a.png",
    },
    {
      id: "weather",
      title: getTranslatedText("Weather Alerts"),
      icon: Cloud,
      color: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
      image: "/lovable-uploads/7f72bec9-abf7-4827-8913-70dc3494457c.png",
    },
    {
      id: "forum",
      title: getTranslatedText("Farmer Forum"),
      icon: Users,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
      image: "/lovable-uploads/7d161fd3-22d0-4b69-a7ef-8b8dd812a55b.png",
    },
  ];
  const additionalFeatures = [
    {
      id: "knowledge",
      title: getTranslatedText("Knowledge Center"),
      icon: BookOpen,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300",
    },
    {
      id: "buy",
      title: getTranslatedText("Buy Inputs"),
      icon: ShoppingCart,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      id: "scan",
      title: getTranslatedText("Scan Pest"),
      icon: Camera,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300",
    },
    {
      id: "expense",
      title: getTranslatedText("Expense Tracker"),
      icon: Calculator,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300",
    },
    {
      id: "news",
      title: getTranslatedText("Agriculture News"),
      icon: Newspaper,
      color: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300",
    },
    {
      id: "schemes",
      title: getTranslatedText("Govt Schemes"),
      icon: FileText,
      color:
        "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
    },
  ];

  // Quick actions (placeholders)
  const quickActions = [
    {
      id: "spraying",
      label: language === "ml" ? "സ്പ്രേയിംഗ്" : "Crop Wise",
      icon: SprayCan,
      image: "/lovable-uploads/f46a346c-43fa-4c4a-ac6d-c1652fe31702.png",
    },
    {
      id: "mapping",
      label: language === "ml" ? "മാപ്പിംഗ്" : "Fair Farm",
      icon: Map,
      image: "/lovable-uploads/33d82a5a-6adb-4fb2-a720-33afcbfb4f47.png",
    },
    {
      id: "seeding",
      label: language === "ml" ? "വിത്തിടൽ" : "Price Beacon",
      icon: Wheat,
      image: "/lovable-uploads/4cf4c0b1-effa-45dd-a1c2-b857aecd3957.png",
    },
    {
      id: "support",
      label: language === "ml" ? "സപ്പോർട്ട്" : "Support",
      icon: LifeBuoy,
    },
  ];

  // Feature content cards with custom generated images
  const featureContent = [
    {
      id: "fc1",
      title: language === "ml" ? "കൊടുങ്കാറ്റ് മുന്നറിയിപ്പ്" : "Storm Alert",
      image: "/assets/weather-storm-alert.jpg",
    },
    {
      id: "fc2",
      title: language === "ml" ? "വരൾച്ച മുന്നറിയിപ്പ്" : "Drought Warning",
      image: "/assets/weather-drought-alert.jpg",
    },
    {
      id: "fc3",
      title: language === "ml" ? "വിള രോഗം" : "Crop Disease",
      image: "/assets/crop-disease.jpg",
    },
    {
      id: "fc4",
      title: language === "ml" ? "വിപണി വിലകൾ" : "Market Update",
      image: "/assets/market-update.jpg",
    },
    {
      id: "fc5",
      title: language === "ml" ? "ജലസേചന ടിപ്പുകൾ" : "Irrigation Tips",
      image: "/assets/irrigation-tips.jpg",
    },
    {
      id: "fc6",
      title: language === "ml" ? "കീട നിയന്ത്രണം" : "Pest Control",
      image: "/assets/pest-control.jpg",
    },
  ];

  // Basic SEO for this screen
  useEffect(() => {
    document.title =
      language === "ml" ? "ഹോം | കാർഷിക ഡാഷ്ബോർഡ്" : "Home | Farm Dashboard";
  }, [language]);

  // Voice recognition state
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const ensureRecognition = () => {
    const SR: any =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const r: any = new SR();
    r.lang = language === "ml" ? "ml-IN" : "en-IN";
    r.interimResults = true; // Enable interim results to show live speech
    r.maxAlternatives = 1;
    r.continuous = false;
    return r;
  };
  const handleMicClick = () => {
    if (listening) {
      // Stop listening if already active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setListening(false);
      setInterimText("");
      return;
    }
    const rec = ensureRecognition();
    if (!rec) {
      toast({
        title: language === "ml" ? "വോയ്സ് ലഭ്യമല്ല" : "Voice not available",
        description:
          language === "ml"
            ? "ഈ ബ്രൗസറിൽ മൈക്ക് പിന്തുണയില്ല."
            : "Microphone support is not available in this browser.",
      });
      return;
    }
    recognitionRef.current = rec;
    rec.onstart = () => {
      setListening(true);
      setInterimText("");
      setIsProcessing(false);
    };
    rec.onresult = async (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      setInterimText(interimTranscript);
      if (finalTranscript) {
        setListening(false);
        setInterimText("");
        setIsProcessing(true);
        toast({
          title: language === "ml" ? "കേട്ടത്" : "Processing",
          description: `"${finalTranscript}"`,
        });
        try {
          // Route via Gemini / fallback
          const decision = await routeFromTranscript(finalTranscript);
          if (decision.action === "navigate" && decision.targetId) {
            onFeatureClick(decision.targetId);
            toast({
              title: language === "ml" ? "പോകുന്നു" : "Navigating",
              description: `${decision.targetId} • ${(decision.confidence * 100).toFixed(0)}%`,
            });
          } else {
            // Route to chatbot with the question
            if (onVoiceChat) {
              onVoiceChat(finalTranscript);
            } else {
              onFeatureClick("chatbot");
            }
          }
        } catch (error) {
          console.error("Voice routing error:", error);
          toast({
            title: "Error",
            description: "Failed to process voice command",
          });
        } finally {
          setIsProcessing(false);
        }
      }
    };
    rec.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      setInterimText("");
      setIsProcessing(false);
      toast({
        title: language === "ml" ? "പിശക്" : "Error",
        description:
          language === "ml"
            ? "വോയ്സ് തിരിച്ചറിയാൻ കഴിഞ്ഞില്ല"
            : "Voice recognition failed. Please try again.",
      });
    };
    rec.onend = () => {
      setListening(false);
      setInterimText("");
    };
    try {
      rec.start();
    } catch (e) {
      console.error("Failed to start voice recognition:", e);
      setListening(false);
      setInterimText("");
      toast({
        title: "Error",
        description: "Failed to start voice recognition",
      });
    }
  };
  return (
    <div className="pb-20 bg-background min-h-screen transition-colors duration-300">
      {/* Greeting Banner */}
      <div
        className="relative h-56 rounded-b-3xl overflow-hidden transition-colors duration-300"
        style={{
          backgroundImage:
            "url('/lovable-uploads/afdc9b1b-83d4-4fb1-be61-4f53c9ff0ad1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/40"></div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-center">
          <h1 className="text-foreground text-xl sm:text-2xl font-bold mb-2 mt-12">
            {language === "ml" ? "ഹായ്" : "Hi"} {userName}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>1907 Veltri, Ketchikan, AK 99901</span>
          </div>
          <div className="mt-3 flex flex-col items-start gap-1">
            <div className="flex items-baseline">
              <span className="text-foreground text-3xl sm:text-4xl font-semibold">
                36°
              </span>
              <span className="text-muted-foreground ml-1">F</span>
            </div>
            <div className="text-muted-foreground text-sm">
              Clear | S 11.8 mph
            </div>
          </div>
        </div>
        <img
          src="/lovable-uploads/60f927d7-a6b0-4944-bf34-9a7a5394d552.png"
          alt={
            language === "ml" ? "കാലാവസ്ഥ ഐകൺ" : "Weather icon - partly cloudy"
          }
          className="absolute bottom-2 right-2 z-10 w-24 h-24 object-contain-center"
          loading="eager"
        />
      </div>

      {/* Voice Assistant Button */}
      <Button
        variant={listening || isProcessing ? "secondary" : "default"}
        className="fixed top-4 right-4 z-20 h-14 w-14 rounded-full shadow-lg transition-colors duration-300"
        onClick={handleMicClick}
        aria-pressed={listening}
        disabled={isProcessing}
        title={
          listening
            ? language === "ml"
              ? "കേൾക്കുന്നു…"
              : "Listening…"
            : isProcessing
              ? language === "ml"
                ? "പ്രോസസ്സിംഗ്..."
                : "Processing..."
              : language === "ml"
                ? "വോയ്സ് അസിസ്റ്റന്റ്"
                : "Voice assistant"
        }
      >
        <Mic
          className={`h-6 w-6 ${listening ? "animate-pulse text-red-500" : isProcessing ? "animate-spin text-blue-500" : ""}`}
        />
      </Button>

      {/* Live Speech Display */}
      {(listening || interimText) && (
        <div className="fixed top-20 right-4 z-20 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs shadow-lg">
          <div className="text-xs text-muted-foreground mb-1">
            {language === "ml" ? "കേൾക്കുന്നു..." : "Listening..."}
          </div>
          <div className="text-sm text-foreground font-medium">
            {interimText ||
              (language === "ml" ? "സംസാരിക്കുക..." : "Speak now...")}
          </div>
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.slice(0, 3).map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() =>
                    toast({
                      title: action.label,
                      description:
                        language === "ml"
                          ? "പ്ലേസ്‌ഹോൾഡർ - നിങ്ങൾ പിന്നീട് പുതുക്കാം"
                          : "Placeholder - you can update later",
                    })
                  }
                  className="flex flex-col items-center p-3 rounded-[10%] bg-muted text-card-foreground hover:shadow-lg transition-all duration-300 border-0 overflow-hidden"
                >
                  <div className="w-12 h-12 text-primary flex items-center justify-center mx-auto mb-2">
                    {"image" in action && action.image ? (
                      <img
                        src={action.image as string}
                        alt={`${action.label} icon`}
                        className="h-10 w-10 md:h-12 md:w-12 object-contain-center"
                        loading="lazy"
                      />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className="font-medium text-foreground text-xs">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Content (static) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="hidden md:block text-lg font-semibold text-foreground">
              {language === "ml" ? "ഫീച്ചർ കണ്ടന്റ്" : "Feature Content"}
            </h2>
          </div>
          <div className="space-y-2">
            {/* Animated rows with uniform heights and slower speed; 4:6 alternating widths preserved */}
            <div
              className="relative overflow-hidden rounded-md"
              style={{
                containerType: "inline-size",
              }}
            >
              <div
                className="marquee marquee-right gap-2 md:gap-3 items-stretch"
                style={{
                  animationDuration: "30s",
                }}
              >
                {[...featureContent, ...featureContent].map((item, idx) => (
                  <div
                    key={`top-${item.id}-${idx}`}
                    className="shrink-0"
                    style={{
                      width: idx % 2 === 0 ? "40cqw" : "60cqw",
                    }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-md h-full">
                      <div className="bg-muted relative h-28 md:h-32">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover-center"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-2 md:p-3">
                        <h3 className="text-xs md:text-sm font-medium text-foreground truncate">
                          {item.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-md"
              style={{
                containerType: "inline-size",
              }}
            >
              <div
                className="marquee marquee-left gap-2 md:gap-3 items-stretch"
                style={{
                  animationDuration: "30s",
                }}
              >
                {[...featureContent, ...featureContent].map((item, idx) => (
                  <div
                    key={`bottom-${item.id}-${idx}`}
                    className="shrink-0"
                    style={{
                      width: idx % 2 === 0 ? "40cqw" : "60cqw",
                    }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-md h-full">
                      <div className="bg-muted relative h-28 md:h-32">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover-center"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-2 md:p-3">
                        <h3 className="text-xs md:text-sm font-medium text-foreground truncate">
                          {item.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 transition-colors duration-300">
            {getTranslatedText("Farm Management")}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="farm-mgmt-bg cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-muted rounded-[10%] overflow-hidden"
                  onClick={() => onFeatureClick(feature.id)}
                >
                  <CardContent className="p-4 text-center m-0">
                    <div className="w-24 h-24 text-primary flex items-center justify-center mx-auto mb-1 transition-colors duration-300">
                      {feature.id === "diagnose" ? (
                        <img
                          src="/lovable-uploads/fb9c0289-77d0-4856-9028-76b4f16989dd.png"
                          alt={`${feature.title} icon`}
                          className="h-20 w-20 md:h-28 md:w-28 object-contain-center"
                          loading="lazy"
                        />
                      ) : feature.id === "market" ? (
                        <img
                          src="/lovable-uploads/00c4bc0c-067f-4b9e-bdb0-816ecd25ad76.png"
                          alt={`${feature.title} icon`}
                          className="h-24 w-24 md:h-32 md:w-32 object-contain-center"
                          loading="lazy"
                        />
                      ) : feature.id === "twin" ? (
                        <img
                          src="/lovable-uploads/f9697d94-aedf-499f-93d5-7bcfe3319ac7.png"
                          alt={`${feature.title} icon`}
                          className="h-24 w-24 md:h-32 md:w-32 object-contain-center"
                          loading="lazy"
                        />
                      ) : "image" in feature && feature.image ? (
                        <img
                          src={feature.image as string}
                          alt={`${feature.title} icon`}
                          className="h-24 w-24 md:h-32 md:w-32 object-contain-center"
                          loading="lazy"
                        />
                      ) : (
                        <Icon className="h-24 w-24 md:h-32 md:w-32" />
                      )}
                    </div>
                    <h3 className="font-medium text-foreground text-sm transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Features */}
      </div>
    </div>
  );
};
export default HomeScreen;
