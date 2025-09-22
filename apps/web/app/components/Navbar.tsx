"use client";

import { UseUser } from "../hooks/UseUser";

export const Navbar = () => {
  const { state, dispatch } = UseUser();
  const logout = () => {
    dispatch({
      type: "CLEAR_USER",
    });
  };
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
                    flex items-center justify-between
                    h-16 px-6 
                    backdrop-blur-md bg-gray-800/70
                    text-white shadow-md"
    >
      <div className="font-semibol padding 1rem bg-gray-900/70 ">
        Lets Draw together
      </div>
      <button
        className="font-semibold hover:text-amber-300 transition"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};
