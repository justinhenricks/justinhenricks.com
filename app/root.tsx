import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-zinc-900 text-zinc-100">
        <div className="flex h-screen flex-col justify-between">
          <header className="container flex w-full justify-between text-teal-400 py-6">
            <div className="text-2xl">justin henricks</div>
            <div>
              <nav>
                <ul className="flex gap-4 text-zinc-50">
                  <li>
                    <a href="/">home</a>
                  </li>
                  <li>
                    <a href="/about">about</a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="container">footer</footer>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
