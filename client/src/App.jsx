import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FooterCom from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeaderAndFooter = ["/sign-in", "/sign-up", "/"].includes(
    location.pathname
  );

  return (
    <>
      {!hideHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      {!hideHeaderAndFooter && <FooterCom />}
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
