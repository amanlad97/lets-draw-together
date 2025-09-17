import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <main
        className="relative max-w-md w-full rounded-2xl
                   bg-gray-800/70 backdrop-blur-md text-white
                   shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                   p-10 flex flex-col items-center gap-6
                   border border-gray-700/40"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
