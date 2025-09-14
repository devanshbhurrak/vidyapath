import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
};

export default LoadingSpinner;
