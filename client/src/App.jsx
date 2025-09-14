import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/AddCourse'
import CourseTable from './pages/admin/CourseTable'
import EditCourse from './pages/admin/EditCourse'
import CreateLecture from './pages/admin/CreateLecture'
import EditLecture from './pages/admin/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout />,
        children:[
            {
                path:'/',
                element: <>
                    <HeroSection />
                    <Courses /> 
                </>
            },
            {
                path:'login',
                element: <AuthenticatedUser> <Login /> </AuthenticatedUser>
            },
            {
                path:'my-learning',
                element: <ProtectedRoute> <MyLearning /> </ProtectedRoute>
            },
            {
                path:'profile',
                element: <ProtectedRoute> <Profile /> </ProtectedRoute>
            },
            {
                path:'search',
                element: <ProtectedRoute> <SearchPage /> </ProtectedRoute>
            },
            {
                path:'course-detail/:courseId',
                element: <ProtectedRoute> <CourseDetail /> </ProtectedRoute>
            },
            {
                path:'course-progress/:courseId',
                element: (
                    <ProtectedRoute> 
                        <PurchaseCourseProtectedRoute>
                            <CourseProgress />
                        </PurchaseCourseProtectedRoute>
                    </ProtectedRoute>
                )
            },
            {
                path:'admin',
                element: <AdminRoute><Sidebar /> </AdminRoute> ,
                children:[
                    {
                        path:'dashboard',
                        element:<Dashboard />
                    },
                    {
                        path:'courses',
                        element: <CourseTable />
                    },
                    {
                        path:'courses/create',
                        element: <AddCourse />
                    },
                    {
                        path:'courses/:courseId',
                        element: <EditCourse />
                    },
                    {
                        path:'courses/:courseId/lecture',
                        element: <CreateLecture />
                    },
                    {
                        path:'courses/:courseId/lecture/:lectureId',
                        element: <EditLecture />
                    },
                ]
            }
        ]
    }, 
])

function App() {
  
  return (
    <main>
        <ThemeProvider>
            <RouterProvider router={appRouter} />
        </ThemeProvider>
    </main>
  )
}

export default App

// qTxLnwF6TtzmI