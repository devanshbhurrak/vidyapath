import { Button } from '@/components/ui/button'
import React from 'react'
import CourseTab from './CourseTab'
import { Link } from 'react-router-dom'

const EditCourse = () => {
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='font-bold text-xl'>Add detail information regarding course</h1>
            <Link to='lecture'>
                <Button className='hover:text-blue-600' variant='link'>
                    Go to lecture page
                </Button>
            </Link>
        </div>
        <CourseTab />
        
    </div>
  )
}

export default EditCourse