import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, error, isSuccess, isLoading }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created!");
      navigate("/admin/courses");
    }
    if (error) {
      console.error(error);
      toast.error(error?.message || "Course not created!");
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Add New Course</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Provide a course title and select a category to create your course.
        </p>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <Label className="text-gray-800 dark:text-gray-200">Course Title</Label>
          <Input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            type="text"
            placeholder="e.g. Mastering React with Redux"
          />
        </div>

        {/* Category */}
        <div>
          <Label className="text-gray-800 dark:text-gray-200">Category</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                <SelectItem value="Artificial Intelligence & Machine Learning">AI & ML</SelectItem>
                <SelectItem value="Data Science & Analytics">Data Science & Analytics</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="DevOps & System Administration">DevOps & System Admin</SelectItem>
                <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                <SelectItem value="Business Analytics">Business Analytics</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
