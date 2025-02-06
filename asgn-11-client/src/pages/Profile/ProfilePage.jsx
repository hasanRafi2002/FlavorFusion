




import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { User, Mail, LogOut, Edit2, Check, X, Calendar } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../../assets/profile.json";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log("User object:", user);
    console.log("User photoURL:", user?.photoURL);
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <p className="text-muted-foreground">Please log in to view your profile</p>
      </div>
    );
  }

  const accountCreationDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toDateString()
    : "Unknown";

  const handlePhotoURLUpdate = async () => {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
      setPhotoURL(newPhotoURL);
      setNewPhotoURL("");
      setIsEditingPhoto(false);
      setShowAlert(true);
      setAlertMessage("Photo updated successfully!");
      setTimeout(() => setShowAlert(false), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Error updating photo:", error);
      setShowAlert(true);
      setAlertMessage("Error updating photo. Please try again.");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleNameUpdate = async () => {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setIsEditingName(false);
      setShowAlert(true);
      setAlertMessage("Name updated successfully!");
      setTimeout(() => setShowAlert(false), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Error updating name:", error);
      setShowAlert(true);
      setAlertMessage("Error updating name. Please try again.");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setShowAlert(true);
      setAlertMessage("Logged out successfully!");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error signing out:", error);
      setShowAlert(true);
      setAlertMessage("Error signing out. Please try again.");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className=" bg-background">
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
        <Lottie
          animationData={animationData}
          loop={true}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="relative px-4 -mt-24">
        {showAlert && (
          <Alert className="fixed z-50 w-auto max-w-md top-4 right-4">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
          <CardHeader className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Avatar className="w-full h-full border-4 border-background">
                <AvatarImage src={user.photoURL || ""} alt="Profile" />
                <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </div>

            {isEditingPhoto ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter new photo URL"
                  value={newPhotoURL}
                  onChange={(e) => setNewPhotoURL(e.target.value)}
                />
                <div className="flex space-x-2">
                  <Button onClick={handlePhotoURLUpdate} className="flex-1">
                    Save Photo
                  </Button>
                  <Button
                    onClick={() => setIsEditingPhoto(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditingPhoto(true)}
                variant="outline"
                size="sm"
              >
                Update Photo
              </Button>
            )}

            {isEditingName ? (
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button size="icon" onClick={handleNameUpdate}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsEditingName(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-4">
                <h2 className="text-2xl font-semibold">
                  {user.displayName || "User"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditingName(true)}
                  className="ml-2"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-4 space-y-1 border rounded-lg">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </div>
              <div className="font-medium">
                {user.displayName || "Not provided"}
              </div>
            </div>

            <div className="p-4 space-y-1 border rounded-lg">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </div>
              <div className="font-medium">{user.email}</div>
            </div>

            <div className="p-4 space-y-1 border rounded-lg">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Account Created
              </div>
              <div className="font-medium">{accountCreationDate}</div>
            </div>

            <Button
              onClick={handleSignOut}
              className="w-full"
              variant="destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;