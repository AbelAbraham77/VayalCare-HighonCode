import React, { useState } from 'react';
import { ArrowLeft, FileText, ExternalLink, CheckCircle, Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GovtSchemesScreenProps {
  onBack?: () => void;
}

const GovtSchemesScreen: React.FC<GovtSchemesScreenProps> = ({ onBack }) => {
  const [activeScheme, setActiveScheme] = useState('all');

  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN',
      description: 'Direct income support of ₹6,000 per year to small and marginal farmers.',
      eligibility: 'Small and marginal farmers with landholding up to 2 hectares.',
      benefits: '₹6,000 per year in three equal installments.',
      applicationProcess: 'Apply online through PM-KISAN portal or visit nearest agriculture office.',
      lastDate: 'Ongoing',
      category: 'finance',
      readTime: '5 min',
      rating: 4.5,
      popularity: 1200,
      successRate: '85%'
    },
    {
      id: 2,
      title: 'PMFBY',
      description: 'Crop insurance scheme providing financial support to farmers in case of crop loss due to natural calamities.',
      eligibility: 'All farmers growing notified crops in notified areas.',
      benefits: 'Insurance coverage for crop loss due to natural calamities.',
      applicationProcess: 'Apply through authorized insurance companies or online portal.',
      lastDate: 'Varies by crop and season',
      category: 'insurance',
      readTime: '7 min',
      rating: 4.2,
      popularity: 950,
      successRate: '78%'
    },
    {
      id: 3,
      title: 'Soil Health Card Scheme',
      description: 'Provides soil health cards to farmers with information on nutrient status of their soil and recommended dosage of fertilizers.',
      eligibility: 'All farmers with agricultural land.',
      benefits: 'Information on soil health and recommended fertilizer dosage.',
      applicationProcess: 'Contact nearest agriculture department or soil testing laboratory.',
      lastDate: 'Ongoing',
      category: 'information',
      readTime: '4 min',
      rating: 4.0,
      popularity: 800,
      successRate: '90%'
    },
    {
      id: 4,
      title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      description: 'Promotes organic farming through cluster approach and provides financial assistance to farmers.',
      eligibility: 'Farmers forming a cluster of 50 acres or more.',
      benefits: 'Financial assistance for organic farming practices and marketing.',
      applicationProcess: 'Form a cluster and apply through agriculture department.',
      lastDate: 'Varies by state',
      category: 'organic',
      readTime: '6 min',
      rating: 4.7,
      popularity: 1100,
      successRate: '75%'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Schemes', count: schemes.length },
    { id: 'finance', name: 'Financial Assistance', count: schemes.filter(s => s.category === 'finance').length },
    { id: 'insurance', name: 'Crop Insurance', count: schemes.filter(s => s.category === 'insurance').length },
    { id: 'information', name: 'Information Services', count: schemes.filter(s => s.category === 'information').length },
    { id: 'organic', name: 'Organic Farming', count: schemes.filter(s => s.category === 'organic').length }
  ];

  const filteredSchemes = activeScheme === 'all'
    ? schemes
    : schemes.filter(scheme => scheme.category === activeScheme);

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
            <p className="text-violet-100 dark:text-violet-200 text-sm">Explore farming subsidies & benefits</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
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
            <Card key={scheme.id} className="hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex-1">{scheme.title}</h3>
                  <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300 ml-2">
                    {scheme.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{scheme.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {scheme.readTime}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {scheme.popularity}+
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Apply Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">How to Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Check Eligibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ensure you meet the scheme's criteria.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Gather Documents</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Keep necessary documents ready.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-5 w-5 text-orange-500 dark:text-orange-400" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Apply Online/Offline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Follow the prescribed application process.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovtSchemesScreen;
