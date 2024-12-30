"use client";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { Ms_Madi } from "next/font/google";
const e = Ms_Madi({ subsets: ["latin"], weight: "400" });
import { Red_Hat_Display } from "next/font/google";
const ul = Red_Hat_Display({ subsets: ["latin"], weight: "500" });

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`fixed text-zinc-600 bg-gray-300 flex justify-between items-center h-20 md:h-24 w-screen lg:text-3xl md:text-2xl lg:px-12 md:px-8 px-4 z-10 transition-all duration-300 ${
        scroll ? "top-0 shadow-xl " : "-top-20"
      } ${ul.className}`}
    >
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />

      <span className={`${e.className} lg:text-5xl md:text-4xl text-3xl duration-300`}>Mohamed Mehdi</span>

      <ul className="hidden flex-row space-x-6 rounded-xl md:relative absolute md:flex">
        <ScrollLink
          to="home"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          className="hover:scale-125 hover:px-5 cursor-pointer my-auto duration-300"
        >
          <i className="uil uil-estate"></i> Home
        </ScrollLink>
        <ScrollLink
          to="projects"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="hover:scale-125 hover:px-5 cursor-pointer my-auto duration-300"
        >
          <i className="uil uil-presentation-play"></i> Projects
        </ScrollLink>
        <ScrollLink
          to="contact"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="hover:scale-125 hover:px-5 cursor-pointer my-auto duration-300"
        >
          <i className="uil uil-envelope"></i> Contact
        </ScrollLink>
      </ul>

      <button onClick={() => setActive(!active)} className="block md:hidden text-3xl">
        {!active ? <i className="uil uil-bars"></i> : <i className="uil uil-multiply"></i>}
      </button>

      <ul
        className={`shadow-xl duration-500 md:hidden bg-gray-300 flex flex-col space-y-5 text-center absolute top-20 md:top-24 w-full text-lg py-5 left-0 ${
          !active ? "-translate-x-full" : ""
        }`}
      >
        <ScrollLink to="home" spy={true} smooth={true} offset={0} duration={500}>
          <i className="uil uil-estate"></i> Home
        </ScrollLink>
        <ScrollLink to="projects" spy={true} smooth={true} offset={50} duration={500}>
          <i className="uil uil-presentation-play"></i> Projects
        </ScrollLink>
        <ScrollLink to="contact" spy={true} smooth={true} offset={50} duration={500}>
          <i className="uil uil-envelope"></i> Contact
        </ScrollLink>
      </ul>
    </div>
  );
}
