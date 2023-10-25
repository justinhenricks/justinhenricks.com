import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Header } from "~/components/header";

export const meta: MetaFunction = () => {
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
        <Header />

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
