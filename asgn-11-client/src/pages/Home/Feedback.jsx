import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  Quote,
  MessageCircle,
  Users,
  ThumbsUp,
  Heart 
} from "lucide-react";

const testimonials = [
  {
    rating: 5,
    title: "Amazing Dining Experience!",
    description:
      "FlavorFusion has completely transformed my dining experience! Their top-quality dishes have become a staple in my meals.",
    avatar: "https://github.com/hasanrafi1122/photos/blob/main/ph-assignment/rafi---04.jpg?raw=true",
    name: "Tawhid Hasan Rafi",
    role: "Food Enthusiast"
  },
  {
    rating: 5,
    title: "Fantastic Customer Service",
    description:
      "The customer service at FlavorFusion is phenomenal! They were quick to help me find the perfect dish for my taste.",
    avatar: "https://github.com/hasanrafi1122/photos/blob/main/ph-assignment/photo/jankar.png?raw=true",
    name: "Jhankar Mahbub",
    role: "Regular Customer"
  },
  {
    rating: 5,
    title: "Quality Food and Fast Delivery",
    description:
      "I was amazed by the quality of the food and how fast my order arrived. Definitely my go-to for all my dining needs.",
    avatar: "https://avatars.githubusercontent.com/u/107122164?v=4",
    name: "Mashroom",
    role: "Food Critic"
  }
];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: "2,000+", label: "Happy Customers" },
  { icon: <ThumbsUp className="w-5 h-5" />, value: "4.9", label: "Average Rating" },
  { icon: <MessageCircle className="w-5 h-5" />, value: "1,500+", label: "Reviews" },
];

function TestimonialsPage() {
  return (
    <section className="container px-4 py-24 mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-16 text-center"
      >
        <Badge className="mb-4 text-orange-700 bg-orange-100 hover:bg-orange-100">
          Testimonials
        </Badge>
        <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
          What Our Customers Are Saying
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
          Our customers rave about our food! Read their stories and see how FlavorFusion 
          has enhanced their dining experience.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl bg-orange-50"
            >
              <div className="flex justify-center mb-2 text-orange-600">
                {stat.icon}
              </div>
              <div className="mb-1 text-2xl font-bold text-zinc-900">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="h-full transition-all duration-300 group hover:shadow-xl">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6 text-orange-500">
                  <Quote className="w-10 h-10 opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="mb-4 text-xl font-semibold transition-colors text-zinc-900 group-hover:text-orange-600">
                  {testimonial.title}
                </h3>
                <p className="mb-6 leading-relaxed text-zinc-600">
                  {testimonial.description}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s profile`}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-zinc-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {testimonial.role}
                    </div>
                  </div>
                  <Heart className="w-5 h-5 ml-auto text-red-500 transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsPage;