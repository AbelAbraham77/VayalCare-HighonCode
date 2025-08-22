
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, RefreshCw, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MarketPricesScreenProps {
  onBack?: () => void;
}

const MarketPricesScreen: React.FC<MarketPricesScreenProps> = ({ onBack }) => {
  const [selectedMarket, setSelectedMarket] = useState('nearby');

  const marketData = [
    {
      crop: 'Tomato',
      currentPrice: 45,
      previousPrice: 40,
      unit: '₹/kg',
      trend: 'up',
      change: 12.5,
      market: 'Local Mandi'
    },
    {
      crop: 'Chilli',
      currentPrice: 120,
      previousPrice: 130,
      unit: '₹/kg',
      trend: 'down',
      change: -7.7,
      market: 'Local Mandi'
    },
    {
      crop: 'Onion',
      currentPrice: 25,
      previousPrice: 22,
      unit: '₹/kg',
      trend: 'up',
      change: 13.6,
      market: 'Local Mandi'
    },
    {
      crop: 'Rice',
      currentPrice: 2200,
      previousPrice: 2150,
      unit: '₹/quintal',
      trend: 'up',
      change: 2.3,
      market: 'Wholesale Market'
    },
    {
      crop: 'Wheat',
      currentPrice: 2050,
      previousPrice: 2100,
      unit: '₹/quintal',
      trend: 'down',
      change: -2.4,
      market: 'Wholesale Market'
    }
  ];

  const nearbyMarkets = [
    { name: 'Local Mandi', distance: '2 km', status: 'Open' },
    { name: 'District Market', distance: '15 km', status: 'Open' },
    { name: 'Wholesale Hub', distance: '25 km', status: 'Closed' }
  ];

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-green-600 dark:bg-green-700 text-white p-4 shadow-lg">
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
              <h1 className="text-xl font-bold">Market Prices</h1>
              <p className="text-green-100 dark:text-green-200 text-sm">Live rates updated every hour</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 dark:hover:bg-white/10">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Market Selection */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center dark:text-white">
              <MapPin className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              Nearby Markets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nearbyMarkets.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700/50">
                  <div>
                    <p className="font-medium text-sm dark:text-white">{market.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{market.distance} away</p>
                  </div>
                  <Badge className={market.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}>
                    {market.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Prices</h2>
          {marketData.map((item, index) => (
            <Card key={index} className="hover:shadow-md dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{item.crop}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{item.market}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.currentPrice} {item.unit}
                      </span>
                      <div className={`flex items-center ${
                        item.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {item.trend === 'up' ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <TrendingDown className="h-4 w-4" />
                        }
                        <span className="text-sm font-medium ml-1">
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Previous: {item.previousPrice} {item.unit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Alerts */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Price Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Get notified when prices reach your target
            </p>
            <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
              Set Price Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">3</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Prices Up</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">2</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Prices Down</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPricesScreen;
