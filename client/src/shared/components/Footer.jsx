import {
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import {
  PiXLogo,
  PiLinkedinLogo,
  PiGithubLogo,
  PiInstagramLogo,
  PiDiscordLogo,
} from "react-icons/pi";
import { useTheme } from "../hooks/useTheme";

export default function FooterCom() {
  const { theme } = useTheme();
  return (
    <div className="p-7 sm:px-0">
      <div className="container mx-auto flex flex-col sm:flex-row">
        <div className="hidden sm:flex flex-col gap-y-3 flex-1">
          <Link
            to="/home"
            className={`w-24 ${
              theme === "light" ? "text-primary-color" : "text-soft-white"
            } whitespace-nowrap text-2xl sm:text-3xl font-airone`}
          >
            Blog.
          </Link>
          <p className="text-light-gray text-sm">The #1 Blog.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-24 sm:mt-2">
          <div className="leading-4 mb-5">
            <FooterTitle
              className="text-primary-color normal-case text-sm sm:text-lg font-medium mb-3"
              title="Categories"
            />
            <FooterLinkGroup col className="text-sm !text-light-gray">
              <FooterLink
                href="/search?category=technology"
                target="_blank"
                rel="noopener noreferrer"
              >
                Technology
              </FooterLink>
              <FooterLink
                href="/search?category=business"
                target="_blank"
                rel="noopener noreferrer"
              >
                Business
              </FooterLink>
              <FooterLink
                href="/search?category=travel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Travel
              </FooterLink>
              <FooterLink
                href="/search?category=other"
                target="_blank"
                rel="noopener noreferrer"
              >
                Other
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div className="leading-4 mb-4">
            <FooterTitle
              className="text-primary-color normal-case text-sm sm:text-lg font-medium mb-3"
              title="Support"
            />
            <FooterLinkGroup col className="text-sm !text-light-gray">
              <FooterLink href="#" rel="noopener noreferrer">
                FAQs
              </FooterLink>
              <FooterLink href="#" rel="noopener noreferrer">
                Help Center
              </FooterLink>
              <FooterLink href="#" rel="noopener noreferrer">
                Community Guidelines
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div className="leading-4 mb-5">
            <FooterTitle
              className="text-primary-color normal-case text-sm sm:text-lg font-medium mb-3"
              title="About"
            />
            <FooterLinkGroup col className="text-sm !text-light-gray">
              <FooterLink href="#" rel="noopener noreferrer">
                Our Team
              </FooterLink>
              <FooterLink href="#" rel="noopener noreferrer">
                Careers
              </FooterLink>
              <FooterLink href="#" rel="noopener noreferrer">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" rel="noopener noreferrer">
                Terms of Service
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
      </div>

      <FooterDivider className="container mx-auto" />

      <div
        className={`flex justify-between container mx-auto ${
          theme === "light" ? "text-icon-color" : "text-lighter-icon-color"
        }`}
      >
        <FooterCopyright
          className="!text-light-gray"
          by="Blog."
          year={new Date().getFullYear()}
        />

        <div className="flex gap-x-5">
          <a
            href="https://www.instagram.com/enessozdemir/"
            target="_blank"
            className={`${
              theme === "light"
                ? "hover:text-primary-color"
                : "hover:text-soft-white"
            } transition-all duration-200 text-2xl`}
          >
            <PiInstagramLogo />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            className={`${
              theme === "light"
                ? "hover:text-primary-color"
                : "hover:text-soft-white"
            } transition-all duration-200 text-2xl`}
          >
            <PiXLogo />
          </a>
          <a
            href="https://github.com/enessozdemir"
            target="_blank"
            className={`${
              theme === "light"
                ? "hover:text-primary-color"
                : "hover:text-soft-white"
            } transition-all duration-200 text-2xl`}
          >
            <PiGithubLogo />
          </a>
          <a
            href="https://www.linkedin.com/in/enessozdemir/"
            target="_blank"
            className={`${
              theme === "light"
                ? "hover:text-primary-color"
                : "hover:text-soft-white"
            } transition-all duration-200 text-2xl`}
          >
            <PiLinkedinLogo />
          </a>
          <a
            href="https://discord.com/"
            target="_blank"
            className={`${
              theme === "light"
                ? "hover:text-primary-color"
                : "hover:text-soft-white"
            } transition-all duration-200 text-2xl`}
          >
            <PiDiscordLogo />
          </a>
        </div>
      </div>
    </div>
  );
}
