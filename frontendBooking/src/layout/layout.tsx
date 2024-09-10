import Header from "../components/Header";
import Footer from "../components/Footer";
// import { ReactNode } from "react";


// an interface to chack type of children passed to layer component
interface Props {
  children : React.ReactNode
}

function Layout({children}:Props) {
  return (
    <div className="flex  flex-col min-w-[575px] min-h-screen">
      <Header />
      
      <main className="w-full min-h-screen mb-20 mx-auto">
      {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
