import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isError: updateError, isSuccess }
  ] = useUpdateUserMutation();

  const user = data?.user;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile Updated");
    }
    if (updateError) {
      toast.error(updateUserData?.message || "Something went wrong!");
    }
  }, [isSuccess, updateError, updateUserData]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Unauthorized. Please log in.</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-8">
      {/* Header */}
      <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6">
        {/* Avatar */}
        <Avatar className="h-28 w-28 md:h-32 md:w-32 border">
          <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="space-y-3 w-full">
          <div>
            <span className="block text-sm text-gray-500">Name</span>
            <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Email</span>
            <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Role</span>
            <p className="font-medium text-gray-900 dark:text-gray-100">{user.role.toUpperCase()}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">Edit Profile</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses */}
      <div className="mt-10">
        <h1 className="font-semibold text-lg md:text-xl mb-4">Courses You're Enrolled In</h1>
        {user.enrolledCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 italic">You haven't enrolled yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
