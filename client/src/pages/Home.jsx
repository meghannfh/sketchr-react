import { BsChevronCompactDown } from 'react-icons/bs';

const Home = () => {
  return (
      <div className="h-screen relative grid justify-center place-content-center text-slate-800">
        <div className="max-w-[600px]">
          <div className="mb-10 font-poppins flex flex-col items-center font-bold text-4xl md:text-6xl lg:text-7xl">
              <h1 className="animate-delayed fadeInUp1">Consistency <span className="font-lobster text-teal-500">first</span></h1>
              <h2 className="animate-delayed fadeInUp2">Motivation <span className="font-lobster text-pink-500">later</span></h2>
          </div>
          <p className="animate-delayed fadeInUp3 px-4 md:text-xl font-extralight text-center mb-5"><span className="font-bold">Sketchr</span> is your online art journal meant to help you form the habit of drawing consistently and looking back at your progress.</p>
          <h3 className="animate-delayed fadeInUp4 text-lg md:text-2xl text-center font-semibold">No pressure. No obligations. No distractions.</h3>
        </div>

        <span className="absolute bottom-5 flex justify-center w-full">
          <button className="flex flex-col items-center justify-center explore-btn-animated">
          <p>explore</p> 
          <i className="text-3xl"><BsChevronCompactDown/></i>
          </button>
        </span>
      </div>
    
  )
}

export default Home