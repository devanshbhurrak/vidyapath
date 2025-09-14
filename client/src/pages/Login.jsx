import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Form states
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // validation errors

  // API hooks
  const [
    registerUser,
    { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess },
  ] = useLoginUserMutation();

  // Handle input
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  // Validate input
  const validate = (type) => {
    const newErrors = {};
    const inputData = type === "signup" ? signupInput : loginInput;

    if (type === "signup" && !inputData.name) {
      newErrors.name = "Name is required";
    }
    if (!inputData.email) {
      newErrors.email = "Email is required";
    }
    if (!inputData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login/signup
  const handleRegistration = async (type) => {
    if (!validate(type)) return;
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  // Side effects
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successful");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successful");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [registerIsSuccess, loginIsSuccess, registerData, loginData, registerError, loginError, navigate]);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-gray-900">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-pulse" />
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          Welcome to VidyaPath
        </h1>
        <p className="text-lg text-blue-100 max-w-md text-center leading-relaxed">
          Learn. Teach. Grow. Access thousands of high-quality courses and boost
          your skills.
        </p>
        <img
          src="src\assets\learning.png"
          alt="Learning Illustration"
          className="mt-10 max-w-xs drop-shadow-2xl"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-6">
        <Tabs defaultValue="login" className="w-full max-w-lg">
          <TabsList className="grid grid-cols-2 rounded-2xl bg-gray-200 dark:bg-gray-800 p-1 shadow-inner mb-6 w-full">
            <TabsTrigger
              value="login"
              className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-lg transition"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-lg transition"
            >
              Signup
            </TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <Card className="shadow-2xl border border-gray-200/40 dark:border-gray-700/40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-semibold text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-indigo-500" /> Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                  Login to continue your journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white shadow-md"
                  onClick={() => handleRegistration("login")}
                  disabled={loginIsLoading}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Signup */}
          <TabsContent value="signup">
            <Card className="shadow-2xl border border-gray-200/40 dark:border-gray-700/40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-semibold text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" /> Create Account
                </CardTitle>
                <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                  Join thousands of learners today.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 transition text-white shadow-md"
                  onClick={() => handleRegistration("signup")}
                  disabled={registerIsLoading}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
