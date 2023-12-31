import { Fragment, ReactNode } from "react";
import Navigation from './navigation';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ( props: any ) => {
  return (
<div className="flex flex-col min-h-screen bg-[#F1EFEF]">
  <Navigation />
  <main className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center">{props.children}</main>
</div>
  );
};

export default Layout;
