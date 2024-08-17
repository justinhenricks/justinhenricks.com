import React from "react";
import justyLogo from "~/assets/img/justy-logo-white.png";
import justy from "~/assets/img/justin_1.png";
import { cn } from "~/lib/utils";
import { SocialLinks } from "./social-links";
import { Link } from "@remix-run/react";
export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        className={cn(
          "sticky top-0 flex w-full items-center justify-center font-black py-4 lg:py-6 border-b-2 mb-6 bg-background",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="grid justify-items-center gap-2">
            <img
              src={justy}
              className="max-h-14 rounded-full"
              alt="justy logo"
            />

            <h1 className="text-xl font-extrabold lowercase">
              <Link to={"/"}>Justin Henricks</Link>
            </h1>

            <Link to={"/chat"} className="text-teal-400 lg:hidden pb-1 lg:pb-0">
              ask (my ai) anything
            </Link>

            <SocialLinks />
          </div>
          {/* <button>open</button> */}
        </div>

        <Link
          to={"/chat"}
          className="absolute right-10 text-teal-400 hover:opacity-90 hidden lg:block"
        >
          ask (my ai) anything
        </Link>
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };
