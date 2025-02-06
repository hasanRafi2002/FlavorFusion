



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json'; // Adjust the path as necessary

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 6;

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
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPhotos = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.get('https://asgn-11-server.vercel.app/api/gallery', {
        withCredentials: true,
      });
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    try {
      const newPhoto = { image, feedback, user: user.name, userPhoto: user.photoURL };
      await axios.post('https://asgn-11-server.vercel.app/api/gallery', newPhoto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      setMessageType('success');
      setMessage('Photo added successfully!');
      fetchPhotos();
      setImage('');
      setFeedback('');
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding photo:', error);
      setMessageType('error');
      setMessage(error.response?.data?.message || 'Failed to add photo.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 2000);
    }
  };

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);
      if (currentPage - 1 < half) {
        end = maxPagesToShow;
      }
      if (totalPages - currentPage < half) {
        start = totalPages - maxPagesToShow + 1;
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className=" bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} loop />
        </div>
      ) : (
        <>
          <div className="relative bg-gradient-to-r  from-[#1a1c2c] to-[#3b4c6b]">
          <div className="absolute inset-0 bg-[#3b4c6b]">
              <img 
                src="https://iso.500px.com/wp-content/uploads/2020/02/Sushi-and-sashimi-variety-on-rustic-background-By-Alena-Haurylik-2.jpeg" 
                alt="Food banner" 
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Moments in Frame
                </h2>
                {user && (
                  <div className="mt-8">
                    <Button
                      onClick={() => setModalOpen(true)}
                      size="lg"
                      className="inline-flex items-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Share Your Moment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {message && (
              <Alert className="fixed z-50 mb-6 top-4 right-4" variant={messageType === 'success' ? 'default' : 'destructive'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {currentPhotos.map((photo) => (
                <TooltipProvider key={photo._id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card 
                        className="overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <CardContent className="p-0">
                          <div className="relative aspect-[4/3]">
                            <img
                              src={photo.image}
                              alt={photo.feedback}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8 border-2 border-white">
                                  <AvatarImage src={photo.userPhoto} />
                                  <AvatarFallback>{photo.user[0]}</AvatarFallback>
                                </Avatar>
                                <h4 className="text-lg font-semibold text-white">{photo.user}</h4>
                              </div>
                              <p className="text-sm text-white">{photo.feedback}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{photo.feedback}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Share Your Moment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Photo URL</label>
                  <Input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Story</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar>
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </CardContent>
                </Card>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Sharing...' : 'Share Photo'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedPhoto?.user}'s Moment</DialogTitle>
              </DialogHeader>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedPhoto?.image}
                  alt={selectedPhoto?.feedback}
                  className="object-cover w-full max-h-[60vh]"
                />
                <div className="p-6">
                  <p className="text-lg text-gray-600">{selectedPhoto?.feedback}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default GalleryPage;