import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Sprout, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CropPlannerScreenProps {
  onBack?: () => void;
}

const CropPlannerScreen: React.FC<CropPlannerScreenProps> = ({ onBack }) => {
  const [cropPlans, setCropPlans] = useState([
    {
      id: 1,
      crop: 'Tomato',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      area: '1 acre',
      status: 'Active'
    },
    {
      id: 2,
      crop: 'Chilli',
      startDate: '2024-07-01',
      endDate: '2024-10-01',
      area: '0.5 acre',
      status: 'Planned'
    },
    {
      id: 3,
      crop: 'Onion',
      startDate: '2024-11-01',
      endDate: '2025-02-01',
      area: '0.75 acre',
      status: 'Completed'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenModal = (plan = null) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleAddPlan = (newPlan) => {
    setCropPlans([...cropPlans, { ...newPlan, id: Date.now() }]);
    handleCloseModal();
  };

  const handleUpdatePlan = (updatedPlan) => {
    setCropPlans(
      cropPlans.map((plan) =>
        plan.id === updatedPlan.id ? updatedPlan : plan
      )
    );
    handleCloseModal();
  };

  const handleDeletePlan = (id) => {
    setCropPlans(cropPlans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="pb-20 bg-gray-50 dark:bg-background min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-4 shadow-lg">
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
              <h1 className="text-xl font-bold">Crop Planner</h1>
              <p className="text-blue-100 dark:text-blue-200 text-sm">Plan your farming calendar</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 dark:hover:bg-white/10">
            <Plus className="h-4 w-4 mr-1" />
            Add Plan
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Crop Plans List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Your Crop Plans
          </h2>
          {cropPlans.map((plan) => (
            <Card
              key={plan.id}
              className="hover:shadow-md dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {plan.crop}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {plan.startDate} - {plan.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {plan.status}
                    </Badge>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        onClick={() => handleOpenModal(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base dark:text-white">
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {cropPlans.filter((plan) => plan.status === 'Active').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Active Plans
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {cropPlans.filter((plan) => plan.status === 'Completed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Completed Plans
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Plan Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
          onClick={() => handleOpenModal(null)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Crop Plan
        </Button>
      </div>
    </div>
  );
};

export default CropPlannerScreen;
