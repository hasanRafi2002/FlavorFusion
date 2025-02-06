


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, Calendar, MapPin, Package, ShoppingBag } from 'lucide-react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json';
import Empty from '../../assets/empty.json';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        setUser({
          email: currentUser.email,
          token: token,
        });
      } else {
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('https://asgn-11-server.vercel.app/api/purchases', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          });
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError('Error fetching orders. Please try again later.');
          setLoading(false);
        }
      };

      setTimeout(() => {
        fetchOrders();
      }, 1400);
    }
  }, [user]);

  const handleDelete = async (orderId) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);

      await axios.delete(`https://asgn-11-server.vercel.app/api/purchases/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      setMessage('Order deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting order:', error);
      setMessage('Failed to delete order. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
        <div className="w-64 h-64">
          <Lottie animationData={loadingAnimation} loop />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
        <div className="p-6 text-center rounded-lg bg-red-50 dark:bg-red-900/20">
          <span className="text-xl text-red-600 dark:text-red-400">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b]">
      {/* Banner Section */}
      <div className="relative h-64 mb-12">
      <div className="absolute inset-0 bg-[#3b4c6b]">
              <img 
                src="https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg" 
                alt="Food banner" 
                className="object-cover w-full h-full opacity-50"
              />
            </div>

        <div className="absolute inset-0">

          <div className="absolute inset-0 bg-black/60 dark:bg-black/80" />
        </div>
        <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
          <ShoppingBag className="w-16 h-16 mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white">My Orders</h1>
          <p className="mt-2 text-lg text-gray-200">
            Track and manage your order history
          </p>
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed z-50 top-4 right-4"
          >
            <div className="px-6 py-4 text-white rounded-lg shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600">
              <span className="font-medium">{message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl px-4 mx-auto">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md dark:bg-gray-800/90 rounded-xl">
            <div className="w-64 h-64">
              <Lottie animationData={Empty} loop />
            </div>
            <span className="mt-4 text-xl text-gray-500 dark:text-gray-400">No orders found.</span>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden transition-all duration-300 bg-white shadow-md dark:bg-gray-800/90 rounded-xl hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={order.foodImage}
                        alt={order.foodName}
                        className="object-cover w-24 h-24 rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {order.foodName}
                      </h3>
                      <div className="mt-3 space-y-2">
                        <p className="flex items-center text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                          ${parseFloat(order.price).toFixed(2)}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4" />
                          {moment(order.buyingDate).format('MMMM Do YYYY, h:mm a')}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Package className="w-4 h-4" />
                          Quantity: {order.quantity}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4" />
                          {order.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 dark:from-red-600 dark:to-pink-600 dark:hover:from-red-700 dark:hover:to-pink-700 hover:shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;