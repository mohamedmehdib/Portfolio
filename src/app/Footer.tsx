"use client"
import { useEffect, useState } from 'react';
import { Ms_Madi } from 'next/font/google';

const a = Ms_Madi({subsets: ['latin'],weight:'400'}) ;

export default function Footer() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    setFontLoaded(true);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <div className="text-center border-t-2 border-gray-500 py-10 md:space-y-14 space-y-8 bg-zinc-300 text-gray-600">
      <div className={a.className + " text-5xl sm:text-6xl md:text-8xl"}>
        Mohamed Mehdi
      </div>
      <ul className="text-2xl sm:text-3xl md:text-4xl space-x-5">
        <a href="https://www.facebook.com/profile.php?id=100092691316487" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-blue-700 duration-300 uil uil-facebook"></i>
        </a>
        <a href="https://www.instagram.com/meeeehhdiiiiiii/" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-purple-700 duration-300 uil uil-instagram"></i>
        </a>
        <a href="https://wa.me/21652975473" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-green-700 duration-300 uil uil-whatsapp"></i>
        </a>
      </ul>
      <div className='md:text-lg'>
        Copyrights Ⓒ 2024 . All rights reserved
      </div>
    </div>
  );
}