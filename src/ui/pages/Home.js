import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Plant from "../../assets/Plant.jpg";
import AboutUsSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically
  const handleStartNow = () => {
    navigate("/login");
  };
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <div className="h-full w-full overflow-auto">
      <div className="bg-leafGreen h-full w-full flex flex-col py-7 px-20 relative">
        <svg
          className="block absolute top-0 left-0 w-full z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 327"
        >
          <path
            fill="#c6d6a8"
            fill-opacity="1"
            d="M0,320L26.7,314.7C53.3,309,107,299,160,282.7C213.3,267,267,245,320,208C373.3,171,427,117,480,112C533.3,107,587,149,640,154.7C693.3,160,747,128,800,112C853.3,96,907,96,960,101.3C1013.3,107,1067,117,1120,149.3C1173.3,181,1227,235,1280,240C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 649"
          className="w-full h-4/5 absolute bottom-0 right-0 shadow-md"
        >
          <path
            d="M 50 650 Q 150 550 100 450 Q 100 400 200 300 Q 400 0 250 100 Q 200 200 500 50 Q 600 0 700 0 Q 725 0 800 0 "
            fill="none"
            stroke="#535A2D"
            strokeWidth="2"
          />
        </svg>
        <nav className="flex flex-row h-1/6 z-10 w-full">
          <img src={Logo} alt="Logo" className="w-1/5 h-full" />
          <Link
            smooth
            to="#about-us"
            className="font-bold ml-auto hover:text-soldierGreen"
          >
            About Us
          </Link>
          <Link
            smooth
            to="#services"
            className="font-bold ml-5 mr-4 hover:text-soldierGreen"
          >
            Services
          </Link>
        </nav>
        <div className="flex flex-row relative pl-20">
          <div className="flex flex-col w-1/4 text-center mt-40 ml-40 justify-center z-10">
            <p className="text-2xl font-bold text-ceylaniteGreen text-left">
              Bringing Farmers From All Around The World, Together
            </p>
            <button
              onClick={handleStartNow} // Call the function to navigate to /login
              className="font-bold text-mustardGreen rounded-3xl p-4 w-1/2 bg-ceylaniteGreen mt-10 hover:bg-willowGreen hover:border-2 hover:border-ceylaniteGreen hover:text-ceylaniteGreen mx-auto shadow-md"
            >
              Start Now
            </button>
          </div>
          <div className="rounded-full size-72 overflow-hidden absolute right-0 top-1/4 mt-4 shadow-md">
            <img
              src={Plant}
              alt="plant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div id="about-us" className="h-full w-full">
        <AboutUsSection />
      </div>
      <div id="services" className="w-full h-full">
        <ServicesSection />
      </div>
    </div>
  );
}

export default HomePage;
