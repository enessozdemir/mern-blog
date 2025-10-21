import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../src/features/posts/pages/Home";
import Header from "../src/shared/components/Header";
import SignIn from "./features/auth/pages/SignIn";
import SignUp from "./features/auth/pages/SignUp";
import FooterCom from "../src/shared/components/Footer";
import Dashboard from "../src/features/dashboard/pages/Dashboard";
import PrivateRoute from "../src/shared/components/PrivateRoute";
import CreatePost from "../src/features/posts/pages/CreatePost";
import UpdatePost from "../src/features/posts/pages/UpdatePost";
import PostPage from "../src/features/posts/pages/PostPage";
import ScrollToTop from "../src/shared/components/ScrollToTop";
import SearchPage from "../src/features/search/pages/SearchPage";

function App() {
  const location = useLocation();
  const hideHeaderAndFooter = ["/sign-in", "/sign-up"].includes(
    location.pathname
  );

  return (
    <>
      {!hideHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      {!hideHeaderAndFooter && <FooterCom />}
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
