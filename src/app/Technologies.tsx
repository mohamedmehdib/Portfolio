import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const tech1 = [
  { src: "/html5.png", name: "Html" },
  { src: "/css3.png", name: "Css" },
  { src: "/sass.png", name: "Sass" },
  { src: "/js.png", name: "JavaScript" },
  { src: "/ts.webp", name: "TypeScript" },
  { src: "/nodejs.png", name: "Node js" },
  { src: "/reactjs.png", name: "React js" },
  { src: "/nextjs.svg", name: "Next js" },
  { src: "/python.jpg", name: "Python" },
];
const tech2 = [
  { src: "/postman.png", name: "Postman" },
  { src: "/mamp.png", name: "Mamp" },
  { src: "/social-square.jpg", name: "Tailwind" },
  { src: "/strapi.png", name: "Strapi" },
  { src: "/supabase.png", name: "Supabase" },
  { src: "/firebase.png", name: "Firebase" },
  { src: "/flet.svg", name: "Flet" },
  { src: "/npm.png", name: "Npm" },
];

const Technologies = () => {
  return (
    <div className="text-zinc-600 bg-gray-300 py-10 px-4 md:px-24 font-sans">
      <h1 className="text-center mb-10 text-3xl md:text-5xl">Technologies</h1>

      <div className="stock-ticker font-medium text-sm py-2.5 space-y-3 overflow-hidden select-none">
        <Marquee speed={50} gradient={false} pauseOnHover>
          <div className="flex">
            {tech1.map((item, index) => (
              <div key={index} className="flex-shrink-0 mx-3 md:mx-6 text-center">
                <Image
                  width={500}
                  height={500}
                  alt={item.name}
                  src={item.src}
                  className="p-2 md:p-4 w-20 h-20 md:w-32 md:h-32 hover:p-1.5 duration-200 rounded-lg bg-white"
                />
                <p className="text-sm md:text-lg mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee speed={50} gradient={false} direction="right" pauseOnHover>
          <div className="flex">
            {tech2.map((item, index) => (
              <div key={index} className="flex-shrink-0 mx-3 md:mx-6 text-center">
                <Image
                  width={500}
                  height={500}
                  alt={item.name}
                  src={item.src}
                  className="p-2 md:p-4 w-20 h-20 md:w-32 md:h-32 hover:p-1.5 duration-200 rounded-lg bg-white"
                />
                <p className="text-sm md:text-lg mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Technologies;
