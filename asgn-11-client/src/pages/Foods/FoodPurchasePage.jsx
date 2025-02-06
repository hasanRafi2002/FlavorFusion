



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';

const FoodPurchasePage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://asgn-11-server.vercel.app/api/foods/${id}`);
        setFood(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load food details. Please try again.');
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handlePurchase = async () => {
    try {
      await axios.post('https://asgn-11-server.vercel.app/api/purchase', { foodId: id, quantity });
      setSuccessMessage('Purchase successful! Thank you for your order.');
    } catch (err) {
      setError('Failed to complete the purchase. Please try again.');
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(food?.quantity || 1, value));
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 bg-zinc-50">
        <div className="container p-4 mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-full h-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="w-full h-64" />
              <Skeleton className="w-1/4 h-4" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 bg-zinc-50">
        <div className="container p-4 mx-auto">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="py-8 bg-zinc-50">
        <div className="container p-4 mx-auto">
          <Alert className="max-w-2xl mx-auto">
            <AlertDescription>Food item not found.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8  bg-zinc-50">
      <div className="container p-4 mx-auto">
        <Card className="max-w-2xl mx-auto border-zinc-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-zinc-900">{food.name}</CardTitle>
            <CardDescription className="text-zinc-600">{food.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={food.image} 
                alt={food.name} 
                className="object-cover w-full h-64"
              />
              <Badge 
                className="absolute px-4 py-2 text-lg font-semibold top-4 right-4 bg-zinc-900 hover:bg-zinc-900"
              >
                ${parseFloat(food.price).toFixed(2)}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <Label htmlFor="quantity" className="text-sm font-medium text-zinc-700">
                Quantity
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="border-zinc-200"
                >
                  <MinusCircle className="w-4 h-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  min="1"
                  max={food.quantity}
                  className="text-center border-zinc-200"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= food.quantity}
                  className="border-zinc-200"
                >
                  <PlusCircle className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-zinc-500">
                {food.quantity} items available
              </p>
            </div>

            {successMessage && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handlePurchase} 
              className="w-full bg-zinc-900 hover:bg-zinc-800"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase Now (${(food.price * quantity).toFixed(2)})
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FoodPurchasePage;