

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChefHat,
  ArrowRight
} from "lucide-react";

const socialIcons = [
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-400"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "#",
    label: "Twitter",
    color: "hover:text-sky-400"
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-400"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "#",
    label: "LinkedIn",
    color: "hover:text-blue-500"
  }
];


const newsItems = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9360225205e23043d0b2423649d32bd7c0fcded6ce5ff1900c858ec4d6a8496",
    date: "June 14, 2024",
    title: "Puff pastry bliss",
    description: "Discover our latest creations"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7132d46d388410e75248a2c91f78dc62c418abadfeb8a9f9a03d45c3633d51b",
    date: "June 14, 2024",
    title: "Puff pastry bliss",
    description: "New flavors unveiled"
  }
];

const exploreLinks = ["Home", "Blog", "Contact us", "Services"];

export function Footer() {
  const NewsItem = ({ imageSrc, date, title, description }) => (
    <div className="cursor-pointer group">
      <Card className="flex gap-4 p-4 transition-all duration-300 bg-zinc-[#1a1c2c] hover:bg-zinc-800/60 border-zinc-700/50 backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-lg">
          <img
            loading="lazy"
            src={imageSrc}
            alt="News thumbnail"
            className="object-cover w-24 h-24 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-[#1a1c2c] via-transparent to-transparent group-hover:opacity-100" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{date}</span>
          </div>
          <h4 className="font-semibold transition-colors text-zinc-100 group-hover:text-orange-300">
            {title}
          </h4>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </Card>
    </div>
  );

  return (
    <footer className="relative px-6 py-16 mt-32 bg-gradient-to-b from-[#1a1c2c] to-zinc-950">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-2 text-2xl font-bold text-orange-300">
            <ChefHat className="w-8 h-8" />
            Bake House
          </div>
          
          <div className="flex items-center gap-6">
            <span className="font-medium text-zinc-100">Follow us</span>
            <div className="flex gap-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-2 transition-all duration-300 rounded-full text-zinc-400 hover:bg-zinc-800 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-800/50" />

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-3">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-orange-300">About Us</h3>
            <div className="space-y-4">
              <Button
                variant="link"
                className="flex items-center h-auto gap-2 p-0 font-normal transition-all duration-300 text-zinc-100 hover:text-orange-300"
                asChild
              >
                <a href="tel:4567891231">
                  <Phone className="w-4 h-4" />
                  (456) 789-12301
                </a>
              </Button>
              <Button
                variant="link"
                className="flex items-center h-auto gap-2 p-0 font-normal transition-all duration-300 text-zinc-100 hover:text-orange-300"
                asChild
              >
                <a href="mailto:info@modrino.co.uk">
                  <Mail className="w-4 h-4" />
                  info@modrino.co.uk
                </a>
              </Button>
              <p className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4" />
                South 13th street
              </p>
              <p className="ml-6 text-zinc-400">New york America</p>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-orange-300">Explore</h3>
            <nav className="space-y-4">
              {exploreLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="flex items-center justify-between w-full h-auto p-0 pr-2 font-normal transition-all duration-300 group text-zinc-100 hover:text-orange-300"
                  asChild
                >
                  <a href={""}>
                    {link}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                  </a>
                </Button>
              ))}
            </nav>
          </div>

          {/* News Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-orange-300">Recent News</h3>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <NewsItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Separator className="my-12 bg-zinc-800/50" />
        <div className="text-center text-zinc-500">
          © 2024 Bake House. All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;