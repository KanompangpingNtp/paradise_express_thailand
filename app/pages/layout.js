import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SecondaryLayout = ({ children }) => {
  return (
    <div className="secondary-layout">
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default SecondaryLayout
