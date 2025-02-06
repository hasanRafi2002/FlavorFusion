



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight,
  Pencil,
  Trash2,
  Info,
  Clock,
  MapPin
} from 'lucide-react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json';
import emptyAnimation from '../../assets/empty.json';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const UserFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 6;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        setUser({
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email,
          photoURL: currentUser.photoURL || 'https://via.placeholder.com/150',
        });

        try {
          const response = await axios.get('https://asgn-11-server.vercel.app/api/foods', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });

          const userFoods = response.data.filter((food) => food.addedBy.email === currentUser.email);
          setFoods(userFoods);
        } catch (err) {
          console.error('Error fetching foods:', err);
          setError('Failed to fetch foods');
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } else {
        setError('No user is logged in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (foodId) => {
    setLoading(true);
    setMessage('');
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);

      await axios.delete(`https://asgn-11-server.vercel.app/api/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setFoods(foods.filter((food) => food._id !== foodId));
      setMessage('');
      setShowModal(true);
    } catch (err) {
      console.error('Error deleting food:', err);
      setError('Failed to delete food');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);
  const totalPages = Math.ceil(foods.length / foodsPerPage);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie animationData={loadingAnimation} className="w-64 h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      <div className="relative h-60">
        <div className="absolute inset-0 bg-[#3b4c6b]">
          <img 
            src="https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg" 
            alt="Food banner" 
            className="object-cover w-full h-full opacity-50"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 bg-opacity-[50]" />
        <div className="absolute inset-0">
          <div className="relative flex flex-col items-center justify-between h-full px-4 mx-auto max-w-7xl sm:px-8 md:flex-row">
            <Link to="/addfood" className="mb-4 md:mb-0">
              <Button className="flex flex-col items-center gap-2 text-white dark:bg-transparent dark:hover:bg-transparent dark:text-white bg-transparent border-white hover:scale-[1.1] hover:bg-transparent">
                <PlusCircle className="w-12 h-12" />
                <span>Add New Food</span>
              </Button>
            </Link>
            
            <div className="text-center text-white md:text-left">
              <h1 className="text-3xl font-bold">My Food Collection</h1>
              <p className="mt-4 text-gray-200 text-md">Manage your culinary inventory</p>
            </div>

            {user && (
              <div className="flex items-center gap-4 p-4 mt-4 backdrop-blur-sm bg-white/10 rounded-2xl md:mt-0">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={user.photoURL} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-sm text-gray-200">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentFoods.map((food) => (
            <Card key={food._id} className="overflow-hidden transition-all duration-300 group hover:shadow-xl bg-white/80 backdrop-blur-sm hover:-translate-y-1 dark:bg-[#2d2f3b]">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
                <Badge className="absolute top-4 right-4" variant="secondary">
                  {food.category}
                </Badge>
                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="bg-green-500">
                    ${food.price}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl transition-colors group-hover:text-blue-600 dark:group-hover:text-emerald-400">
                  {food.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    20-30 min
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    1.5 km
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-emerald-200">Available Quantity: {food.quantity}</p>
                <p className="text-sm text-slate-600 dark:text-emerald-200">Category: {food.category}</p>
                <p className="text-sm text-slate-600 dark:text-emerald-200">Price: ${food.price}</p>
              </CardContent>
              <CardFooter className="grid grid-cols-3 gap-2">
                <Link to={`/myfood/update/${food._id}`} className="w-full">
                  <Button variant="outline" className="w-full group-hover:border-blue-500 group-hover:text-blue-500 dark:group-hover:border-emerald-400 dark:group-hover:text-emerald-400">
                    <Pencil className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full transition-colors"
                  onClick={() => handleDelete(food._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Link to={`/singlefood/${food._id}`} className="w-full">
                  <Button variant="secondary" className="w-full">
                    <Info className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {foods.length === 0 && (
          <Card className="p-8 text-center bg-white/80 backdrop-blur-sm dark:bg-[#2d2f3b]">
            <CardContent className="flex flex-col items-center">
              <Lottie animationData={emptyAnimation} className="w-64 h-64" />
              <p className="mt-4 text-xl text-gray-600 dark:text-emerald-200">No foods added yet</p>
            </CardContent>
          </Card>
        )}

        {foods.length > 0 && (
          <div className="flex items-center justify-center mt-12 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="hover:border-blue-500 hover:text-blue-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={`
                  ${currentPage === page ? "bg-blue-500 hover:bg-blue-600 dark:bg-emerald-400 dark:hover:bg-emerald-500" : "hover:border-blue-500 hover:text-blue-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400"}
                  transition-all duration-300
                `}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="hover:border-blue-500 hover:text-blue-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && !showModal && (
        <Alert className="fixed z-50 max-w-md transform -translate-x-1/2 top-4 left-1/2 dark:bg-[#1a1c2c] dark:text-emerald-200">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UserFoods;

