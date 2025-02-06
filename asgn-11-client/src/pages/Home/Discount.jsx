import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  Percent,
  ArrowRight,
  Star,
  Clock,
  Gift,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";


const Section1 = () => {
  return (
    <div className="container px-4 mx-auto mt-10">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 space-y-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <ChefHat className="w-8 h-8 text-orange-600" />
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text">
            Welcome to FlavorFusion
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
          Experience the finest culinary delights with us.
        </p>
      </motion.div>



      {/* Hero Section */}
      <div className="relative mt-16 overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05ab3d133497d768db95029216e47db2a9d94ef81a1ae8d85cce96eb156ec498"
            alt="Delicious Dish"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto space-y-6 text-center"
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm text-white bg-orange-600"
            >
              <Gift className="w-4 h-4 mr-2" /> Special Offer
            </Badge>

            <h2 className="text-5xl font-bold leading-tight text-white">
              20% Off 
              <span className="text-orange-400"> Your First Order</span>
            </h2>

            <p className="text-lg text-zinc-200">
              Enjoy an exclusive 20% discount on your first order at FlavorFusion. 
              Savor the best dishes crafted with love and passion.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="px-8 py-6 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl"
                onClick={() => {}}
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-orange-500 top-10 right-10"
            >
              <Percent className="w-12 h-12 opacity-50" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Section1;