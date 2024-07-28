import { useContext } from "react"
import { Context } from "../../main"
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const {user} = useContext(Context);
  if(!user){
    return <Navigate to={"/login"} />
  }

  return (
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  )
}

export default Home