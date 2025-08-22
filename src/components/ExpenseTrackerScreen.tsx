import React, { useState } from 'react';
import { Plus, TrendingDown, TrendingUp, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExpenseTrackerScreenProps {
  onBack?: () => void;
}

const ExpenseTrackerScreen: React.FC<ExpenseTrackerScreenProps> = ({ onBack }) => {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-01-10', category: 'Fertilizers', amount: 120, trend: 'down' },
    { id: 2, date: '2024-01-05', category: 'Seeds', amount: 80, trend: 'up' },
    { id: 3, date: '2023-12-28', category: 'Pesticides', amount: 65, trend: 'up' },
    { id: 4, date: '2023-12-20', category: 'Labor', amount: 200, trend: 'down' }
  ]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const categoryStats = expenses.reduce((acc: { [key: string]: number }, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="pb-20 bg-gray-50 dark:bg-background min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 dark:from-yellow-700 dark:to-yellow-800 text-white p-4 shadow-lg">
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
              <h1 className="text-xl font-bold">Expense Tracker</h1>
              <p className="text-yellow-100 dark:text-yellow-200 text-sm">Track your farm expenses</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 dark:hover:bg-white/10">
            <Plus className="h-4 w-4 mr-1" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Overview */}
        <Card className="dark:bg-card dark:border-border shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₹{totalExpenses}</p>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">Total Expenses</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Expenses</h2>
          {expenses.map((expense) => (
            <Card key={expense.id} className="dark:bg-card dark:border-border shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-foreground">{expense.category}</h3>
                    <div className="text-xs text-gray-500 dark:text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {expense.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">₹{expense.amount}</span>
                      {expense.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Breakdown */}
        <Card className="dark:bg-card dark:border-border shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(categoryStats).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-800 dark:text-foreground">{category}</span>
                <span className="text-sm text-gray-600 dark:text-muted-foreground">₹{amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budgeting Tips */}
        <Card className="dark:bg-card dark:border-border shadow-sm dark:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Budgeting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-muted-foreground space-y-2">
              <li>Track expenses regularly to identify areas for savings.</li>
              <li>Set a budget for each category and stick to it.</li>
              <li>Consider investing in efficient farming practices to reduce costs.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTrackerScreen;
