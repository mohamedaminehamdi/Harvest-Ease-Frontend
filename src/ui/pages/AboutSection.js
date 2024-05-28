import React, {useState, useEffect, useRef} from 'react'

function Holder({imagePosition, textPosition, text, title,}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  
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

    if(imagePosition==='left' && textPosition==='right')
    return (
        
              <div ref={ref} className={`flex flex-col contain-content w-1/2 p-4 transition-opacity duration-1000 ${isVisible ? 'animate-dropOnce opacity-100' : 'opacity-0'}`}>
                <p className='text-center font-bold text-fallBrown'>{title}</p>
                <div className='flex flex-row content-contain w-full h-full items-center justify-center text-white'>
                  <div className='h-20 w-3/5 rounded-full bg-slate-100 '></div>
                  <div className='ml-20 mt-10'>{text}</div>
                </div>
              </div>
    )

    else if (imagePosition==='right' && textPosition==='left') {
      return (
        <div ref={ref} className={`flex flex-col contain-content w-1/2 p-4 text-white ml-auto transition-opacity duration-1000 ${isVisible ? 'animate-dropOnce opacity-100' : 'opacity-0'}`}>
          <p className='text-center font-bold text-fallBrown'>{title}</p>
          <div className='flex flex-row content-contain w-full h-full items-center justify-center text-white'>
            <div className='mr-20 mt-10' >{text}</div>
            <div className='h-20 w-3/5 rounded-full bg-slate-100 ' ></div>
          </div>
        </div>
      )
    }
}

function AboutUdSection() {
  

  return (
    
    <div className='h-full w-full bg-leafGreen relative '>
      <Holder  title={'Overview'} imagePosition={'left'} textPosition={'right'} text={"At HarvestEase, we're passionate about empowering farmers with the power of artificial intelligence (AI). We understand the challenges you face – unpredictable weather, fluctuating markets, and the ever-growing demand for sustainable practices"}/>
      <Holder   title={'Why Choose Us'} imagePosition={'right'} textPosition={'left'} text={'Unleash the power of AI for your farm. HarvestEase offers cutting-edge, data-driven solutions to optimize yields, reduce costs, and minimize risks.  Our personalized approach ensure you get the most out of AI farming'}/>
      <svg 
        className='w-full z-0 absolute bottom-0 left-0' 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
      >
        <path 
          fill="#C4D4AC" 
          fill-opacity="1" 
          d="M0,0L18.5,26.7C36.9,53,74,107,111,122.7C147.7,139,185,117,222,138.7C258.5,160,295,224,332,250.7C369.2,277,406,267,443,234.7C480,203,517,149,554,160C590.8,171,628,245,665,272C701.5,299,738,277,775,240C812.3,203,849,149,886,128C923.1,107,960,117,997,149.3C1033.8,181,1071,235,1108,256C1144.6,277,1182,267,1218,245.3C1255.4,224,1292,192,1329,186.7C1366.2,181,1403,203,1422,213.3L1440,224L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        >

        </path>
      </svg>
    </div>
  )
}

export default AboutUdSection