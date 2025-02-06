





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  UtensilsCrossed, 
  DollarSign, 
  FileText, 
  Tag, 
  Image as ImageIcon, 
  Package, 
  Globe, 
  User,
  Loader2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const InputWrapper = ({ icon: Icon, label, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
      <Icon className="w-4 h-4" />
      {label}
    </label>
    {children}
  </div>
);

const AddFood = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [origin, setOrigin] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        'https://asgn-11-server.vercel.app/api/foods',
        {
          name,
          price: parseFloat(price),
          description,
          category,
          image,
          quantity: parseInt(quantity, 10),
          origin,
          addedBy: {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setMessage('');
      setShowModal(true);
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage('');
      setQuantity('');
      setOrigin('');
    } catch (error) {
      console.error('Error adding food:', error);
      setMessage(error.response?.data?.message || 'Failed to add food.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-red-600 dark:text-red-400">Please log in to continue</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className=" py-10 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
      <Card className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Add New Food Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <InputWrapper icon={UtensilsCrossed} label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter food name"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>

              <InputWrapper icon={DollarSign} label="Price">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                  placeholder="Enter price"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>
            </div>

            <InputWrapper icon={FileText} label="Description">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter food description"
                className="min-h-[100px] bg-white dark:bg-gray-700"
              />
            </InputWrapper>

            <div className="grid gap-6 md:grid-cols-2">
              <InputWrapper icon={Tag} label="Category">
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="Enter category"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>

              <InputWrapper icon={ImageIcon} label="Image URL">
                <Input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  placeholder="Enter image URL"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>

              <InputWrapper icon={Package} label="Quantity">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  placeholder="Enter quantity"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>

              <InputWrapper icon={Globe} label="Origin">
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  placeholder="Enter origin"
                  className="bg-white dark:bg-gray-700"
                />
              </InputWrapper>
            </div>

            <Card className="bg-gray-50 dark:bg-gray-700/50">
              <CardContent className="pt-6">
                <InputWrapper icon={User} label="Added By">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-12 h-12 border-2 rounded-full border-slate-200 dark:border-slate-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium dark:text-gray-200">{user.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </InputWrapper>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Add Food Item
                </>
              )}
            </Button>
          </form>

          {message && (
            <Alert className="mt-4 bg-white dark:bg-gray-700">
              <AlertDescription className="dark:text-gray-200">{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Success!</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setShowModal(false)} 
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFood;