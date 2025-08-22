import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  Users,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GovtSchemesScreenProps {
  onBack?: () => void;
}

interface SchemeDetail {
  id: number;
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationProcess: string;
  lastDate: string;
  category: string;
  readTime: string;
  rating: number;
  popularity: number;
  successRate: string;
  officialUrl?: string;
  detailedDescription?: string;
  requiredDocuments?: string[];
  contactInfo?: string;
}

const GovtSchemesScreen: React.FC<GovtSchemesScreenProps> = ({ onBack }) => {
  const [activeScheme, setActiveScheme] = useState("all");
  const [selectedScheme, setSelectedScheme] = useState<SchemeDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<SchemeDetail[]>([]);

  // Fetch all current government schemes
  const fetchCurrentSchemes = async () => {
    try {
      setLoading(true);
      setError(null);

      const prompt = `You are an expert on current Indian Government Agricultural Schemes for 2024-25. Fetch all active and ongoing schemes from the Ministry of Agriculture & Farmer Welfare.

Please provide a comprehensive list of current government schemes in the following JSON format (no markdown, just pure JSON):
{
  "schemes": [
    {
      "id": 1,
      "title": "Scheme Name",
      "description": "Brief description of the scheme",
      "eligibility": "Who can apply",
      "benefits": "What benefits are provided",
      "applicationProcess": "How to apply",
      "lastDate": "Deadline or 'Ongoing'",
      "category": "finance|insurance|information|organic|subsidy|equipment",
      "readTime": "X min",
      "popularity": number,
      "successRate": "XX%",
      "officialUrl": "Official website URL"
    }
  ]
}

Include all major active schemes such as:
- PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
- PMFBY (Pradhan Mantri Fasal Bima Yojana)
- Soil Health Card Scheme
- PKVY (Paramparagat Krishi Vikas Yojana)
- PM-KUSUM (Solar Agriculture Pumps)
- National Agriculture Market (e-NAM)
- Rashtriya Krishi Vikas Yojana (RKVY)
- Sub-Mission on Agricultural Mechanization (SMAM)
- Mission for Integrated Development of Horticulture (MIDH)
- National Mission on Oilseeds and Oil Palm (NMOOP)
- Pradhan Mantri Krishi Sinchai Yojana (PMKSY)
- Formation of Farmer Producer Organizations (FPO)
- And any other currently active schemes

Make sure all information is:
- Current and active as of 2024-25
- From official Ministry of Agriculture sources
- Includes accurate benefit amounts and eligibility criteria
- Contains working official website URLs
- Categorized appropriately

Focus on schemes that are currently accepting applications or are ongoing programs.`;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const schemeText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Extract JSON from response
      const jsonMatch = schemeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const schemeData = JSON.parse(jsonMatch[0]);
        setSchemes(schemeData.schemes || []);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Schemes fetch error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch current schemes"
      );
      // Fallback to a few basic schemes if API fails
      setSchemes([
        {
          id: 1,
          title: "PM-KISAN",
          description: "Direct income support to farmers",
          eligibility: "Small and marginal farmers",
          benefits: "₹6,000 per year",
          applicationProcess: "Apply through PM-KISAN portal",
          lastDate: "Ongoing",
          category: "finance",
          readTime: "5 min",
          rating: 4.5,
          popularity: 1200,
          successRate: "85%",
          officialUrl: "https://pmkisan.gov.in/",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed scheme information from Gemini API
  const fetchSchemeDetails = async (schemeTitle: string) => {
    try {
      setDetailLoading(true);
      setError(null);

      const prompt = `You are an expert on Indian Government Agricultural Schemes. Fetch the most detailed and current information about "${schemeTitle}" from official Ministry of Agriculture & Farmer Welfare sources.

Please provide comprehensive details in the following JSON format (no markdown, just pure JSON):
{
  "title": "${schemeTitle}",
  "detailedDescription": "very Short description of the scheme with current status and objectives. 1 paragraph only",
  "eligibility": "Very Short eligibility criteria with specific conditions. 1 paragraph only",
  "benefits": "Very Short list of benefits with exact amounts, payment schedules, and coverage",
  "applicationProcess": "3 steps of the current application process with all required steps",
  "requiredDocuments": ["Aadhaar Card", "Bank Passbook", "Land Records", "Other specific documents"],
  "lastDate": "Current application deadline or 'Ongoing' with next review dates",
  "officialUrl": "Official government website URL for direct applications",
  "contactInfo": "Official helpline numbers and email addresses",
  "additionalInfo": "Current budget allocation, number of beneficiaries, recent updates, state-wise variations if any"
}

Make sure to provide:
- Latest 2024-25 budget allocation and benefit amounts
- Current application status and deadlines
- State-specific variations if applicable
- Recent policy updates or changes
- Exact documentation requirements
- Working official website links
- Valid contact information

Source information from:
- Ministry of Agriculture & Farmer Welfare official website
- PM-KISAN portal for related schemes
- Department of Agriculture & Cooperation
- State agriculture department notifications
- Recent government press releases and announcements`;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const schemeText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Extract JSON from response
      const jsonMatch = schemeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const detailedScheme = JSON.parse(jsonMatch[0]);
        return detailedScheme;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Scheme details fetch error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch scheme details"
      );
      return null;
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSchemeClick = async (scheme: SchemeDetail) => {
    const detailedInfo = await fetchSchemeDetails(scheme.title);
    if (detailedInfo) {
      setSelectedScheme({
        ...scheme,
        detailedDescription: detailedInfo.detailedDescription,
        requiredDocuments: detailedInfo.requiredDocuments,
        officialUrl: detailedInfo.officialUrl,
        contactInfo: detailedInfo.contactInfo,
        eligibility: detailedInfo.eligibility,
        benefits: detailedInfo.benefits,
        applicationProcess: detailedInfo.applicationProcess,
        lastDate: detailedInfo.lastDate,
      });
    }
  };

  // Load schemes when component mounts
  useEffect(() => {
    fetchCurrentSchemes();
  }, []);

  const categories = [
    { id: "all", name: "All Schemes", count: schemes.length },
    {
      id: "finance",
      name: "Financial Support",
      count: schemes.filter((s) => s.category === "finance").length,
    },
    {
      id: "insurance",
      name: "Insurance",
      count: schemes.filter((s) => s.category === "insurance").length,
    },
    {
      id: "subsidy",
      name: "Subsidies",
      count: schemes.filter((s) => s.category === "subsidy").length,
    },
    {
      id: "equipment",
      name: "Equipment",
      count: schemes.filter((s) => s.category === "equipment").length,
    },
    {
      id: "organic",
      name: "Organic Farming",
      count: schemes.filter((s) => s.category === "organic").length,
    },
  ];

  const filteredSchemes =
    activeScheme === "all"
      ? schemes
      : schemes.filter((scheme) => scheme.category === activeScheme);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-700 dark:from-violet-700 dark:to-violet-800 text-white p-4 shadow-lg">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-3 text-white hover:bg-white/20 dark:hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Government Schemes</h1>
            <p className="text-violet-100 dark:text-violet-200 text-sm">
              Explore farming subsidies & benefits
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Loading State for Initial Schemes */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600 mr-3" />
            <div>
              <p className="text-gray-800 dark:text-white font-medium">
                Loading Current Government Schemes...
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fetching latest programs from Ministry of Agriculture
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Error loading schemes</p>
                  <p className="text-sm text-red-500 dark:text-red-300">
                    {error}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={fetchCurrentSchemes}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && schemes.length > 0 && (
          <>
            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeScheme === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveScheme(category.id)}
                  className={`whitespace-nowrap ${activeScheme === category.id ? "bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700" : "dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Schemes List */}
            <div className="space-y-3">
              {filteredSchemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className="hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white flex-1">
                        {scheme.title}
                      </h3>
                      <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300 ml-2">
                        {scheme.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {scheme.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {scheme.readTime}
                        </div>
                        {scheme.popularity && (
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {scheme.popularity}+
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        onClick={() => handleSchemeClick(scheme)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {!loading && schemes.length === 0 && !error && (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-300">
                No schemes found
              </p>
              <Button
                variant="outline"
                className="mt-3"
                onClick={fetchCurrentSchemes}
              >
                Reload Schemes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Apply Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">
              How to Apply
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Check Eligibility
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ensure you meet the scheme's criteria.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Gather Documents
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keep necessary documents ready.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-5 w-5 text-orange-500 dark:text-orange-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Apply Online/Offline
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Follow the prescribed application process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Scheme Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedScheme.title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedScheme(null)}
                className="dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {detailLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    Loading detailed information...
                  </span>
                </div>
              )}

              {error && !detailLoading && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-600 dark:text-red-300 text-sm">
                    {error}
                  </p>
                </div>
              )}

              {!detailLoading && !error && (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedScheme.detailedDescription ||
                        selectedScheme.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Eligibility Criteria
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedScheme.eligibility}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Benefits
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedScheme.benefits}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Application Process
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {selectedScheme.applicationProcess}
                    </p>
                  </div>

                  {selectedScheme.requiredDocuments &&
                    selectedScheme.requiredDocuments.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                          Required Documents
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                          {selectedScheme.requiredDocuments.map(
                            (doc, index) => (
                              <li key={index}>{doc}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Application Deadline:{" "}
                        <span className="font-medium">
                          {selectedScheme.lastDate}
                        </span>
                      </p>
                      {selectedScheme.contactInfo && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Contact: {selectedScheme.contactInfo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700"
                      onClick={() => {
                        if (selectedScheme.officialUrl) {
                          window.open(selectedScheme.officialUrl, "_blank");
                        } else {
                          // Fallback URLs for common schemes
                          const fallbackUrls: Record<string, string> = {
                            "PM-KISAN": "https://pmkisan.gov.in/",
                            PMFBY: "https://pmfby.gov.in/",
                            "Soil Health Card Scheme":
                              "https://www.soilhealth.dac.gov.in/",
                            "Paramparagat Krishi Vikas Yojana (PKVY)":
                              "https://pgsindia-ncof.gov.in/",
                          };
                          const url =
                            fallbackUrls[selectedScheme.title] ||
                            "https://agricoop.nic.in/";
                          window.open(url, "_blank");
                        }
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedScheme(null)}
                      className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovtSchemesScreen;
