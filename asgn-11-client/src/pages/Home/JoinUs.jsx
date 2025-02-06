import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Bike,
  ArrowRight,
  DollarSign,
  Star,
  BadgePercent,
  Shield,
} from "lucide-react";

const cardData = [
  {
    id: 1,
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0b4d0ad395f075c944cbd05f1e93598f6438dd6b8e7099799341e89c909dc26",
    buttonText: "Earn more with lower fees",
    signupText: "Join as a Business Partner",
    title: "Partner with FlavorFusion",
    imageAlt: "Business partnership opportunities",
    icon: <Building2 className="w-6 h-6" />,
    benefits: [
      { icon: <DollarSign className="w-5 h-5" />, text: "Lower commission fees" },
      { icon: <BadgePercent className="w-5 h-5" />, text: "Special promotions" },
      { icon: <Shield className="w-5 h-5" />, text: "Business protection" },
    ],
  },
  {
    id: 2,
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/26c6f2cbcd61c4737b508a70b1a67ce9cf8d3a06df7c5ea8ea35c1e1a5c103da",
    buttonText: "Avail exclusive perks",
    signupText: "Join as a Delivery Rider",
    title: "Ride with FlavorFusion",
    imageAlt: "Rider benefits and perks",
    icon: <Bike className="w-6 h-6" />,
    benefits: [
      { icon: <Star className="w-5 h-5" />, text: "Exclusive rewards" },
      { icon: <BadgePercent className="w-5 h-5" />, text: "Special discounts" },
      { icon: <Shield className="w-5 h-5" />, text: "Rider insurance" },
    ],
  },
];

function SignupCard({ imageSrc, buttonText, signupText, title, imageAlt, icon, benefits }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1"
    >
      <Card className="relative overflow-hidden group h-[500px] border-0 shadow-2xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105"
        />
        
        <CardContent className="relative z-20 flex flex-col h-full p-8">
          <div className="flex items-center px-4 py-2 space-x-2 rounded-full bg-white/10 backdrop-blur-md w-fit">
            {icon}
            <span className="font-medium text-white">{buttonText}</span>
          </div>

          <div className="mt-auto space-y-4">
            <span className="font-medium tracking-wide text-amber-400">
              {signupText}
            </span>
            
            <h2 className="mb-6 text-4xl font-bold text-white">
              {title}
            </h2>

            <div className="mb-6 space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-white/90"
                >
                  {benefit.icon}
                  <span className="text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 py-6 transform hover:translate-y-[-2px] transition-all duration-300"
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </motion.button>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PartnerSignupPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-zinc-800">Join FlavorFusion</h1>
        <p className="text-lg text-zinc-600">Become a part of our growing family and enjoy exclusive benefits.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {cardData.map((card) => (
          <SignupCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}