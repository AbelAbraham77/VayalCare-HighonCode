
import React, { useState } from 'react';
import { Camera, Upload, Bug, AlertTriangle, CheckCircle, Lightbulb, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScanPestScreenProps {
  onBack?: () => void;
}

const ScanPestScreen: React.FC<ScanPestScreenProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning
    setTimeout(() => {
      setScanResult({
        pest: 'Aphids',
        confidence: 92,
        severity: 'High',
        affectedCrop: 'Tomato',
        treatment: 'Spray neem oil solution or use insecticidal soap',
        prevention: 'Regular monitoring and maintaining beneficial insects',
        economicImpact: 'Can reduce yield by 20-30% if untreated'
      });
      setIsScanning(false);
    }, 3000);
  };

  const commonPests = [
    { name: 'Aphids', crop: 'Tomato, Chilli', severity: 'Medium', icon: '🐛' },
    { name: 'Whitefly', crop: 'Cotton, Tomato', severity: 'High', icon: '🦟' },
    { name: 'Bollworm', crop: 'Cotton, Corn', severity: 'High', icon: '🐛' },
    { name: 'Thrips', crop: 'Onion, Chilli', severity: 'Medium', icon: '🪲' },
    { name: 'Leaf Miner', crop: 'Tomato, Bean', severity: 'Low', icon: '🐛' }
  ];

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-pink-600 dark:bg-pink-700 text-white p-4 shadow-lg">
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
            <h1 className="text-xl font-bold">Scan & Detect Pests</h1>
            <p className="text-pink-100 dark:text-pink-200 text-sm">AI-powered pest identification</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Scan Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center dark:text-white">
              <Bug className="h-5 w-5 mr-2" />
              Pest Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                onClick={() => document.getElementById('camera-input')?.click()}
              >
                <Camera className="h-6 w-6" />
                <span className="text-xs">Take Photo</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="h-6 w-6" />
                <span className="text-xs">Upload Image</span>
              </Button>
            </div>
            
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageUpload}
            />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage}
                  alt="Selected pest"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="w-full mt-3 bg-pink-600 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700"
                >
                  {isScanning ? 'Scanning...' : 'Scan for Pests'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scan Result */}
        {scanResult && (
          <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-base flex items-center dark:text-white">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                Pest Detected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium dark:text-white">Pest:</span>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">{scanResult.pest}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium dark:text-white">Confidence:</span>
                <span className="text-green-600 dark:text-green-400 font-bold">{scanResult.confidence}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium dark:text-white">Severity:</span>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">{scanResult.severity}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium dark:text-white">Affected Crop:</span>
                <span className="text-gray-700 dark:text-gray-300">{scanResult.affectedCrop}</span>
              </div>
              
              <div className="pt-3 border-t dark:border-gray-600 space-y-3">
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Treatment:
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{scanResult.treatment}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Prevention:
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{scanResult.prevention}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Economic Impact:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{scanResult.economicImpact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Common Pests */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">Common Pests in Your Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonPests.map((pest, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{pest.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{pest.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Affects: {pest.crop}</p>
                    </div>
                  </div>
                  <Badge className={
                    pest.severity === 'High' ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                    pest.severity === 'Medium' ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" :
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }>
                    {pest.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Pro Tips for Better Detection:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Take close-up photos of affected areas</li>
                  <li>• Ensure good lighting for clear images</li>
                  <li>• Include leaves, stems, or fruits showing damage</li>
                  <li>• Check during early morning for best results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScanPestScreen;
