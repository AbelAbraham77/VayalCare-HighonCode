
import React, { useState } from 'react';
import { BookOpen, Search, Download, Star, Clock, Users, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface KnowledgeCenterScreenProps {
  onBack?: () => void;
}

const KnowledgeCenterScreen: React.FC<KnowledgeCenterScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 45 },
    { id: 'schemes', name: 'Govt Schemes', count: 12 },
    { id: 'practices', name: 'Best Practices', count: 18 },
    { id: 'diseases', name: 'Disease Guide', count: 15 }
  ];

  const articles = [
    {
      id: 1,
      title: 'PM-KISAN Scheme Benefits',
      category: 'schemes',
      readTime: '5 min',
      rating: 4.8,
      downloads: 1250,
      summary: 'Complete guide to PM-KISAN direct benefit transfer scheme for farmers'
    },
    {
      id: 2,
      title: 'Organic Farming Techniques',
      category: 'practices',
      readTime: '8 min',
      rating: 4.9,
      downloads: 890,
      summary: 'Step-by-step guide to convert traditional farming to organic methods'
    },
    {
      id: 3,
      title: 'Tomato Disease Prevention',
      category: 'diseases',
      readTime: '6 min',
      rating: 4.7,
      downloads: 2100,
      summary: 'Common tomato diseases, symptoms, and prevention methods'
    },
    {
      id: 4,
      title: 'Drip Irrigation Setup',
      category: 'practices',
      readTime: '10 min',
      rating: 4.6,
      downloads: 750,
      summary: 'Complete guide to install and maintain drip irrigation system'
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="pb-20 bg-background min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-3 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Knowledge Center</h1>
            <p className="text-primary-foreground/80 text-sm">Learn farming best practices & govt schemes</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <Card className="shadow-sm transition-all duration-300">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles, schemes, guides..."
                className="w-full pl-10 pr-4 py-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground flex-1">{article.title}</h3>
                  <Badge className="bg-accent text-accent-foreground ml-2">
                    {categories.find(c => c.id === article.category)?.name}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{article.summary}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-agri-yellow-500" />
                      {article.rating}
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      {article.downloads}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-accent">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Schemes */}
        <Card className="shadow-sm transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Popular Government Schemes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              'PM-KISAN Direct Benefit Transfer',
              'Crop Insurance Scheme (PMFBY)',
              'Soil Health Card Scheme',
              'National Mission for Sustainable Agriculture'
            ].map((scheme, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <span className="text-sm text-foreground">{scheme}</span>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
                  Apply
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeCenterScreen;
