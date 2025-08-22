import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BuyInputsScreenProps {
  onBack?: () => void;
}

const BuyInputsScreen: React.FC<BuyInputsScreenProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const inputs = [
    {
      id: 1,
      name: 'Neem Oil - 5 Litre',
      category: 'Pesticides',
      price: 450,
      rating: 4.5,
      vendor: 'Agro Solutions',
      imageUrl: 'https://example.com/neem-oil.jpg'
    },
    {
      id: 2,
      name: 'Organic Fertilizer - 50 kg',
      category: 'Fertilizers',
      price: 800,
      rating: 4.8,
      vendor: 'EcoFarm',
      imageUrl: 'https://example.com/organic-fertilizer.jpg'
    },
    {
      id: 3,
      name: 'Hybrid Tomato Seeds - 1000 seeds',
      category: 'Seeds',
      price: 1200,
      rating: 4.2,
      vendor: 'SeedCo',
      imageUrl: 'https://example.com/tomato-seeds.jpg'
    },
    {
      id: 4,
      name: 'Drip Irrigation Kit - 500m',
      category: 'Equipment',
      price: 3500,
      rating: 4.6,
      vendor: 'Irrigation Systems Ltd.',
      imageUrl: 'https://example.com/drip-kit.jpg'
    },
    {
      id: 5,
      name: 'Bio Pest Control - 1 Litre',
      category: 'Pesticides',
      price: 600,
      rating: 4.9,
      vendor: 'Green Earth Agro',
      imageUrl: 'https://example.com/bio-pest-control.jpg'
    }
  ];

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Equipment'];

  const filteredInputs = inputs.filter(input => {
    const searchTermMatch = input.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = filterCategory === 'all' || input.category === filterCategory;
    return searchTermMatch && categoryMatch;
  });

  return (
    <div className="pb-20 bg-gray-50 dark:bg-background min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
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
              <h1 className="text-xl font-bold">Buy Inputs</h1>
              <p className="text-emerald-100 dark:text-emerald-200 text-sm">Purchase farming supplies</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 dark:hover:bg-white/10">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Cart (0)
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for seeds, fertilizers, pesticides..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category.toLowerCase())}
              className={`whitespace-nowrap ${filterCategory === category.toLowerCase() ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" : "dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Inputs List */}
        <div className="space-y-3">
          {filteredInputs.map((input) => (
            <Card key={input.id} className="cursor-pointer hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex-1">{input.name}</h3>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 ml-2">
                    {input.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="font-bold text-xl text-gray-800 dark:text-white">₹{input.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2"> / unit</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 dark:text-yellow-400" />
                    <span>{input.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Vendor: {input.vendor}</p>
                
                <Button size="sm" variant="outline" className="w-full mt-3 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Filters */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Top Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {['Seeds', 'Fertilizers', 'Pesticides'].map((category, index) => (
              <Button key={index} variant="outline" className="w-full justify-start dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                {category}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyInputsScreen;
