import LoadingSpinner from "@/components/LoadingSpinner";
import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [publishCourse, { isLoading: publishLoading }] =
    usePublishCourseMutation();
  const {
    data: courseData,
    isLoading: courseLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => setInput({ ...input, category: value });
  const selectCourseLevel = (value) =>
    setInput({ ...input, courseLevel: value });

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) =>
      formData.append(key, value ?? "")
    );
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Failed to update course status");
    }
  };

  useEffect(() => {
    if (courseData?.course) {
      const course = courseData.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: null,
      });
    }
  }, [courseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Update course details here. Click save when finished.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={publishLoading || courseData?.course.lectures.length === 0}
            variant="default"
            onClick={() =>
              publishStatusHandler(
                courseData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {publishLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : courseData?.course.isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>
          <Button variant="outline">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        <div>
          <Label>Title</Label>
          <Input
            value={input.courseTitle}
            onChange={changeEventHandler}
            type="text"
            name="courseTitle"
            placeholder="Ex. Fullstack Developer"
          />
        </div>

        <div>
          <Label>Sub Title</Label>
          <Input
            value={input.subTitle}
            onChange={changeEventHandler}
            type="text"
            name="subTitle"
            placeholder="Ex. Become a Fullstack Developer from zero to hero"
          />
        </div>

        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex flex-wrap gap-6">
          <div>
            <Label>Category</Label>
            <Select onValueChange={selectCategory} value={input.category}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {[
                    "Web Development",
                    "Mobile App Development",
                    "Artificial Intelligence & Machine Learning",
                    "Data Science & Analytics",
                    "Cloud Computing",
                    "DevOps & System Administration",
                    "UI/UX Design",
                    "Cybersecurity",
                    "Digital Marketing",
                    "Business Analytics",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Course Level</Label>
            <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-[250px]"
            />
          </div>
        </div>

        <div>
          <Label>Course Thumbnail</Label>
          <Input
            onChange={selectThumbnail}
            type="file"
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-64 my-3 rounded-md shadow-sm border"
              alt="Course Thumbnail"
            />
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <Button
          onClick={() => navigate("/admin/courses")}
          variant="outline"
        >
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={updateCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseTab;
