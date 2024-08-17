import { json, type DataFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import * as testPost from "./_layout.posts.test.mdx";

// @ts-ignore
function postFromModule(mod) {
  console.log("mod", mod.meta);
  return {
    slug: mod.filename
      .replace(/\.mdx?$/, "")
      .replace("_layout", "")
      .replace(/\./g, "/"),
    ...mod.meta[0],
    ...mod.meta[1],
  };
}

export async function loader({ params }: DataFunctionArgs) {
  return json({
    hello: "world",
    posts: [postFromModule(testPost)],
  });
}

export default function HomePage() {
  const { hello, posts } = useLoaderData<typeof loader>();

  console.log("post", posts);

  return (
    <div className="grid container justify-center gap-6 lowercase">
      {posts.map((post) => (
        <Link
          to={post.slug}
          key={post.slug}
          className="border-2 p-6 rounded grid gap-4 justify-items-center"
        >
          <div className="grid justify-items-center">
            <span className="text-sm">{post.date}</span>
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
          </div>
          <div className="">
            {post.description ? <p>{post.description}</p> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
