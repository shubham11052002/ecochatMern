import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth.js";
import { Camera, Mail, User, Calendar, CheckCircle, Edit3, Shield, Star, Trash2 } from "lucide-react";
import {
  Card,
  CardBody,
  Avatar,
  Button,
  Input,
  Chip,
  Spinner,
  Tooltip
} from "@nextui-org/react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [localUser, setLocalUser] = useState(authUser?.user || {});
  const [profilePic, setProfilePic] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isProfilePicRemoved, setIsProfilePicRemoved] = useState(
    localStorage.getItem('profilePicRemoved') === 'true'
  );

  useEffect(() => {
    if (authUser?.user) {
      setLocalUser(authUser.user);
      if (!isProfilePicRemoved) {
        updateProfilePicPreview(authUser.user.profilePic);
      }
    }
  }, [authUser, isProfilePicRemoved]);

  const updateProfilePicPreview = (pic) => {
    if (pic?.url) {
      setSelectedImg(pic.url);
    } else if (pic) {
      setSelectedImg(pic);
    } else {
      setSelectedImg("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setSelectedImg(URL.createObjectURL(file));
      setShowSaveButton(true);
      setIsProfilePicRemoved(false);
      localStorage.removeItem('profilePicRemoved');
    }
  };

  const handleRemoveImage = () => {
    try {
      setSelectedImg("");
      setProfilePic(null);
      setShowSaveButton(false);
      setIsProfilePicRemoved(true);
      localStorage.setItem('profilePicRemoved', 'true');
      toast.success("Profile picture removed successfully");
    } catch (error) {
      console.error("Error removing profile picture:", error);
      toast.error("Failed to remove profile picture");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profilePic) return;

    const formData = new FormData();
    formData.append("profilePic", profilePic);
    
    try {
      const updatedUser = await updateProfile(formData);
      if (updatedUser) {
        setLocalUser(prev => ({ ...prev, profilePic: updatedUser.profilePic }));
        updateProfilePicPreview(updatedUser.profilePic); 
        localStorage.removeItem('profilePicRemoved');
        setIsProfilePicRemoved(false);
      }
    } finally {
      setProfilePic(null);
      setShowSaveButton(false);
    }
  };

  return (
    <div className="min-h-screen px-4 bg-gradient-to-br from-background via-default-50/50 to-primary/5 dark:from-background dark:via-default-900/30 dark:to-primary/10">
      <div className="max-w-5xl mx-auto py-4">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <div className="animate-in slide-in-from-top duration-700">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-1 animate-pulse">
                MyProfile Settings
              </h1>
              <b>              <i className="text-default-600 text-sm">Manage your personal information</i>
</b>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="h-fit shadow-2xl hover:shadow-primary/20 transition-all duration-700 border border-divider/30 backdrop-blur-md bg-content1/80 animate-in slide-in-from-left">
              <CardBody className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin-slow blur-sm"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <Avatar
                      src={isProfilePicRemoved ? "/avatar.png" : (selectedImg || localUser?.profilePic || "/avatar.png")}
                      className="relative w-40 h-40 text-large border-4 border-background shadow-2xl transition-all duration-500 group-hover:scale-105"
                      isBordered
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Tooltip content="Change photo" placement="top">
                      <label
                        htmlFor="avatar-upload"
                        className={`bg-gradient-to-r from-primary to-secondary p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all ${
                          isUpdatingProfile ? "opacity-50 pointer-events-none" : "hover:scale-110"
                        }`}
                      >
                        {isUpdatingProfile ? (
                          <Spinner size="sm" color="white" />
                        ) : (
                          <Camera className="w-5 h-5 text-white" />
                        )}
                        <input
                          type="file"
                          id="avatar-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUpdatingProfile}
                        />
                      </label>
                    </Tooltip>
                    
                    {(selectedImg || (localUser?.profilePic && !isProfilePicRemoved)) ? (
                      <Tooltip content="Remove photo" placement="top">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="bg-danger p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-110"
                          disabled={isUpdatingProfile}
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className="text-center mt-4 animate-in fade-in duration-700 delay-300">
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      {localUser?.fullName || "User Name"}
                    </h2>
                    <p className="text-sm text-default-500">
                      {isUpdatingProfile ? (
                        <span className="animate-pulse text-primary">Updating...</span>
                      ) : isProfilePicRemoved ? (
                        "Profile picture removed"
                      ) : selectedImg || localUser?.profilePic ? (
                        "Profile photo added"
                      ) : (
                        "Click buttons below to manage photo"
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Card className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 hover:border-success/40 hover:shadow-lg hover:shadow-success/20 transition-all duration-300 group">
                    <CardBody className="p-3 text-center">
                      <div className="p-2 bg-success/20 rounded-full w-fit mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-xs font-medium text-success">Verified</p>
                      <p className="text-xs text-default-500">Account</p>
                    </CardBody>
                  </Card>

                  <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 hover:border-warning/40 hover:shadow-lg hover:shadow-warning/20 transition-all duration-300 group">
                    <CardBody className="p-3 text-center">
                      <div className="p-2 bg-warning/20 rounded-full w-fit mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-4 h-4 text-warning" />
                      </div>
                      <p className="text-xs font-medium text-warning">Premium</p>
                      <p className="text-xs text-default-500">Member</p>
                    </CardBody>
                  </Card>
                </div>

                {showSaveButton && (
                  <div className="animate-in slide-in-from-bottom duration-500">
                    <Button
                      type="submit"
                      color="primary"
                      size="md"
                      isLoading={isUpdatingProfile}
                      loadingText="Updating..."
                      className="w-full font-medium shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 active:scale-95 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                      variant="shadow"
                    >
                      {!isUpdatingProfile && <Camera className="w-4 h-4 mr-2" />}
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>

            <div className="space-y-4 animate-in slide-in-from-right duration-500 delay-200">
              <Card className="shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 border border-divider/30 backdrop-blur-md bg-content1/80 group">
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Edit3 className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={localUser?.fullName || "N/A"}
                      isReadOnly
                      startContent={<User className="w-4 h-4 text-default-400" />}
                      variant="bordered"
                      classNames={{
                        base: "hover:scale-[1.02] transition-all duration-300",
                        inputWrapper: "bg-default-50 dark:bg-default-100/50 border-default-200 dark:border-default-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300",
                      }}
                    />
                    
                    <Input
                      label="Email Address"
                      value={localUser?.email || "N/A"}
                      isReadOnly
                      startContent={<Mail className="w-4 h-4 text-default-400" />}
                      variant="bordered"
                      classNames={{
                        base: "hover:scale-[1.02] transition-all duration-300",
                        inputWrapper: "bg-default-50 dark:bg-default-100/50 border-default-200 dark:border-default-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300",
                      }}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-xl hover:shadow-2xl hover:shadow-success/10 transition-all duration-700 border border-divider/30 backdrop-blur-md bg-content1/80 group">
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Account Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-default-50 to-default-100/50 dark:from-default-100/20 dark:to-default-200/10 rounded-xl border border-divider/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Member Since</p>
                          <p className="text-xs text-default-500">Account creation date</p>
                        </div>
                      </div>
                      <Chip
                        color="default"
                        variant="flat"
                        size="sm"
                        className="font-medium group-hover/item:scale-105 transition-transform duration-300"
                      >
                        {localUser?.createdAt?.split("T")[0] || "N/A"}
                      </Chip>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success/5 to-success/10 rounded-xl border border-success/20 hover:border-success/40 hover:shadow-lg hover:shadow-success/10 transition-all duration-300 group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/20 rounded-lg group-hover/item:bg-success/30 group-hover/item:scale-110 transition-all duration-300">
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Account Status</p>
                          <p className="text-xs text-default-500">Current standing</p>
                        </div>
                      </div>
                      <Chip
                        color="success"
                        variant="flat"
                        size="sm"
                        className="font-medium group-hover/item:scale-105 transition-transform duration-300"
                        startContent={<CheckCircle className="w-3 h-3" />}
                      >
                        Active
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;