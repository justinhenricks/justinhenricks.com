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
    <header className="flex w-screen justify-between px-4 py-4 md:px-8">
      <div className="">Justin Henricks</div>
      <nav>
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
      </nav>
      <div className="flex items-center justify-center gap-6">
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    </header>
  );
}
