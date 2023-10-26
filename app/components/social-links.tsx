import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import React from "react";
import { cn } from "~/lib/utils";

export interface SocialLinksProps {
  className?: string;
}

const SocialLinks = React.forwardRef<HTMLDivElement, SocialLinksProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("flex gap-6", className)}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Justin Henricks on Twitter"
          to={`https://twitter.com/justhenricks`}
        >
          <TwitterLogoIcon className="h-5 w-5" />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Justin Henricks on Instagram"
          to={`https://www.instagram.com/justin.henricks/`}
        >
          <InstagramLogoIcon className="h-5 w-5" />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Justin Henricks on Youtube"
          to={`https://www.youtube.com/c/JustinHenricks`}
        >
          <VideoIcon className="h-5 w-5" />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Justin Henricks on Github"
          to={`https://github.com/justinhenricks`}
        >
          <GitHubLogoIcon className="h-5 w-5" />
        </Link>
      </div>
    );
  }
);

SocialLinks.displayName = "SocialLinks";

export { SocialLinks };
