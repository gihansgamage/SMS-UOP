import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "../components/MyNavbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
        
        <MyNavbar />
        <Cards />
        <Footer />
    </div>
  );
}


