import { Navigate, Route, Routes } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import PostsPage from "./pages/PostsPage";
import CommentsPage from "./pages/CommentsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        {/* Dashboard: default /dashboard -> /dashboard/posts */}
        <Route
          path="dashboard"
          element={<Navigate to="/dashboard/posts" replace />}
        />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="posts" element={<PostsPage />} />
          <Route path="comments" element={<CommentsPage />} />
        </Route>

        <Route path="user" element={<ProfilePage />} />
        <Route path="my-component" element={<div>My Component works!</div>} />
      </Route>
    </Routes>
  );
}

export default App;
