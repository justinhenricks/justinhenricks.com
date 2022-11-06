import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import type { Theme } from "~/utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";

import { json } from "@remix-run/node";
import clsx from "clsx";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import appStyles from "./styles/app.css";
import { getUser } from "./session.server";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "./utils/theme-provider";
import { User } from "./models/user.server";
import Header from "./components/header";

export type LoaderData = {
  theme: Theme | null;
  user: User | null;
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: appStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Justin Henricks",
  viewport: "width=device-width,initial-scale=1",
});

//OG LOADER
export async function loader({ request }: LoaderArgs) {
  const themeSession = await getThemeSession(request);
  const user = await getUser(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    user: user,
  };

  return json(data);
}

// export const loader: LoaderFunction = async ({ request }) => {
//   const themeSession = await getThemeSession(request);

//   const data: LoaderData = {
//     theme: themeSession.getTheme(),
//   };

//   return data;
// };

const App = () => {
  const [theme] = useTheme();
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className={`h-full ${clsx(theme)}`}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="h-full bg-light text-dark transition duration-500 dark:bg-zinc-900 dark:text-light">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
