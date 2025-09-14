import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-xl border-gray-200 dark:border-gray-800 shadow-sm p-4 mb-4 hover:shadow-md transition">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {course.subTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor : <span className="font-semibold">{course.creator?.name}</span>
          </p>
          <Badge className="w-fit">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-blue-600 dark:text-blue-400">
          ₹{course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
