
import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplet, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WeatherAlertsScreenProps {
  onBack?: () => void;
}

const WeatherAlertsScreen: React.FC<WeatherAlertsScreenProps> = ({ onBack }) => {
  const currentWeather = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    rainfall: 0
  };

  const alerts = [
    {
      type: 'warning',
      title: 'Heavy Rainfall Expected',
      message: 'Heavy rain expected tomorrow. Protect your crops and ensure proper drainage.',
      time: '2 hours ago',
      severity: 'high'
    },
    {
      type: 'advisory',
      title: 'High Temperature Alert',
      message: 'Temperature may reach 35°C. Increase irrigation frequency.',
      time: '4 hours ago',
      severity: 'medium'
    },
    {
      type: 'info',
      title: 'Favorable Weather',
      message: 'Good weather conditions for crop spraying operations.',
      time: '1 day ago',
      severity: 'low'
    }
  ];

  const weeklyForecast = [
    { day: 'Mon', condition: 'Sunny', high: 30, low: 22, rain: 0 },
    { day: 'Tue', condition: 'Rainy', high: 26, low: 20, rain: 85 },
    { day: 'Wed', condition: 'Cloudy', high: 28, low: 21, rain: 20 },
    { day: 'Thu', condition: 'Sunny', high: 32, low: 24, rain: 0 },
    { day: 'Fri', condition: 'Partly Cloudy', high: 29, low: 23, rain: 10 },
    { day: 'Sat', condition: 'Sunny', high: 31, low: 25, rain: 0 },
    { day: 'Sun', condition: 'Cloudy', high: 27, low: 22, rain: 40 }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />;
      case 'Rainy': return <CloudRain className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
      case 'Cloudy': return <Cloud className="h-6 w-6 text-gray-500 dark:text-gray-400" />;
      case 'Partly Cloudy': return <Cloud className="h-6 w-6 text-gray-400 dark:text-gray-300" />;
      default: return <Sun className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700',
      medium: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700',
      low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
    };
    return colors[severity as keyof typeof colors];
  };

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-sky-600 dark:bg-sky-700 text-white p-4 shadow-lg">
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
            <h1 className="text-xl font-bold">Weather Alerts</h1>
            <p className="text-sky-100 dark:text-sky-200 text-sm">Stay updated with weather conditions</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Weather */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(currentWeather.condition)}
                <div>
                  <p className="text-2xl font-bold dark:text-white">{currentWeather.temperature}°C</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentWeather.condition}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Droplet className="h-4 w-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Humidity</span>
                <span className="font-medium dark:text-white">{currentWeather.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="h-4 w-4 text-gray-600 dark:text-gray-400 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Wind</span>
                <span className="font-medium dark:text-white">{currentWeather.windSpeed} km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <CloudRain className="h-4 w-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Rainfall</span>
                <span className="font-medium dark:text-white">{currentWeather.rainfall} mm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 border dark:border-gray-600 rounded-lg dark:bg-gray-700/50 ${
                    alert.severity === 'high' ? 'border-l-4 border-l-red-500 dark:border-l-red-400' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm dark:text-white">{alert.title}</h3>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyForecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-gray-600 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8 dark:text-white">{day.day}</span>
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm text-gray-600 dark:text-gray-300">{day.condition}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="font-medium dark:text-white">{day.high}°</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">{day.low}°</span>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <Droplet className="h-3 w-3 mr-1" />
                      <span className="text-xs">{day.rain}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farm Impact Advisory */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Farm Impact Advisory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Irrigation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Reduce watering due to expected rainfall</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Crop Protection</h4>
                <p className="text-sm text-green-700 dark:text-green-300">Good conditions for disease prevention spray</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-1">Harvesting</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">Complete harvest before Tuesday's rain</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlertsScreen;
