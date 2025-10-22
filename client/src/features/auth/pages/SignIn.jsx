import LoginHeader from "../components/LoginHeader";
import LoginHeroSection from "../components/LoginHeroSection";
import SignInForm from "../components/SignInForm";

export default function SignIn() {
  return (
    <div>
      <LoginHeader />

      <div className="flex flex-col sm:flex-row container mx-auto gap-x-16 gap-y-7 pt-10 sm:pt-32">
        {/* SignIn form */}
        <SignInForm />

        {/* Right Side */}
        <LoginHeroSection
          context={
            "Your journey continues! Dive back into the world of inspiration and thoughtful conversations."
          }
        />
      </div>
    </div>
  );
}
