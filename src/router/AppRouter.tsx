import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import About from "../Screens/About";
import Job from "../Screens/Job";
import BlogScreen from "../Screens/BlogScreen";
import UserPosts from "../Screens/UserPosts";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<About />} />
          <Route path="jobs" element={<Job />} />
          <Route path="blogs" element={<BlogScreen />} />
          <Route path="about" element={<About />} />
          {/* <Route path="userposts" element={<UserPosts/>}/> */}
          <Route
            path="userposts"
            element={
              <ProtectedRoute>
                <UserPosts />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
