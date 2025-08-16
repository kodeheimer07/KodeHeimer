import { Link } from "react-router";
import team from "../assets/team.jpg"
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import RippleGrid from "../components/RippleGrid";
import LightRays from "../components/LightRays";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPencilRuler } from "react-icons/fa";
import { VscVscodeInsiders } from "react-icons/vsc";

const About = () => {
       
       const [isVisible,setIsVisible] = useState(true);

       useEffect(() => {
              const checkVisibility = () => {
                      const mobile = window.innerWidth < 919;
                      setIsVisible(!mobile); 
              };

              checkVisibility();
              window.addEventListener("resize",checkVisibility);
              return () => {
                   window.removeEventListener("resize",checkVisibility);
              };
       },[]);

       return(
        <div className="min-h-screen bg-black">
                  <div className='flex fixed right-1 bottom-10 gap-1 z-3000'>
                            <p className='text-gray-500 mt-2.5'>
                                   <Link to="https://wa.me/917004109936" className='bg-slate-200 px-1 rounded-md py-1'>
                                          Message
                                   </Link>
                            </p>
                            <a
                                   href='https://wa.me/917004109936'
                                   target="_blank"
                                   rel="noopener noreferrer" 
                                   className='text-white p-1 bg-green-500 rounded-full cursor-pointer'>
                                          <FaWhatsapp size={36}/>
                            </a>
                  </div>

                 
                <div style={{ position: 'relative', height: '800px', overflow: 'hidden' }}>
                      <RippleGrid
                        enableRainbow={false}
                        gridColor="#0000ff" 
                        rippleIntensity={0.01}
                        gridSize={10}
                        gridThickness={40}
                        mouseInteraction={true}
                        mouseInteractionRadius={1.8}
                        opacity={1.2} // Reduced so background doesn't block text
                      />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        zIndex: 1
                      }} className="w-[60%] fixed flex flex-col text-white items-center justify-center">
                            <h1 className="lg:text-8xl md:text-6xl text-5xl text-center font-bold drop-shadow-lg bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Who We Are</h1>
                            <p className="w-full mt-6 md:text-2xl text-xl text-center mx-auto">An innovative, technology-focused, business-driven end-to-end IT Solutions Company with a specialization in providing cost-effective custom software solutions</p>
                            <Link to="/contactus" className="flex items-center text-xl justify-center mt-10 glow-btn">KNOW MORE</Link>
                          </div>
                </div>


                <div className="relative z-20 w-full flex flex-col items-center justify-center">
                     <div className="w-[80%] pt-32">
                                   <div className="flex lg:flex-row flex-col justify-between gap-y-14">
                                   <div className="relative lg:w-[45%] w-full bg-gray-900 py-4 border border-gray-800 px-4 text-center rounded-md 
                                                    before:content-[''] before:absolute before:inset-0 before:-z-10 
                                                    before:bg-gradient-to-r before:from-green-400/40  before:to-indigo-500/40 
                                                    before:blur-2xl before:rounded-md">
                                          <h1 className="text-7xl font-bold text-center bg-gradient-to-r from-pink-200 via-cyan-500 to-indigo-300 inline-block text-transparent bg-clip-text">A Bit About Us</h1>
                                          <p className="mt-8 text-xl text-gray-400">At THECODECRAFTS, we believe that technology should not just solve problems—it should inspire, empower, and create lasting impact. We are a team of innovators, engineers, and dreamers dedicated to building intelligent, scalable, and human-centered digital solutions. From intuitive user interfaces to powerful backend systems, we blend creativity with precision to craft products that are as functional as they are beautiful.</p>
                                          <p className="mt-8 text-xl text-gray-400 md:block hidden">Our mission is simple: turn ideas into reality with code that works like magic. Whether it’s shaping seamless web experiences, optimizing complex systems, or developing future-ready platforms, we approach every project with craftsmanship, curiosity, and commitment to excellence.</p>
                                   </div>
                                   <img src={team} className="lg:w-[45%] w-full object-cover rounded-md"></img>
                                   </div>
                                   {/* <p className="mt-12 text-xl text-white">At CodeCraft, we’re not just coding—we’re crafting the future.</p> */}
                     </div>
                </div>

                <div style={{ width: '100%',  position: 'relative' }} className="mt-24 md:h-[600px] h-[1360px]">
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#00ffff"
                  raysSpeed={1.5}
                  lightSpread={!isVisible ? 8 : 0.8}
                  rayLength={!isVisible ? 20 : 2}
                  followMouse={true}
                  mouseInfluence={0.1}
                  noiseAmount={0.1}
                  distortion={0.05}
                  className="custom-rays"
                />

                <div className="text-white inset-0 absolute z-30 w-full  flex flex-col items-center mt-8">
                  <div className="w-[60%]">
                            <h2 className="text-white md:text-5xl text-4xl font-medium text-center">Meet Our Team</h2>
                           <p className="text-center text-xl mt-8">We are a team of passionate innovators fueled by curiosity and united by creativity who bring ideas to life through code</p>
                  </div>
                  <div className="flex w-[90%] mt-18 md:flex-row flex-col gap-y-10">
                            <div className="flex items-center justify-between flex-col gap-y-6">
                                   <div className="rounded-full border-[1px] border-red-400 w-[100px] h-[100px] flex justify-center items-center bg-red-400/10">
                                          <FaPencilRuler className="text-5xl text-red-400" />
                                   </div>
                                   <h3 className="text-xl font-bold">UI/UX Team</h3>
                                   <p className="text-center">Designers, graphic artists, and creative thinkers crafting stunning visuals and intuitive interfaces that elevate user experiences.</p>
                            </div>
                             <div className="flex items-center justify-between flex-col gap-y-4">
                                   <div className="rounded-full border-[1px] border-blue-400 w-[100px] h-[100px] flex justify-center items-center bg-blue-400/10">
                                          <VscVscodeInsiders className="text-5xl text-blue-400" />
                                   </div>
                                   <h3 className="text-xl font-bold">Development Team</h3>
                                   <p className="text-center">Skilled developers and engineers turning ideas into powerful, scalable, and high-performing applications through clean and efficient code.</p>
                            </div>
                             <div className="flex items-center justify-between flex-col gap-y-4">
                                   <div className="rounded-full border-[1px] border-pink-400 w-[100px] h-[100px] flex justify-center items-center bg-pink-400/10">
                                          <FaPeopleGroup className="text-5xl text-pink-400" />
                                   </div>
                                   <h3 className="text-xl font-bold">Maintenance Team</h3>
                                   <p className="text-center">Dedicated experts ensuring your systems run smoothly with regular updates, performance optimization, and reliable technical support.</p>
                            </div>
                  </div>
               </div>


              </div>



        </div>
       )
}

export default About

