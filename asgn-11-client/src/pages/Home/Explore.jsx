import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Utensils,
  Search,
  Grid2X2,
  Grid3X3,
  Eye,
  Heart,
  Share2,
  Tag
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Gallery() {
  const [layout, setLayout] = useState('grid3');
  const [searchQuery, setSearchQuery] = useState('');

  const images = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7958ba42282342fdf1cfd844c88691292928df48c28df70f4fc012088889f035",
        alt: "Grilled Salmon with Fresh Herbs",
        title: "Grilled Salmon",
        category: "Main Course",
        price: "$24.99",
        description: "Fresh Atlantic salmon grilled to perfection with herbs",
        createdAt: "2025-01-04"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a7ffcfbe07aa4184c0af9db5cbdf4100b886704a8802efa101da85cfff5cbf3",
        alt: "Mediterranean Fresh Salad",
        title: "Mediterranean Salad",
        category: "Starters",
        price: "$12.99",
        description: "Fresh vegetables with olive oil and feta cheese",
        createdAt: "2025-01-04"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/95285a83b3a04b60f09f129154e28de2938871ccbf571959f0c027d0a895c285",
        alt: "Artisanal Pizza Creation",
        title: "Artisan Pizza",
        category: "Main Course",
        price: "$19.99",
        description: "Hand-crafted pizza with premium toppings",
        createdAt: "2025-01-04"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f6628ff7f911bbcc6107555bac7d7c9826a2c9645b6295ebb82b1cab1a8f532",
        alt: "Gourmet Burger Deluxe",
        title: "Gourmet Burger",
        category: "Main Course",
        price: "$16.99",
        description: "Premium beef patty with special sauce",
        createdAt: "2025-01-04"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b5b9b05cda00bc19045e7420c64197b79788c5b0ef0f51721096a4122835257",
        alt: "Chocolate Dessert Platter",
        title: "Chocolate Paradise",
        category: "Desserts",
        price: "$13.99",
        description: "Assorted chocolate desserts with berries",
        createdAt: "2025-01-04"
      },
      {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4631c2c1638e2b4ac1f3bd3cee6ff6fb2cfce8d86b33c81d0357fd4dd468da50",
        alt: "Sushi Roll Collection",
        title: "Sushi Platter",
        category: "Asian Fusion",
        price: "$28.99",
        description: "Selection of fresh sushi rolls",
        createdAt: "2025-01-04"
      }
    // Add titles, categories, and prices for other images...
  ];

  const ImageCard = ({ src, alt, title, category, price }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white border-0 shadow-lg dark:bg-zinc-900">
        <CardContent className="relative p-0">
          {/* Main Image */}
          <img
            loading="lazy"
            src={src}
            alt={alt}
            className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Price Tag */}
          <div className="absolute px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full top-4 right-4">
            {price}
          </div>

          {/* Overlay with Content */}
          <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2 text-orange-300">
                <Tag className="w-4 h-4" />
                <span className="text-sm">{category}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
              
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-9 w-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Details</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-9 w-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Heart className="w-4 h-4 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to Favorites</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-9 w-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Share2 className="w-4 h-4 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <Utensils className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold">Explore More</h1>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
          Discover more of our delicious offerings.
        </p>
      </motion.div>

      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-64">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search dishes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={layout === 'grid2' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('grid2')}
          >
            <Grid2X2 className="w-4 h-4" />
          </Button>
          <Button
            variant={layout === 'grid3' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('grid3')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className={`grid gap-6 ${
          layout === 'grid2' 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {images
          .filter(img => 
            img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            img.category?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((image, index) => (
            <ImageCard key={index} {...image} />
          ))
        }
      </motion.div>
    </div>
  );
}

export default Gallery;