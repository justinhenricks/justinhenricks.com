import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "" }];
};

export async function loader({ params, request }: DataFunctionArgs) {
  return json({ hello: "world" });
}

export async function action({ request }: DataFunctionArgs) {
  return redirect("/");
}

export default function PageLayout() {
  return (
    <body className="bg-background text-foreground">
      <div className="flex h-screen flex-col relative">
        <header className="container sticky top-0 flex w-full items-center justify-center text-teal-400 py-6">
          <div className="text-2xl">justin henricks</div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer>Hello footer</footer>
      </div>

      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}
