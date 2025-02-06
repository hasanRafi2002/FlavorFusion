





import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, MapPin, Clock, User, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SingleFoodPage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://asgn-11-server.vercel.app/api/foods/${foodId}`);
        setFood(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food:', error);
        setError('Error fetching food. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchFood();
  }, [foodId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="py-8 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
        <div className="max-w-4xl px-4 mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="w-full h-96" />
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <Skeleton className="w-3/4 h-8" />
                    <Skeleton className="w-1/4 h-4" />
                    <Skeleton className="w-full h-24" />
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-8" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-center text-red-600">{error}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild variant="outline" className="border-zinc-200">
              <Link to="/allfood">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Foods
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!food) {
    return (
      <div className=" py-8 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
        <p className="mt-10 text-center text-zinc-500">Food not found.</p>
      </div>
    );
  }

  return (
    <div className=" py-8 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      <div className="max-w-4xl px-4 mx-auto">
        <Card className="overflow-hidden border-zinc-200 dark:border-[#3b4c6b]">
          <div className="relative h-96">
            <img
              src={food.image}
              alt={food.name}
              className="object-cover w-full h-full"
            />
            <Badge 
              className="absolute px-4 py-2 text-lg font-semibold top-4 right-4 bg-zinc-900 hover:bg-zinc-900 dark:bg-[#3b4c6b] dark:hover:bg-[#3b4c6b]"
            >
              ${parseFloat(food.price).toFixed(2)}
            </Badge>
          </div>

          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-emerald-200">{food.name}</h1>
                  <Badge variant="secondary" className="text-zinc-700 bg-zinc-100 hover:bg-zinc-100 dark:text-emerald-200 dark:bg-[#3b4c6b] dark:hover:bg-[#3b4c6b]">
                    {food.category}
                  </Badge>
                </div>

                <p className="text-lg leading-relaxed text-zinc-600 dark:text-emerald-200">
                  {food.description}
                </p>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-zinc-500 dark:text-emerald-200" />
                    <span className="text-zinc-600 dark:text-emerald-200">{food.origin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-zinc-500 dark:text-emerald-200" />
                    <span className="text-zinc-600 dark:text-emerald-200">{food.quantity} available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-zinc-500 dark:text-emerald-200" />
                    <span className="text-zinc-600 dark:text-emerald-200">{food.purchaseCount} sold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-zinc-500 dark:text-emerald-200" />
                    <span className="text-zinc-600 dark:text-emerald-200">Added {formatDate(food.createdAt)}</span>
                  </div>
                </div>
              </div>

              <Card className="border-zinc-200 dark:border-[#3b4c6b]">
                <CardHeader>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-emerald-200">Added By</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-zinc-200 dark:border-[#3b4c6b]">
                      {food.addedBy.photoURL ? (
                        <AvatarImage src={food.addedBy.photoURL} alt={food.addedBy.name} />
                      ) : (
                        <AvatarFallback className="bg-zinc-100 dark:bg-[#3b4c6b]">
                          <User className="w-8 h-8 text-zinc-500 dark:text-emerald-200" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-emerald-200">{food.addedBy.name}</p>
                      <p className="text-sm text-zinc-500 dark:text-emerald-200">{food.addedBy.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button 
                      asChild
                      className="bg-zinc-900 hover:bg-zinc-800 dark:bg-[#3b4c6b] dark:hover:bg-[#2a3b5b]"
                    >
                      <Link to={`/purchase/${foodId}`}>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Purchase Now
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="border-zinc-200 dark:border-[#3b4c6b]"
                    >
                      <Link to="/allfood">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to All Foods
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleFoodPage;