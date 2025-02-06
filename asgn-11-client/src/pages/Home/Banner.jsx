import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Banner = () => {
  return (

<section className="relative h-[400px] ">


<video
        className="object-cover w-full h-[400px]"
        preload="auto"
        playsInline
        autoPlay
        muted
        loop
        poster="https://github.com/hasanrafi1122/photos/blob/main/ph-assignment/a11/chicken-curry.jpg?raw=true"
      >
        <source
          src="https://video-a11.netlify.app/food-1080.mp4"
          type="video/mp4"
        />
      </video>


      <div className="absolute inset-0 bg-opacity-50 bg-[#283651]">

        <div className="relative z-[1] flex justify-center items-center flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className=" mt-[10%] dark:text-emerald-200 flex flex-col items-center gap-4 text-center text-white"
          >
            <h1 className="text-4xl font-bold md:text-4xl">
              Delight Your Taste Buds at FlavorFusion
            </h1>
            <p className="text-sm md:text-sm">
              Discover our extensive menu featuring the finest dishes from around the world. 
              Experience culinary excellence at its best.
            </p>
            <Link 
              to="/allfood" 
              className="text-white transition duration-300 rounded-lg dark:text-emerald-200 btn bg-zinc-500"
            >
              Explore Foods
            </Link>
          </motion.div>
        </div>
      </div>

    </section>


  );
};

export default Banner;