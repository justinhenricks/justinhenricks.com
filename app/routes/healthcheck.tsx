// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import { type DataFunctionArgs } from "@remix-run/node";

export async function loader({ request }: DataFunctionArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    // if we can connect to the database and make a simple query
    // and make a HEAD request to ourselves, then we're good.

    await fetch(`${new URL(request.url).protocol}${host}`, {
      method: "HEAD",
    }).then((r) => {
      if (!r.ok) {
        return Promise.reject(r);
      }
    });
    console.log("healthcheck ✅");
    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
}
