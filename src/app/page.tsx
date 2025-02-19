import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Contact from "./Contact";
import Footer from "./Footer";
import Technologies from "./Technologies";
import Projects from "./Projects";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <React.StrictMode>
      <Head>
        <title>Mohamed Mehdi - Web Developer Portfolio</title>
        <meta name="description" content="Hi, I'm Mohamed Mehdi, a web developer specializing in React, JavaScript, and modern web technologies. Check out my projects and skills!" />
        <meta name="keywords" content="web developer, portfolio, React, JavaScript, frontend developer, projects" />
        <meta name="author" content="Mohamed Mehdi" />
        <meta property="og:title" content="Your Name - Web Developer Portfolio" />
        <meta property="og:description" content="Hi, I'm Mohamed Mehdi, a web developer specializing in React, JavaScript, and modern web technologies. Check out my projects and skills!" />
        <meta property="og:image" content="https://www.mohamedmehdi.me/a.jpg" />
        <meta property="og:url" content="https://www.mohamedmehdi.me" />
        <link rel="canonical" href="https://www.mohamedmehdi.me" />
      </Head>
      <div>
        <Navbar />
        <Hero />
        <Projects />
        <Technologies />
        <Contact />
        <Footer />
      </div>
    </React.StrictMode>
  );
}