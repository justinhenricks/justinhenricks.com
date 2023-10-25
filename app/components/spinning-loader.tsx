import { cn, missingClass } from "~/lib/utils";

export interface SpinningLoaderProps {
  className?: string;
}

export function SpinningLoader({ className }: SpinningLoaderProps) {
  const baseStyles = "animate-spin";

  const styles = cn(
    missingClass(className, "text-") && "text-teal-200",
    missingClass(className, "h-") && "h-5",
    missingClass(className, "w-") && "w-5",
    baseStyles,
    className
  );
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
