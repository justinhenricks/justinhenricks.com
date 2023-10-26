import React from "react";
import justyLogo from "~/assets/img/justy-logo-white.png";
import { cn } from "~/lib/utils";
import { SocialLinks } from "./social-links";
export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        className={cn(
          "container sticky top-0 flex w-full items-center justify-center font-black py-6",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* <div className="text-2xl">justin henricks</div> */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <div>
            <img src={justyLogo} className="max-h-10" alt="justy logo" />
          </div>
          <SocialLinks />
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };
