# VidyaPath — Learn. Teach. Grow

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux_Toolkit-purple)](https://redux-toolkit.js.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-blueviolet)](https://stripe.com/)

VidyaPath is a **full-stack Learning Management System (LMS)** built to help instructors create & monetize courses while giving students a seamless learning experience. Built with **React, Redux Toolkit, Express.js, MongoDB, and Stripe**.



## Features

- User authentication (register, login, logout)
- Instructor/admin dashboard for course management
- Student dashboard for enrolled courses and progress tracking
- Course creation, editing, publishing, and searching
- Lecture management (add, edit, remove lectures)
- Course purchase and Stripe payment integration
- Progress tracking for lectures and courses
- Profile management with photo upload
- Protected routes for authentication and role-based access

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Vite
- **Backend:** Express.js, MongoDB, Mongoose, Stripe
- **Other:** Cloudinary (media uploads), Multer, JWT, CORS

## Folder Structure

```
client/
  ├── public/
  ├── src/
  │   ├── app/
  │   ├── assets/
  │   ├── components/
  │   ├── features/
  │   ├── layout/
  │   ├── lib/
  │   ├── pages/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── ...
  ├── package.json
  └── ...
server/
  ├── controllers/
  ├── database/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── uploads/
  ├── utils/
  ├── index.js
  ├── package.json
  └── ...
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)
- Stripe account (for payment integration)
- Cloudinary account (for media uploads)

## Future Improvements
- Mobile app (iOS/Android)
- Advanced analytics & reporting for instructors
- Additional payment gateways
- Enhanced UI/UX and accessibility
- Improved performance, scalability, and security


## Frontend Details

The frontend of this LMS is built using **React** (with Vite for fast development), **Redux Toolkit** for state management, and **React Router** for navigation. It provides a modern, responsive user interface for both students and instructors.

### Main Features

- **Authentication:** Login, registration, and protected routes using JWT.
- **Course Browsing:** Search, filter, and view published courses.
- **Course Management:** Instructors can create, edit, publish/unpublish courses and lectures.
- **Lecture Management:** Add, edit, and remove lectures with video uploads.
- **Purchase Flow:** Stripe integration for secure course payments.
- **Progress Tracking:** Students can track their progress and mark lectures/courses as complete.
- **Profile Management:** Update profile info and photo.
- **Role-based Dashboards:** Separate views for students and instructors/admins.

### Folder Structure

```
client/
  ├── public/                # Static assets
  ├── src/
  │   ├── app/               # Redux store and root reducer
  │   ├── assets/            # Images and icons
  │   ├── components/        # Reusable UI components
  │   │   └── ui/            # UI primitives (button, card, etc.)
  │   ├── features/          # Redux slices and API logic
  │   ├── layout/            # Main layout components
  │   ├── lib/               # Utility functions
  │   ├── pages/             # Page components
  │   │   ├── admin/         # Instructor/admin dashboard pages
  │   │   └── student/       # Student dashboard pages
  │   ├── App.jsx            # Main app component
  │   ├── main.jsx           # Entry point
  ├── package.json
  └── ...
```

### Key Components

- **Navbar:** Navigation bar with links based on user role.
- **ProtectedRoutes:** Wrapper for routes requiring authentication.
- **BuyCourseButton:** Handles Stripe checkout flow.
- **RichTextEditor:** For course and lecture descriptions.
- **LoadingSpinner:** Displays loading states.
- **ThemeProvider:** Supports dark/light mode.

### Pages

- **Login/Register:** User authentication.
- **Student Pages:**
  - `Courses`: Browse/search courses.
  - `CourseDetail`: View course info and purchase.
  - `CourseProgress`: Track progress and view lectures.
  - `MyLearning`: List of purchased/enrolled courses.
  - `Profile`: Update user info and photo.
- **Admin/Instructor Pages:**
  - `Dashboard`: Overview of courses and stats.
  - `AddCourse`, `EditCourse`: Manage courses.
  - `CreateLecture`, `EditLecture`: Manage lectures.
  - `CourseTable`, `CourseTab`, `LectureTab`: Organize courses and lectures.

### State Management

- **Redux Toolkit:** Used for global state (auth, courses, purchases, progress).
- **RTK Query:** Handles API requests and caching.

### API Integration

- All API calls are defined in `features/api/` (e.g., `authApi.js`, `courseApi.js`).
- Uses JWT for authentication; tokens are stored in cookies.

### Styling

- Uses CSS modules and utility-first styling.
- Theme support (dark/light mode).

## Environment Variables

- `PORT`: Port for the backend server
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing and encryption
- `STRIPE_SECRET_KEY`: Secret key for Stripe API
- `CLOUDINARY_CLOUD_NAME`: Cloud name for Cloudinary
- `CLOUDINARY_API_KEY`: API key for Cloudinary
- `CLOUDINARY_API_SECRET`: API secret for Cloudinary

### Backend

- Deploy the server (Node.js/Express) to a cloud provider (e.g., Heroku, AWS, DigitalOcean)
- Set up a MongoDB database (e.g., MongoDB Atlas) and update `MONGODB_URI`
- Configure environment variables in the cloud provider's dashboard
- Ensure the server is running and accessible

### Frontend

- Deploy the client (React) to a static site hosting service (e.g., Vercel, Netlify)
- Update the frontend API base URL to point to the deployed backend server
- Ensure the frontend is accessible and working correctly

---

This LMS is a work in progress. Future improvements may include:

- Enhanced user interface and user experience
- Advanced analytics and reporting for instructors
- Mobile application for iOS and Android
- Integration with third-party services and APIs
- Support for additional payment gateways and currencies
- Improved performance, scalability, and security

---

## Backend Details

The backend of this LMS is built using **Node.js** and **Express.js**, with **MongoDB** as the database and **Mongoose** for object modeling. It provides a robust RESTful API for all LMS features, including authentication, course management, purchases, progress tracking, and media uploads.

### Main Features

- **Authentication:** Secure registration, login, and logout using JWT tokens.
- **Role-based Access:** Middleware to protect routes and restrict access based on user roles (student, instructor, admin).
- **Course Management:** Instructors can create, edit, publish/unpublish courses and lectures.
- **Lecture Management:** Add, edit, and remove lectures, with support for video uploads via Cloudinary.
- **Purchase Flow:** Stripe integration for secure payments and webhook handling for purchase confirmation.
- **Progress Tracking:** Track student progress for each course and lecture.
- **Profile Management:** Update user profile and photo.
- **Media Uploads:** Upload and store course thumbnails and lecture videos using Multer and Cloudinary.

### Folder Structure

```
server/
  ├── controllers/      # Route handler logic for each resource
  ├── database/         # MongoDB connection setup
  ├── middleware/       # Authentication and authorization middleware
  ├── models/           # Mongoose schemas for User, Course, Lecture, Purchase, Progress
  ├── routes/           # API route definitions
  ├── uploads/          # Temporary storage for uploaded files
  ├── utils/            # Utility functions (Cloudinary, JWT, Multer)
  ├── index.js          # Entry point for Express server
  ├── package.json
  └── ...
```

### Key Components

- **Controllers:** Business logic for users, courses, lectures, purchases, progress.
- **Routes:** RESTful endpoints for all resources, grouped by feature.
- **Models:** Mongoose schemas define data structure and relationships.
- **Middleware:** Protects routes and handles authentication/authorization.
- **Utils:** Handles file uploads, JWT token generation, and Cloudinary integration.

### API Security

- **JWT Authentication:** All protected routes require a valid JWT token (sent via cookie).
- **Password Hashing:** User passwords are hashed and salted using bcrypt.
- **Role Checks:** Middleware restricts access to instructor/admin-only features.

### Media Handling

- **Multer:** Handles file uploads from the frontend.
- **Cloudinary:** Stores images and videos, returns secure URLs for use in the app.

### Payment Integration

- **Stripe:** Handles course payments, checkout sessions, and webhook events for purchase confirmation.
- **Purchase Tracking:** Purchases are recorded and linked to users and courses.

### Error Handling

- Consistent error responses with status codes and messages.
- Logging for debugging and monitoring.
---

## Data Models

### User (`user.model.js`)
Represents a user (student, instructor, or admin).

- **Fields:**
  - `name`: String, required
  - `email`: String, required, unique
  - `password`: String, required (hashed)
  - `role`: String, enum (`student`, `instructor`, `admin`), default: `student`
  - `photoUrl`: String (URL to profile photo on Cloudinary)
  - `enrolledCourses`: Array of ObjectId (ref: Course)
  - `createdAt`: Date
  - `updatedAt`: Date

---

### Course (`course.model.js`)
Represents a course created by an instructor.

- **Fields:**
  - `courseTitle`: String, required
  - `subTitle`: String
  - `description`: String
  - `category`: String, required
  - `courseLevel`: String (e.g., Beginner, Intermediate, Advanced)
  - `coursePrice`: Number
  - `courseThumbnail`: String (URL to Cloudinary)
  - `isPublished`: Boolean, default: false
  - `creator`: ObjectId (ref: User)
  - `lectures`: Array of ObjectId (ref: Lecture)
  - `createdAt`: Date
  - `updatedAt`: Date

---

### Lecture (`lecture.model.js`)
Represents a lecture within a course.

- **Fields:**
  - `lectureTitle`: String, required
  - `videoUrl`: String (URL to Cloudinary)
  - `publicId`: String (Cloudinary public ID)
  - `isPreviewFree`: Boolean, default: false
  - `course`: ObjectId (ref: Course)
  - `createdAt`: Date
  - `updatedAt`: Date

---

### PurchaseCourse (`purchaseCourse.js`)
Represents a course purchase by a user.

- **Fields:**
  - `userId`: ObjectId (ref: User)
  - `courseId`: ObjectId (ref: Course)
  - `amount`: Number
  - `status`: String (`pending`, `paid`, `failed`)
  - `paymentId`: String (Stripe session ID)
  - `createdAt`: Date

---

### CourseProgress (`courseProgress.js`)
Tracks a user's progress in a course.

- **Fields:**
  - `userId`: ObjectId (ref: User)
  - `courseId`: ObjectId (ref: Course)
  - `lectureProgress`: Array of objects:
    - `lectureId`: ObjectId (ref: Lecture)
    - `viewed`: Boolean
  - `completed`: Boolean, default: false
  - `createdAt`: Date
  - `updatedAt`: Date

---

**Note:**  
All models use Mongoose for schema definition and relationships.  
Refer to the respective files in `server/models/` for full schema details and validation

---

## API Routes

## User API Routes

### Register a New User
- **Endpoint:** `POST /api/v1/user/register`
- **Auth:** Not required
- **Body:**  
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**  
  - Success:  
    ```json
    { "success": true, "message": "Account created successfully" }
    ```
  - Error:  
    ```json
    { "success": false, "message": "User already exists" }
    ```

### Login
- **Endpoint:** `POST /api/v1/user/login`
- **Auth:** Not required
- **Body:**  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**  
  - Success: Sets JWT token in cookie and returns welcome message.
  - Error:  
    ```json
    { "success": false, "message": "Incorrect email or password" }
    ```

### Logout
- **Endpoint:** `GET /api/v1/user/logout`
- **Auth:** Not required
- **Response:**  
  ```json
  { "success": true, "message": "Logged out successfully" }
  ```

### Get User Profile
- **Endpoint:** `GET /api/v1/user/profile`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    { "success": true, "user": { ...userData } }
    ```
  - Error:  
    ```json
    { "success": false, "message": "Profile not found" }
    ```

### Update User Profile
- **Endpoint:** `PUT /api/v1/user/profile/update`
- **Auth:** Required (JWT)
- **Body:**  
  - Form data with fields:
    - `name`: string (optional)
    - `profilePhoto`: file (optional, image)
- **Response:**  
  - Success:  
    ```json
    { "success": true, "user": { ...updatedUser }, "message": "Profile updated successfully." }
    ```
  - Error:  
    ```json
    { "success": false, "message": "Failed to update profile" }
    ```

**Notes:**
- All authenticated routes require a valid JWT token (sent via cookie).
- Profile photo uploads use multipart/form-data and are stored on Cloudinary.
- Passwords are securely hashed and salted before storage.

## Course API Routes

### Create a New Course
- **Endpoint:** `POST /api/v1/course/`
- **Auth:** Required (JWT)
- **Body:**  
  ```json
  {
    "courseTitle": "string",
    "category": "string"
  }
  ```
- **Response:**  
  - Success:  
    ```json
    { "course": { ...courseData }, "message": "Course created successfully!" }
    ```
  - Error:  
    ```json
    { "message": "Course title and category are required" }
    ```

### Search Courses
- **Endpoint:** `GET /api/v1/course/search`
- **Auth:** Required (JWT)
- **Query Params:**  
  - `query`: string (search term)
  - `categories`: array (filter by categories)
  - `sortByPrice`: "low" or "high"
- **Response:**  
  ```json
  { "success": true, "courses": [ ... ] }
  ```

### Get All Published Courses
- **Endpoint:** `GET /api/v1/course/published-courses`
- **Auth:** Not required
- **Response:**  
  ```json
  { "courses": [ ... ] }
  ```

### Get Creator's Courses
- **Endpoint:** `GET /api/v1/course/`
- **Auth:** Required (JWT)
- **Response:**  
  ```json
  { "courses": [ ... ] }
  ```

### Edit a Course
- **Endpoint:** `PUT /api/v1/course/:courseId`
- **Auth:** Required (JWT)
- **Body:**  
  - Form data with fields:
    - `courseTitle`, `subTitle`, `description`, `category`, `courseLevel`, `coursePrice` (all optional)
    - `courseThumbnail`: file (optional, image)
- **Response:**  
  ```json
  { "course": { ...updatedCourse }, "message": "Course updated successfully" }
  ```

### Get Course by ID
- **Endpoint:** `GET /api/v1/course/:courseId`
- **Auth:** Required (JWT)
- **Response:**  
  ```json
  { "course": { ...courseData } }
  ```

### Toggle Publish Status
- **Endpoint:** `PATCH /api/v1/course/:courseId`
- **Auth:** Required (JWT)
- **Query Param:**  
  - `publish`: "true" or "false"
- **Response:**  
  ```json
  { "message": "Course is Published!" }
  ```

### Add a Lecture to a Course
- **Endpoint:** `POST /api/v1/course/:courseId/lecture`
- **Auth:** Required (JWT)
- **Body:**  
  ```json
  {
    "lectureTitle": "string"
  }
  ```
- **Response:**  
  ```json
  { "lecture": { ...lectureData }, "message": "Lecture created successfully" }
  ```

### Get All Lectures for a Course
- **Endpoint:** `GET /api/v1/course/:courseId/lecture`
- **Auth:** Required (JWT)
- **Response:**  
  ```json
  { "lectures": [ ... ] }
  ```

### Edit a Lecture
- **Endpoint:** `POST /api/v1/course/:courseId/lecture/:lectureId`
- **Auth:** Required (JWT)
- **Body:**  
  ```json
  {
    "lectureTitle": "string",
    "videoInfo": {
      "videoUrl": "string",
      "publicId": "string"
    },
    "isPreviewFree": true
  }
  ```
- **Response:**  
  ```json
  { "lecture": { ...updatedLecture }, "message": "Lecture upadated successfully" }
  ```

### Remove a Lecture
- **Endpoint:** `DELETE /api/v1/course/lecture/:lectureId`
- **Auth:** Required (JWT)
- **Response:**  
  ```json
  { "message": "lecture removed successfully" }
  ```

### Get Lecture by ID
- **Endpoint:** `GET /api/v1/course/lecture/:lectureId`
- **Auth:** Required (JWT)
- **Response:**  
  ```json
  { "lecture": { ...lectureData } }
  ```

## Course Purchase API Routes

### Create Stripe Checkout Session
- **Endpoint:** `POST /api/v1/purchase/checkout/create-checkout-session`
- **Auth:** Required (JWT)
- **Body:**  
  ```json
  {
    "courseId": "string"
  }
  ```
- **Response:**  
  - Success:  
    ```json
    { "success": true, "url": "https://checkout.stripe.com/..." }
    ```
  - Error:  
    ```json
    { "success": false, "message": "Error while creating session" }
    ```

### Stripe Webhook (Payment Confirmation)
- **Endpoint:** `POST /api/v1/purchase/webhook`
- **Auth:** Not required (called by Stripe)
- **Body:**  
  Stripe sends event data (raw JSON).
- **Response:**  
  - Success:  
    HTTP 200 OK
  - Error:  
    HTTP 400/500 with error message

### Get Course Details with Purchase Status
- **Endpoint:** `GET /api/v1/purchase/course/:courseId/details-with-status`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    {
      "course": { ...courseData },
      "purchased": true
    }
    ```
  - Error:  
    ```json
    { "message": "course not found" }
    ```

### Get All Purchased Courses for User
- **Endpoint:** `GET /api/v1/purchase/`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    { "purchasedCourse": [ ... ] }
    ```
  - Error:  
    ```json
    { "purchasedCourse": [] }
    ```

**Notes:**
- The checkout session creates a Stripe payment link for the selected course.
- The webhook is used by Stripe to notify your backend of successful payments and triggers enrollment logic.
- All authenticated routes require a valid JWT token (sent via cookie).
- Purchased courses are tracked in the database and linked to the user's account.

## Course Progress API Routes

### Get Course Progress
- **Endpoint:** `GET /api/v1/progress/:courseId`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    {
      "data": {
        "courseDetails": { ...courseData },
        "progress": [ { "lectureId": "string", "viewed": true } ],
        "completed": false
      }
    }
    ```
  - Error:  
    ```json
    { "message": "Course not found" }
    ```

### Update Lecture Progress
- **Endpoint:** `POST /api/v1/progress/:courseId/lecture/:lectureId/view`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    { "message": "Lecture progress updated successfully" }
    ```

### Mark Course as Completed
- **Endpoint:** `POST /api/v1/progress/:courseId/complete`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    { "message": "Course marked as completed" }
    ```
  - Error:  
    ```json
    { "message": "Course progress not found" }
    ```

### Mark Course as Incompleted
- **Endpoint:** `POST /api/v1/progress/:courseId/incomplete`
- **Auth:** Required (JWT)
- **Response:**  
  - Success:  
    ```json
    { "message": "Course marked as incompleted" }
    ```
  - Error:  
    ```json
    { "message": "Course progress not found" }
    ```

**Notes:**
- All routes require a valid JWT token (sent via cookie).
- Progress is tracked per user and per course.
- Lecture progress is stored as an array of objects with `lectureId` and `viewed` status.

## Media API Routes

### Upload Video or Media File
- **Endpoint:** `POST /api/v1/media/upload-video`
- **Auth:** Not required (can be restricted via middleware if needed)
- **Body:**  
  - Form data with field:
    - `file`: video or image file

- **Response:**  
  - Success:  
    ```json
    {
      "success": true,
      "message": "File uploaded successfully.",
      "data": {
        "url": "https://res.cloudinary.com/...",
        "publicId": "cloudinary_public_id"
      }
    }
    ```
  - Error:  
    ```json
    { "message": "Error uploading file" }
    ```

**Notes:**
- The uploaded file is stored on Cloudinary.
- The response includes the secure URL and public ID for further use (e.g., saving in course or lecture models).
- For production, consider adding authentication middleware to restrict uploads to authorized users.



Thank you for checking out this Learning Management System (LMS) project!