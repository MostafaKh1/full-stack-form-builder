import { ReactNode } from "react";


function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
    <h1>qweqeqweqweqeqweq</h1>
     {children}
    </div>
  );
}

export default Layout;