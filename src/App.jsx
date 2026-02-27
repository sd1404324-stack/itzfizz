// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import gsap from "gsap";

// NEW IMPORTS
import homeBg from "./assets/home.jpg";
import engineSound from "./assets/engine.mp3";
import homeVideo from "./assets/homevedio.mp4"; // ✅ VIDEO ADDED

// car imports (same as yours)
import bugatti from "./assets/bugatti.jpg";
import ferrari from "./assets/ferrari.jpg";
import audiA4 from "./assets/audi-a4.jpg";
import lamborghini from "./assets/lamborghini.jpg";
import audiR8 from "./assets/audi-r8.jpg";
import bmwI8 from "./assets/bmw-i8.jpg";
import defender from "./assets/defender.jpg";
import gWagon from "./assets/g-wagon.jpg";
import jaguarFPace from "./assets/jaguar-f-pace.jpg";
import landCruiser from "./assets/land-cruiser.jpg";
import mclaren from "./assets/mclaren.jpg";
import rangeRoverVelar from "./assets/range-rover-velar.jpg";
import rollsRoyce from "./assets/rolls-royce.jpg";
import supra from "./assets/supra.jpg";
import urus from "./assets/urus.jpg";

const heroImages = [bugatti, ferrari, audiA4, lamborghini];
const title = "DRIVE THE FUTURE".split("");

const carsData = [
  { name: "Audi A4", brand: "Audi", img: audiA4 },
  { name: "Ferrari", brand: "Ferrari", img: ferrari },
  { name: "Audi R8", brand: "Audi", img: audiR8 },
  { name: "BMW i8", brand: "BMW", img: bmwI8 },
  { name: "Bugatti", brand: "Bugatti", img: bugatti },
  { name: "Defender", brand: "Land Rover", img: defender },
  { name: "G Wagon", brand: "Mercedes", img: gWagon },
  { name: "Jaguar F Pace", brand: "Jaguar", img: jaguarFPace },
  { name: "Lamborghini", brand: "Lamborghini", img: lamborghini },
  { name: "Land Cruiser", brand: "Toyota", img: landCruiser },
  { name: "McLaren", brand: "McLaren", img: mclaren },
  { name: "Range Rover Velar", brand: "Land Rover", img: rangeRoverVelar },
  { name: "Rolls Royce", brand: "Rolls", img: rollsRoyce },
  { name: "Supra", brand: "Toyota", img: supra },
  { name: "Urus", brand: "Lamborghini", img: urus },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filter, setFilter] = useState("All");
  const [revealed, setRevealed] = useState(false);

  const heroRef = useRef(null);
  const heroCarRef = useRef(null);
  const textWrapperRef = useRef(null);
  const exploreBtnRef = useRef(null);
  const smokeRef = useRef(null);
  const glowRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null); // ✅ VIDEO REF

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Permanent bounce animation
  useEffect(() => {
    if (!loading && heroRef.current) {
      gsap.to(heroRef.current.querySelectorAll(".hero-letter"), {
        y: -30,
        duration: 0.6,
        ease: "power1.inOut",
        stagger: 0.05,
        yoyo: true,
        repeat: -1,
      });
    }
  }, [loading]);

  // Smoke animation
  useEffect(() => {
    gsap.to(smokeRef.current, {
      x: 200,
      opacity: 0,
      duration: 4,
      repeat: -1,
      ease: "power1.out",
    });
  }, []);

  const handleCarClick = () => {
    const tl = gsap.timeline();

    if (!revealed) {
      audioRef.current.play();

      // Background image
      tl.to(heroRef.current, {
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        duration: 1,
      });

      // Show video
      tl.to(videoRef.current, {
        opacity: 1,
        duration: 1,
      }, 0);

      tl.to(textWrapperRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
      }, 0);

      tl.to(heroCarRef.current, {
        x: "75vw",
        duration: 2,
        ease: "power2.inOut",
      }, 0);

      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1.5,
        duration: 0.5,
      }, 0);

      setRevealed(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      tl.to(heroRef.current, {
        backgroundImage: "none",
        backgroundColor: "black",
        duration: 1,
      });

      // Hide video
      tl.to(videoRef.current, {
        opacity: 0,
        duration: 1,
      }, 0);

      tl.to(heroCarRef.current, {
        x: 0,
        duration: 2,
        ease: "power2.inOut",
      }, 0);

      tl.to(textWrapperRef.current, {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1,
      }, 0);

      tl.to(glowRef.current, {
        opacity: 0.4,
        scale: 1,
        duration: 0.5,
      }, 0);

      setRevealed(false);
    }
  };

  const filteredCars =
    filter === "All"
      ? carsData
      : carsData.filter((car) => car.brand === filter);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-4xl font-bold animate-pulse">
        MOTION X
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full scroll-smooth">

      {/* NAVBAR */}
      <nav className="fixed w-full backdrop-blur-lg bg-white/5 border-b border-white/10 px-10 py-5 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold tracking-widest">MOTION X</h1>
        <div className="space-x-6 hidden md:block">
          <a href="#home">Home</a>
          <a href="#cars">Cars</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        id="home"
        className="h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden bg-black"
      >

        {/* VIDEO BACKGROUND */}
        <video
          ref={videoRef}
          src={homeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 z-0"
        />

        <audio ref={audioRef} src={engineSound} />

        {/* Smoke */}
        <div
          ref={smokeRef}
          className="absolute bottom-32 left-10 w-40 h-40 bg-gray-400 opacity-30 blur-3xl rounded-full"
        />

        <div
          ref={textWrapperRef}
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          <h1 className="text-6xl md:text-7xl font-bold flex flex-wrap justify-center gap-2">
            {title.map((letter, i) => (
              <span
                key={i}
                className="hero-letter w-12 h-20 inline-block font-bold text-gray-200"
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Car */}
        <div
          ref={heroCarRef}
          onClick={handleCarClick}
          className="absolute bottom-40 left-0 w-80 cursor-pointer z-20"
        >
          <img
            src="https://pngimg.com/d/porsche_PNG10624.png"
            alt="Hero Car"
            className="w-full"
          />
        </div>

        {/* Headlight Glow */}
        <div
          ref={glowRef}
          className="absolute bottom-44 left-60 w-32 h-10 bg-yellow-300 blur-2xl rounded-full opacity-40"
        />

        <button
          ref={exploreBtnRef}
          className="mt-20 px-10 py-4 bg-white text-black rounded-full font-semibold cursor-pointer z-20"
        >
          Explore Collection
        </button>
      </section>

      {/* CARS SECTION */}
      <section id="cars" className="px-12 py-20 bg-black">
        <h2 className="text-4xl text-center mb-10">Luxury Collection</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", ...new Set(carsData.map((c) => c.brand))].map((brand, i) => (
            <button
              key={i}
              onClick={() => setFilter(brand)}
              className={`px-6 py-2 rounded-full border ${
                filter === brand
                  ? "bg-white text-black"
                  : "border-white text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredCars.map((car, i) => (
            <div
              key={i}
              onClick={() => setSelectedCar(car)}
              className="bg-gray-900 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={car.img} alt={car.name} className="h-56 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl max-w-md relative">
            <FaTimes
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setSelectedCar(null)}
            />
            <img src={selectedCar.img} alt={selectedCar.name} className="rounded-xl mb-4" />
            <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
        © 2026 Motion X Studio
      </footer>
    </div>
  );
}