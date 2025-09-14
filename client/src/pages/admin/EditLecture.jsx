import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to={`/admin/courses/${courseId}/lecture`}>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="font-bold text-2xl">Update Lecture</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Modify the lecture details below and save your changes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <LectureTab />
    </div>
  );
};

export default EditLecture;
