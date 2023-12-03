import { cssBundleHref } from "@remix-run/css-bundle";
import { MetaFunction, type LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet } from "@remix-run/react";

import styles from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
  const title = "Justin Henricks";
  const description =
    "Hi, I'm Justin Henricks. I'm a musician and web-developer living in Upstate NY. Try my new experimental ai bot.";

  const url = "https://justinhenricks.com";
  const socialShareImgUrl = "https://justinhenricks.com/social-share.png";

  return [
    { title },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:site_name",
      content: title,
    },
    {
      property: "og:image",
      content: socialShareImgUrl,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content: socialShareImgUrl,
    },
    {
      property: "twitter:url",
      content: url,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:creator",
      content: "@justhenricks",
    },
    {
      property: "twitter:site",
      content: "@justhenricks",
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="overflow-x-hidden dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Outlet />
    </html>
  );
}
