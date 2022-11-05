import { createCookieSessionStorage } from "@remix-run/node";
import { l } from "vitest/dist/index-6e18a03a";

import { Theme, isTheme } from "./theme-provider";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error(
    `SESSION_SECRET must be set.. process env is: ${process.env}`
  );
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "my_remix_theme",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
