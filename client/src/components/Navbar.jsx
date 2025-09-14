import { Menu, Sparkles } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "../DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles
            size={28}
            className="text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-200"
          />
          <span className="hidden md:block font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
            VidyaPath
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition">
                  <AvatarImage src={user?.photoUrl} alt="User Avatar" />
                  <AvatarFallback>
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 shadow-lg" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/my-learning">📘 My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">👤 Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    🚪 Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user?.role === "instructor" && (
                  <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                    📊 Dashboard
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hover:bg-blue-50 dark:hover:bg-gray-800"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={() => navigate("/login")}
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileNavbar user={user} logoutHandler={logoutHandler} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full hover:bg-blue-50 dark:hover:bg-gray-800"
          aria-label="Open Menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between mt-4 px-4">
          <SheetTitle className="text-lg font-bold">VidyaPath</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

        <nav className="flex flex-col space-y-4 px-4">
          {user ? (
            <>
              <Link to="/my-learning" className="hover:text-blue-600">
                📘 My Learning
              </Link>
              <Link to="/profile" className="hover:text-blue-600">
                👤 Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="text-left hover:text-red-500"
              >
                🚪 Log out
              </button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-full"
              >
                Login
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                onClick={() => navigate("/login")}
              >
                Signup
              </Button>
            </>
          )}
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="w-full"
              >
                📊 Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
