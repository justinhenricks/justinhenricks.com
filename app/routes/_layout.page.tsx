import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "" }];
};

export async function loader({ params, request }: DataFunctionArgs) {
  return json({ hello: "world" });
}

export async function action({ request }: DataFunctionArgs) {
  return redirect("/");
}

export default function PageTest() {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
