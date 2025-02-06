import React from "react";
import { 
  Phone, Mail, Clock, MapPin, User, 
  MessageCircle, Send, Sparkles, 
  ChevronRight, Layers, Feather, Star 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 800-555-6789",
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@futureconnect.com",
      color: "text-emerald-500 dark:text-emerald-400",
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "Mon - Fri: 9AM - 5PM",
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      icon: MapPin,
      title: "Office",
      detail: "456 Future St, San Francisco, CA",
      color: "text-rose-500 dark:text-rose-400",
    },
  ];

  return (
    <div className=" bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center py-24 overflow-hidden h-[400px] bg-gradient-to-r from-violet-500 to-indigo-500 dark:from-violet-600 dark:to-indigo-600">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute w-32 h-32 rounded-full top-1/4 left-1/4 bg-white/10 animate-pulse blur-xl" />
          <div className="absolute w-48 h-48 rounded-full bottom-1/4 right-1/4 bg-white/20 animate-pulse blur-xl" />
          <Layers className="absolute w-12 h-12 text-white/50 top-1/3 left-1/5 animate-bounce" />
          <Feather className="absolute w-10 h-10 text-white/40 bottom-1/4 right-1/3 animate-pulse" />
          <Star className="absolute w-8 h-8 text-white/60 top-1/2 right-1/5 animate-ping" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
          <div className="inline-block p-4 mb-8 rounded-2xl bg-white/10 backdrop-blur-lg animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight text-white ">
            Let's Connect Together
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-sm leading-relaxed text-white/90 ">
            Have questions or ideas? We'd love to hear from you. Reach out and let's create something amazing together.
          </p>

          <Button 
            size="lg"
            className="bg-white group text-violet-600 hover:bg-white/90 dark:bg-white dark:text-violet-600"
          >
            Get Started
            <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info Card */}
          <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Connect With Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {contactDetails.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    <contact.icon className={`${contact.color} w-6 h-6 mt-1 shrink-0`} />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {contact.title}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {contact.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Card */}
          <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      First Name
                    </label>
                    <Input 
                      placeholder="John"
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe"
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Your Message
                  </label>
                  <Textarea 
                    placeholder="Write your message here..."
                    className="h-32 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                <Button className="w-full group bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600">
                  <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;