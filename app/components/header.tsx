import React from "react";
import { cn } from "~/lib/utils";

export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        className={cn(
          "container sticky top-0 flex w-full items-center justify-center text-primary py-6",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="text-2xl">justin henricks</div>
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };
