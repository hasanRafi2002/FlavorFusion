





import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Utensils,
  ChefHat,
  Star,
  Clock,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const TopFoodsSection = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get('https://asgn-11-server.vercel.app/api/foods');
        setFoods(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setError('Error fetching foods. Please try again later.');
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const topFoods = [...foods].sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, 6);

  return (
    <div className="container px-4 py-16 mx-auto bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} loop />
        </div>
      ) : (
        <>
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-orange-500 dark:text-emerald-200" />
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-emerald-200">Most Popular Dishes</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-emerald-200">
              Discover our most beloved and sought-after culinary creations
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-[#2d2f3b]">
                <ChefHat className="w-6 h-6 mx-auto mb-2 text-orange-500 dark:text-emerald-200" />
                <p className="text-sm text-zinc-600 dark:text-emerald-200">Master Chefs</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-[#2d2f3b]">
                <Star className="w-6 h-6 mx-auto mb-2 text-orange-500 dark:text-emerald-200" />
                <p className="text-sm text-zinc-600 dark:text-emerald-200">5 Star Rated</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-[#2d2f3b]">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-500 dark:text-emerald-200" />
                <p className="text-sm text-zinc-600 dark:text-emerald-200">Top Sellers</p>
              </div>
            </div>
          </motion.div>

          {/* Foods Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topFoods.map((food, index) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden transition-all duration-300 border-zinc-200 group hover:shadow-xl hover:-translate-y-1 dark:border-[#3b4c6b]">
                  <CardHeader className="p-0">
                    <div className="relative aspect-w-16 aspect-h-9">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
                      <div className="absolute top-4 right-4">
                        <Badge className="text-white bg-orange-500 border-0 dark:bg-emerald-400">
                          Top Seller
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 hover:bg-zinc-100 dark:bg-[#2d2f3b] dark:text-emerald-200">
                        <Utensils className="w-4 h-4 mr-1" />
                        {food.category}
                      </Badge>
                      <Badge variant="default" className="bg-zinc-900 hover:bg-zinc-800 dark:bg-[#2d2f3b] dark:text-emerald-200">
                        ${parseFloat(food.price).toFixed(2)}
                      </Badge>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-emerald-200">
                      {food.name}
                    </h2>
                    <div className="flex items-center justify-between text-zinc-500 dark:text-emerald-200">
                      <span className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Sold: {food.purchaseCount}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <Badge variant="outline" className="border-zinc-200 text-zinc-600 dark:border-[#3b4c6b] dark:text-emerald-200">
                        {food.quantity} available
                      </Badge>
                      <Button
                        asChild
                        variant="default"
                        className="transition-colors bg-orange-500 hover:bg-orange-600 dark:bg-emerald-400 dark:hover:bg-emerald-500"
                      >
                        <Link to={`/singlefood/${food._id}`} className="flex items-center gap-2 dark:text-emerald-200">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* See All Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button
              asChild
              variant="default"
              className="px-8 py-6 text-lg transition-colors bg-orange-500 hover:bg-orange-600 dark:bg-emerald-400 dark:hover:bg-emerald-500"
            >
              <Link to="/allfood" className="flex items-center gap-2 dark:text-emerald-200">
                Explore All Dishes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TopFoodsSection;