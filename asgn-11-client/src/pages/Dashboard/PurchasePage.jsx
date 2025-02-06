

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Cod from '../../assets/Cod.json';
import Lottie from 'lottie-react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const PurchasePage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        setUser({
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email,
          photoURL: currentUser.photoURL || 'https://via.placeholder.com/150',
          token: token,
        });
      } else {
        setMessage('No user is logged in.');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://asgn-11-server.vercel.app/api/foods/${foodId}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food:', error);
        setMessage('Error fetching food. Please try again later.');
      }
    };

    fetchFood();
  }, [foodId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!user || !food) {
      setMessage('Please wait for data to load.');
      setModalType('error');
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (user.email === food.addedBy.email) {
      setMessage('You cannot purchase food items you have added.');
      setModalType('error');
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://asgn-11-server.vercel.app/api/purchases',
        {
          foodId: food._id,
          foodName: food.name,
          foodImage: food.image,
          price: food.price,
          quantity: parseInt(quantity, 10),
          location,
          buyerName: user.name,
          buyerEmail: user.email,
          buyerPhotoURL: user.photoURL,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setMessage('Your purchase was successful!');
      setModalType('success');
      setQuantity(1);
      setLocation('');
      setShowModal(true);
    } catch (error) {
      console.error('Error processing purchase:', error);
      setMessage(error.response?.data?.message || 'Failed to process purchase.');
      setModalType('error');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (!food || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <div className="flex space-x-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
          <div className="space-y-4">
            <div className="w-32 h-4 rounded bg-zinc-200 dark:bg-zinc-700"></div>
            <div className="w-24 h-4 rounded bg-zinc-200 dark:bg-zinc-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-12 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      <div className="max-w-4xl px-4 mx-auto">
        <Button 
          variant="ghost" 
          onClick={goBack} 
          className="flex items-center gap-2 mb-4 text-zinc-800 dark:text-zinc-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
        
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-zinc-800">
            <CardTitle className="text-3xl font-bold text-center text-white dark:text-zinc-100">
              Complete Your Purchase
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <Card className="dark:bg-zinc-800 dark:border-zinc-700">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">Food Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-zinc-600 dark:text-zinc-400">Name</Label>
                          <p className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-100">{food.name}</p>
                        </div>
                        <div>
                          <Label className="text-zinc-600 dark:text-zinc-400">Price</Label>
                          <p className="mt-1 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                            ${parseFloat(food.price).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-zinc-600 dark:text-zinc-400">Available</Label>
                          <Badge variant="secondary" className="mt-1 dark:bg-zinc-700 dark:text-zinc-200">
                            {food.quantity} units
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-zinc-800 dark:border-zinc-700">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">Buyer Information</h3>
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-16 h-16 border-4 border-white rounded-full shadow-lg dark:border-zinc-700"
                        />
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-zinc-700 dark:text-zinc-300">Order Quantity</Label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={food.quantity}
                      className="mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-zinc-700 dark:text-zinc-300">Delivery Location</Label>
                    <Textarea
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                      rows={3}
                      required
                    />
                  </div>

                  <Card className="dark:bg-zinc-800 dark:border-zinc-700">
                    <CardContent className="p-6">
                      <Label className="text-zinc-700 dark:text-zinc-300">Payment Method</Label>
                      <div className="flex items-center justify-between mt-2 mb-4">
                        <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Cash on Delivery</span>
                        <div className="w-32">
                          <Lottie animationData={Cod} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
                        <span className="font-medium text-zinc-600 dark:text-zinc-400">Total Amount</span>
                        <span className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                          ${(parseFloat(food.price) * quantity).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full text-white bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Complete Purchase'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle className={modalType === 'success' ? 'text-zinc-900 dark:text-zinc-100' : 'text-red-500'}>
              {modalType === 'success' ? 'Purchase Successful' : 'Purchase Failed'}
            </DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => {
                setShowModal(false);
                if (modalType === 'success') {
                  window.location.reload();
                }
              }}
              className="bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchasePage;