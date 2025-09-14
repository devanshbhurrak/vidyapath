import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useIncompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CirclePlay, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [incompleteCourse, { data: markIncompleteData, isSuccess: incompletedSuccess }] =
    useIncompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData.message);
      refetch();
    }
    if (incompletedSuccess) {
      toast.success(markIncompleteData.message);
      refetch();
    }
  }, [completedSuccess, incompletedSuccess]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading course...</span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load course details
      </p>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => {
      const progId = prog.lectureId._id || prog.lectureId;
      return progId.toString() === lectureId.toString() && prog.viewed;
    });

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Error updating lecture progress:", err);
    }
  };

  const handleSelectedLecture = (lecture) => setCurrentLecture(lecture);

  const handleCompleteCourse = async () => await completeCourse(courseId);
  const handleIncompleteCourse = async () => await incompleteCourse(courseId);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleIncompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" /> Completed
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Player */}
        <Card className="flex-1 md:w-3/5">
          <CardContent className="p-4">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full rounded-md"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
            <h3 className="mt-3 text-lg font-medium">
              Lecture{" "}
              {courseDetails.lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1}
              : {currentLecture?.lectureTitle || initialLecture?.lectureTitle}
            </h3>
          </CardContent>
        </Card>

        {/* Lecture List */}
        <Card className="w-full md:w-2/5">
          <CardHeader>
            <CardTitle className="text-xl">Course Lectures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {courseDetails?.lectures.map((lecture) => {
              const isCompleted = isLectureCompleted(lecture._id);
              const isActive = lecture._id === currentLecture?._id;
              return (
                <div
                  key={lecture._id}
                  onClick={() => handleSelectedLecture(lecture)}
                  className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
                    isActive
                      ? "bg-muted border-primary"
                      : "hover:bg-muted/50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <CirclePlay className="w-5 h-5 text-gray-400" />
                    )}
                    <p className="text-sm font-medium">{lecture.lectureTitle}</p>
                  </div>
                  {isCompleted && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      Done
                    </Badge>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseProgress;
