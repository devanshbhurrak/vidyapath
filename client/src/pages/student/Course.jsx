import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 rounded-xl">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course thumbnail"
            className="w-full h-40 object-cover"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold line-clamp-1 hover:underline">
            {course.courseTitle}
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.creator?.photoUrl || 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">{course.creator?.name}</p>
            </div>
            <span className="bg-blue-600/90 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              {course.courseLevel}
            </span>
          </div>

          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{course.coursePrice}
          </p>
        </CardContent>
      </div>
    </Link>
  )
}

export default Course
