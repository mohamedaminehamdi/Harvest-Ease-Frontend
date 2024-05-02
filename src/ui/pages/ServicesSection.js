import SliderComponent from "../components/Home/SliderComponent";
import PlantScannerImage from '../../assets/PlantScannerImage.jpg'
import ChatbotImage from '../../assets/ChatbotImage.jpg'
import DashboardImage from '../../assets/DashboardImage.jpg'


import React, {useRef, useEffect, useState} from 'react'

function SlideHolder({image,text}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting);
          },
          { threshold: 0.1 }
        );
  
        if (ref.current) {
          observer.observe(ref.current);
        }
  
        return () => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        };
      }, []);
      
    return (
        <div ref={ref} className={`w-full h-full flex flex-col items-center justify-center rounded-full animate-bounceOnce bg-soldierGreen transition-opacity duration-500 ${isVisible ? 'animate-bounceOnce opacity-100' : 'opacity-0'}`}>
            <div className=" h-60 w-60 rounded-full overflow-hidden ">
                <img src={image} alt="slide" className='w-full h-full object-cover'/>
            </div>
            <p className="text-center font-bold py-4 px-auto w-1/2 contain-content">{text}</p>

        </div>
    )
}
function ServicesSection() {
    const slides=[
    <SlideHolder image={DashboardImage} text={'You need to optimize your production? The resources tracker will walk you through making the right calculations'}/>,
    <SlideHolder image={PlantScannerImage} text={'Our plant health scanner will help you detect hidden diseases inyour plants'}/>,
    <SlideHolder image={ChatbotImage} text={'You can ask our chatbot any question farming-related'}/>,


]
  return (
    <div className="w-full h-full bg-mustardGreen">
        <SliderComponent autoSlide={false} autoSlideInterval={1000} slides={slides}/>
    </div>
  )
}

export default ServicesSection