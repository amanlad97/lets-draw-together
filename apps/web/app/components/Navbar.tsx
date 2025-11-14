"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { deleteMyCookieAction } from "../utils/utils";
export const Navbar = () => {
  const path = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!(path === "/signin"));
  }, [path]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
        flex items-center justify-between
        h-16 px-6 
        backdrop-blur-md bg-gray-800/70
        text-white shadow-md"
    >
      <div className="font-semibold px-4 py-2 bg-gray-900/70">
        Let’s Draw Together
      </div>
      {loggedIn && (
        <button
          className="font-semibold hover:text-amber-300 transition"
          onClick={deleteMyCookieAction}
        >
          Logout
        </button>
      )}
    </nav>
  );
};
