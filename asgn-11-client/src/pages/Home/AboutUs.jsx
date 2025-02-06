import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Info,
  ArrowRight,
  Clock,
  Users,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Service",
    description: "We're always here for you."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Chefs",
    description: "Our chefs are culinary masters."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Quality Ingredients",
    description: "Only the best for our dishes."
  },
];

const Section3 = () => {
  return (
    <div className="relative mt-32 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/194d6e78052ad7d393c77b0afcf95045648dfe439cc66f72a49ab01f2964f6bf"
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative px-4 py-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center max-w-3xl mx-auto text-center"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-6 h-6 text-orange-500" />
              <h1 className="text-5xl font-bold text-white">About FlavorFusion</h1>
            </div>

            {/* Subtitle */}
            <h2 className="mb-4 text-3xl font-semibold text-white">Experience the Best in Culinary Delights</h2>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12 text-xl leading-relaxed text-zinc-300"
            >
              At FlavorFusion, we blend the finest ingredients with culinary expertise to bring you an unforgettable dining experience.
            </motion.p>

            {/* Features Grid */}
            <div className="grid w-full grid-cols-1 gap-6 mb-12 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="transition-all duration-300 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4 text-orange-500">
                        {feature.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="px-8 py-6 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl"
                onClick={() => {}}
              >
                <span className="flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-64 h-64 rounded-full top-20 right-20 bg-orange-500/10 blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1] 
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute rounded-full bottom-20 left-20 w-72 h-72 bg-blue-500/10 blur-3xl"
      />
    </div>
  );
};

export default Section3;