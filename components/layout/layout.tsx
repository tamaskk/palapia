import { Fragment, ReactNode } from "react";
import Navigation from './navigation';
import Footer from '../footer/footer';
import { useMainContext } from "@/lib/maincontext"
import Popup from "../popup/popup";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ( props: any ) => {

  const { requestStatus, requestError } = useMainContext();

  return (
<div className="flex flex-col min-h-screen bg-[#F1EFEF]">
  <Navigation />
  { requestError && requestStatus && <Popup message={requestError} status={requestStatus} />}
  <main className="flex-grow overflow-y-auto overflow-x-hidden min-h-screen flex flex-col items-center justify-start">{props.children}</main>
  <Footer />
</div>
  );
};

export default Layout;
