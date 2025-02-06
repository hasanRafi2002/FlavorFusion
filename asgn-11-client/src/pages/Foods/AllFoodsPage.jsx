




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json';
import emptyAnimation from '../../assets/empty.json';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AllFoodsPage = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const foodsPerPage = 6;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when search changes
  }, [search]);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()) ||
    food.category.toLowerCase().includes(search.toLowerCase())
  );

  const sortFoods = (foods) => {
    return foods.slice().sort((a, b) => {
      if (sortCriteria === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortCriteria === 'quantity') {
        return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
      }
      return 0;
    });
  };

  const sortedFoods = sortFoods(filteredFoods);
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = sortedFoods.slice(indexOfFirstFood, indexOfLastFood);
  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);
      if (currentPage - 1 < half) end = maxPagesToShow;
      if (totalPages - currentPage < half) start = totalPages - maxPagesToShow + 1;
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className=" bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} loop />
        </div>
      ) : (
        <>
          {/* Banner Section */}
          <div className="relative h-[250px] bg-zinc-900 dark:bg-zinc-950">
            <div className="absolute inset-0 bg-[#3b4c6b]">
              <img 
                src="https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg" 
                alt="Food banner" 
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">
              <h1 className="mb-4 text-4xl font-bold text-white font-display dark:text-emerald-200">Culinary Delights</h1>
              <p className="max-w-2xl mx-auto text-zinc-200 dark:text-emerald-200">
                Discover our exquisite selection of handcrafted dishes made with love and passion
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="container px-4 mx-auto mt-[-50px]">
            <Card className="border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <div className="relative">
                      <Search className="absolute w-4 h-4 text-zinc-500 dark:text-emerald-200 left-3 top-3" />
                      <Input
                        type="text"
                        placeholder="Search dishes or categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white dark:bg-zinc-900 dark:text-emerald-200 border-zinc-200 dark:border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select value={sortCriteria} onValueChange={setSortCriteria}>
                      <SelectTrigger className="w-30 dark:border-zinc-700 dark:bg-[#1a1c2c] ">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="quantity">Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-32 dark:border-zinc-700 dark:bg-[#1a1c2c]">
                        <SelectValue placeholder="Order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section */}
          <div className="container px-4 py-12 mx-auto">
            {error && (
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-6">
                  <p className="text-center text-red-700 dark:text-red-400">{error}</p>
                </CardContent>
              </Card>
            )}

            {!error && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentFoods.map((food) => (
                  <Card 
                    key={food._id} 
                    className="overflow-hidden transition-all duration-300 border-zinc-200 dark:border-zinc-700 dark:bg-[#1a1c2c] group hover:shadow-xl hover:-translate-y-1"
                  >
                    <CardHeader className="p-0">
                      <div className="relative aspect-w-16 aspect-h-9">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-emerald-200">
                          {food.category}
                        </Badge>
                        <Badge variant="default" className="bg-zinc-900 dark:bg-zinc-200">
                          ${parseFloat(food.price).toFixed(2)}
                        </Badge>
                      </div>
                      <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-emerald-200 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                        {food.name}
                      </h2>
                      <Separator className="my-4 dark:bg-zinc-700" />
                      <div className="flex items-center justify-between text-zinc-500 dark:text-emerald-200">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">20-30 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">1.5 km</span>
                        </div>
                      </div>
                      <Separator className="my-4 dark:bg-zinc-700" />
                      <div className="flex items-center justify-between text-zinc-500 dark:text-emerald-200">
                        <span className="text-sm">Sold: {food.purchaseCount}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <div className="flex items-center justify-between w-full">
                        <Badge variant="outline" className="border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-emerald-200">
                          {food.quantity} available
                        </Badge>
                        <Button
                          asChild
                          variant="default"
                          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white"
                        >
                          <Link to={`/singlefood/${food._id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {!error && currentFoods.length === 0 && (
              <div className="flex items-center justify-center min-h-[400px]">
                <Lottie animationData={emptyAnimation} style={{ width: 300, height: 300 }} loop />
              </div>
            )}

            {/* Pagination */}
            {!error && currentFoods.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 
                      "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600" : 
                      "border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllFoodsPage;