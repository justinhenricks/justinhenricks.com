import { Link } from "@remix-run/react";
import { Theme, useTheme } from "~/utils/theme-provider";
import { useOptionalUser } from "~/utils";

export default function Header() {
  const [, setTheme] = useTheme();
  const user = useOptionalUser();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <header className="mb-8 flex py-8 text-xl">
      <div className="flex flex-1 items-center justify-start">
        Justin Henricks
      </div>
      <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
        <Link to="/">Home</Link>
        <Link to="/">Blog</Link>
        <Link to="/">Gigs</Link>
        <Link to="/">Jams</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-6">
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    </header>
  );
}
