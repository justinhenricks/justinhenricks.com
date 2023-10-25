import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; // Check to avoid SSR issues

    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
