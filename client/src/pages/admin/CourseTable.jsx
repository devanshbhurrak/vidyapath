import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseTable = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetCreatorCourseQuery()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Courses</h1>
        <Button onClick={() => navigate('create')}>+ Create New Course</Button>
      </div>

      <Table>
        <TableCaption>A list of your created courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[200px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Loading courses...
              </TableCell>
            </TableRow>
          ) : data?.courses?.length > 0 ? (
            data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course.courseTitle}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {course?.coursePrice ? `₹${course.coursePrice}` : 'Free'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {course.isPublished ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">Published</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit className="w-4 h-4" />
                    <span className="ml-1 hidden sm:inline">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                You haven’t created any courses yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseTable
