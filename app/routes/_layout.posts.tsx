import { Outlet } from "@remix-run/react";
import styles from "~/styles/posts.module.css"; // Import the CSS module

export default function PostLayout() {
  return (
    <div className={`container ${styles.container}`}>
      <Outlet />
    </div>
  );
}
