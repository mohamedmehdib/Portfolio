"use client"
import React from 'react'
import Image from 'next/image'
import { ReactTyped } from "react-typed";
import { Red_Hat_Display } from 'next/font/google';
const ms_madi = Red_Hat_Display({ subsets: ['latin'] ,weight:'500'});


import { useEffect, useState } from 'react';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="home" className={ms_madi+` md:h-screen bg-zinc-300 text-zinc-600 flex md:flex-row flex-col-reverse justify-between items-center md:p-10 p-5 pt-24 md:pt-0`}>
      <div className="md:w-1/2 pt-10">
        <p className="md:text-4xl sm:text-3xl text-2xl font-medium">
          I&apos;m{' '}
          {isClient && (
            <ReactTyped
              className="text-zinc-500 md:text-4xl text-3xl"
              strings={["Mohamed Mehdi"]}
              typeSpeed={70}
              loop
              backSpeed={20}
              cursorChar="|"
            />
          )}
        </p>
        <p className="text-base md:text-2xl py-5 text-justify">
        Hi, I&apos;m a web developer passionate about building responsive, dynamic, and user-friendly websites. I specialize in modern frameworks like React, Next.js, and Node.js, combined with Tailwind CSS for sleek designs. With a focus on clean, efficient code, I deliver scalable solutions tailored to client needs. I thrive on solving challenges, learning new technologies, and collaborating to bring creative ideas to life. Let&apos;s build something amazing together!
        </p>
      </div>
      <div className="md:w-1/2 pb-14 md:pb-0">
        <Image src="/a.jpg" alt="image" width={400} height={400} className="mx-auto my-auto rounded-full" />
      </div>
    </div>
  );
}
