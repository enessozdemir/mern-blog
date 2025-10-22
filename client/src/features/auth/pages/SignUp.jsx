import LoginHeader from "../../auth/components/LoginHeader";
import LoginHeroSection from "../components/LoginHeroSection";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <div>
      <LoginHeader />

      <div className="flex flex-col sm:flex-row container mx-auto gap-x-16 pb-10 sm:pb-0 pt-2 sm:pt-12">
        {/* SignUp form */}
        <SignUpForm />

        {/* Right Side */}
        <LoginHeroSection context="Join a journey of discovery and inspiration, where each post unravels new ideas and sparks meaningful conversations." />
      </div>
    </div>
  );
}
