

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, DollarSign, FileText, Tag, Image as ImageIcon, Package, Globe } from "lucide-react";

// Keep original Alert Component
const Alert = ({ message, onClose }) => (
  <div className="fixed z-50 p-4 text-white bg-green-600 rounded-md shadow-lg top-4 right-4">
    {message}
    <button onClick={onClose} className="ml-4 font-bold text-white">X</button>
  </div>
);

// Keep original Modal Component
const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="p-8 bg-white rounded-md shadow-md dark:bg-[#2d2f3b]">
      <h3 className="mb-4 text-2xl font-bold dark:text-emerald-200">{message}</h3>
      <button
        onClick={onClose}
        className="px-4 py-2 text-white rounded-md shadow bg-zinc-600 hover:bg-zinc-700 dark:bg-emerald-400 dark:hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 dark:focus:ring-emerald-500"
      >
        Close
      </button>
    </div>
  </div>
);

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    quantity: '',
    origin: '',
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email,
          photoURL: currentUser.photoURL || 'https://via.placeholder.com/150',
        });

        try {
          const token = await currentUser.getIdToken(true);
          const response = await axios.get(`https://asgn-11-server.vercel.app/api/foods/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFood(response.data);
        } catch (err) {
          console.error('Error fetching food:', err);
          setMessage('Failed to fetch food data');
        }
      } else {
        setMessage('No user is logged in.');
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);

      await axios.put(
        `https://asgn-11-server.vercel.app/api/foods/${id}`,
        {
          name: food.name,
          price: parseFloat(food.price),
          description: food.description,
          category: food.category,
          image: food.image,
          quantity: parseInt(food.quantity, 10),
          origin: food.origin,
          addedBy: {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Food updated successfully!');
      setShowModal(true);
      setFood({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        quantity: '',
        origin: '',
      });
      navigate('/myfood');
    } catch (error) {
      console.error('Error updating food:', error);
      setMessage(error.response?.data?.message || 'Failed to update food.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
  };

  return (
    <div className=" py-10 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      <div className="max-w-3xl px-4 mx-auto">
        <Card className="border-zinc-200 dark:border-[#3b4c6b]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-emerald-200">
              Update Food Item
            </CardTitle>
          </CardHeader>

          <CardContent>
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Name
                    </Label>
                    <Input
                      name="name"
                      value={food.name}
                      onChange={handleChange}
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Price
                    </Label>
                    <Input
                      type="number"
                      name="price"
                      value={food.price}
                      onChange={handleChange}
                      step="0.01"
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Description
                    </Label>
                    <Textarea
                      name="description"
                      value={food.description}
                      onChange={handleChange}
                      className="min-h-[100px] dark:bg-[#2d2f3b] dark:text-emerald-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Category
                    </Label>
                    <Input
                      name="category"
                      value={food.category}
                      onChange={handleChange}
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Image URL
                    </Label>
                    <Input
                      type="url"
                      name="image"
                      value={food.image}
                      onChange={handleChange}
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={food.quantity}
                      onChange={handleChange}
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-zinc-500 dark:text-emerald-200" />
                      Origin
                    </Label>
                    <Input
                      name="origin"
                      value={food.origin}
                      onChange={handleChange}
                      required
                      className="dark:bg-[#2d2f3b] dark:text-emerald-200"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full dark:bg-emerald-400 dark:hover:bg-emerald-500"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Food'}
                </Button>
              </form>
            ) : (
              <p className="text-center text-red-600">Fetching user information...</p>
            )}
          </CardContent>
        </Card>

        {message && <Alert message={message} onClose={() => setMessage('')} />}
        {showModal && <Modal message="Food updated successfully!" onClose={closeModal} />}
      </div>
    </div>
  );
};

export default UpdateFood;