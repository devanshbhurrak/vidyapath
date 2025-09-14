import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import { BadgeInfo, Lock, PlayCircle, Loader2 } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

const CourseDetail = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading course...</span>
      </div>
    )
  }

  if (isError)
    return <h1 className="text-center text-red-500 font-medium">Failed to load course details</h1>

  const { course, purchased } = data

  const handleContinueCourse = () => {
    if (purchased) navigate(`/course-progress/${courseId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg text-gray-200">{course?.subTitle}</p>
          <p>
            Created By{' '}
            <span className="text-[#C0C4FC] underline italic">{course?.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BadgeInfo size={16} />
            <p>Last Updated {course?.createdAt?.split('T')[0]}</p>
          </div>
          <p className="text-sm">Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6">
        {/* Left */}
        <div className="w-full lg:w-2/3 space-y-6">
          <section>
            <h2 className="font-semibold text-xl md:text-2xl mb-2">Description</h2>
            <div
              className="prose dark:prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  {lecture.isPreviewFree ? (
                    <PlayCircle size={16} className="text-green-600" />
                  ) : (
                    <Lock size={16} className="text-gray-500" />
                  )}
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col space-y-3">
              <div className="w-full aspect-video rounded-md overflow-hidden bg-black">
                {course?.lectures?.[0]?.videoUrl ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course.lectures[0].videoUrl}
                    controls
                  />
                ) : (
                  <div className="flex justify-center items-center h-full text-white text-sm">
                    No Preview Available
                  </div>
                )}
              </div>

              <h3 className="text-base font-medium">
                {course?.lectures?.[0]?.lectureTitle || 'Preview Lecture'}
              </h3>
              <Separator />
              <h2 className="text-lg md:text-xl font-semibold">₹{course.coursePrice}</h2>
            </CardContent>
            <CardFooter className="p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
