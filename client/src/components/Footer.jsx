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
} from "react-icons/pi";

export default function FooterCom() {
  return (
    <div className="p-7 sm:px-0">
      <div className="container mx-auto flex flex-col sm:flex-row">
        <div className="hidden sm:flex flex-col gap-y-3 flex-1">
          <Link
            to="/"
            className="whitespace-nowrap text-xl sm:text-2xl font-airone"
          >
            Blog.
          </Link>
          <p className="text-[#818181] text-sm">The #1 Blog.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-24 sm:mt-2">
          <div className="leading-4 mb-5">
            <FooterTitle
              className="text-black normal-case text-sm sm:text-lg font-medium mb-3"
              title="Categories"
            />
            <FooterLinkGroup col className="text-sm text-[#818181] leading-4">
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Technology
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Business
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Travel
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div className="leading-4 mb-4">
            <FooterTitle
              className="text-black normal-case text-sm sm:text-lg font-medium mb-3"
              title="Support"
            />
            <FooterLinkGroup col className="text-sm text-[#818181]">
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                FAQs
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Help Center
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Community Guidelines
              </FooterLink>
            </FooterLinkGroup>
          </div>

          <div className="leading-4 mb-5">
            <FooterTitle
              className="text-black normal-case text-sm sm:text-lg font-medium mb-3"
              title="About"
            />
            <FooterLinkGroup col className="text-sm text-[#818181]">
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Our Team
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                Jobs
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
      </div>

      <FooterDivider className="container mx-auto" />

      <div className="flex justify-between container mx-auto">
        <FooterCopyright by="Blog." year={new Date().getFullYear()} />

        <div className="flex gap-x-5">
          <a
            href="#"
            className="text-[#b3b3b3] hover:text-black transition-all duration-200 text-2xl"
          >
            <PiInstagramLogo />
          </a>
          <a
            href="#"
            className="text-[#b3b3b3] hover:text-black transition-all duration-200 text-2xl"
          >
            <PiXLogo />
          </a>
          <a
            href="#"
            className="text-[#b3b3b3] hover:text-black transition-all duration-200 text-2xl"
          >
            <PiGithubLogo />
          </a>
          <a
            href="#"
            className="text-[#b3b3b3] hover:text-black transition-all duration-200 text-2xl"
          >
            <PiLinkedinLogo />
          </a>
        </div>
      </div>
    </div>
  );
}
