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
    <header className="flex w-screen px-4 py-4 md:px-8">
      <div className="flex flex-1 items-center justify-start">
        Justin Henricks
      </div>
      <nav className="flex flex-1 items-center justify-center">
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-6">
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    </header>
  );
}
