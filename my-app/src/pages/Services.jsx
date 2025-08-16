import service from '../assets/service.jpg'
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import cart from '../assets/cart.jpg'
import development from '../assets/development.jpg'
import Footer from '../components/Footer';
import MovableImage from '../components/MovableImage';
import { FaWhatsapp } from "react-icons/fa6";
import fullstack2 from "../assets/fullStack2.jpg"
import frontend from "../assets/frontend2.jpg"
import backend from "../assets/backend2.jpg"
import ui from "../assets/ui.jpg"
import logo from "../assets/logo.png"
import Orb from '../components/Orb';


const Services = () => {
        
       const [isVisible,setIsVisible] = useState(true);
       const [isOpen,setIsOpen] = useState(true);
       
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
       

       useEffect(() => {
               const checkScroll = () => {
                        const SCROLL_TRIGGER = 37;
                        const scrolledEnough = window.scrollY > SCROLL_TRIGGER;
                        setIsOpen(!scrolledEnough);
               };

               checkScroll();
               window.addEventListener("scroll",checkScroll);
               return () => {
                     window.removeEventListener("scroll",checkScroll);
               }
       },[]);

       return(

          <div className="w-full">
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
                     
                     <div className='relative w-full md:h-[700px] h-[800px]'>
                        <Orb
                          hoverIntensity={0}
                          rotateOnHover={true}
                          hue={0}
                          forceHoverState={false}
                        />
                     </div>

                     <div className='bg-black text-white w-full pb-6 flex flex-col justify-center items-center'>
                              <h2 className='text-6xl font-bold mt-16 text-center'>Our Services</h2>
                              <div className='w-[80%] h-full mt-16 flex gap-y-10 md:flex-row flex-col justify-between'>
                                      <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex  justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={frontend} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>Frontend</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>KODEHEIMER</Link>, we transform ideas into visually stunning digital realities. Our frontend development service is where creativity meets precision — delivering sleek, responsive, and high-performing user interfaces that make your brand unforgettable.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 hover:bg-teal-700 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div>

                                      <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={backend} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>Backend</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>KODEHEIMER</Link>, we build the powerhouse behind your digital success. Our backend development service is all about strength, stability, and scalability — creating the invisible engine that keeps your application running flawlessly, 24/7.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div>
                              </div>


                              <div className='w-[80%] h-full mt-16 flex gap-y-10 md:flex-row flex-col justify-between'>
                                      <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={fullstack2} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>Full Stack</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>KODEHEIMER</Link>, we specialize in building complete ecosystems — not just standalone parts. Our full stack team collaborates closely with UI/UX designers, frontend engineers, and backend developers to ensure consistency, reliability, and user satisfaction at every touchpoint.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div>

                                      <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={cart} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>E-Commerce</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>KODEHEIMER</Link>, we understand that every click matters. That’s why we focus on speed, mobile responsiveness, and user-friendly navigation — all wrapped in a design that reflects your brand’s unique identity. We integrate trusted platforms like Shopify, WooCommerce, and custom solutions, giving you full control and flexibility over your store.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div>
                              </div>

                              <div className='w-[80%] h-full mt-16 flex gap-y-10 md:flex-row flex-col justify-between'>
                                      <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={ui} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>UI/UX</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>KODEHEIMER</Link>, we believe that great design is the bridge between your business and your customers. We dig deep into user behavior, map intuitive flows, and bring concepts to life through wireframes, prototypes, and high-fidelity visuals that speak your brand's language.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div>

                                      {/* <div className='md:w-[45%] w-full pb-10 bg-slate-800/60 backdrop-blur-md flex justify-center items-center rounded-md
                                      border-[1px] border-slate-700 hover:border-slate-600' >
                                             <div className='w-[90%]'>
                                               <div className='w-full h-[300px] mt-5 overflow-hidden rounded-md'>
                                               <img src={frontend} className=' rounded-md w-full h-full transition-transform duration-500 ease-in-out hover:scale-105'></img>
                                               </div>
                                               <h3 className='font-extrabold text-2xl mt-3 text-cyan-500'>Frontend</h3>
                                               <p className='text-gray-200/70 mt-3 text-xl pb-10'>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we transform ideas into visually stunning digital realities. Our frontend development service is where creativity meets precision — delivering sleek, responsive, and high-performing user interfaces that make your brand unforgettable.</p>
                                               <Link to="/contactus" className='rounded-md bg-teal-600 p-3 text-xl border-[1px] border-emerald-300'>
                                                      Get Quote
                                               </Link>
                                             </div>
                                      </div> */}
                              </div>
                     </div>
                     
          </div>
       )
}

export default Services;





// <div 
//                         style={{
//                         backgroundImage:`url(${service})`,
//                         backgroundSize:"cover",
//                         backgroundPosition:"center",
//                         backgroundRepeat:"no-repeat",
//                         height:"700px",
//                         width:"100%",
//                         position: "fixed",
//                         zIndex:-50,
//                         top:"0"
//                         }} className={`${isVisible ? "block" : "hidden"}`}>      
//                      </div>

//                      <div className={`w-full h-[660px]  bg-[rgba(96,165,250,0.4)]  flex flex-col items-center ${isVisible ? "block" : "hidden"}`}>
                      

                     
//                     </div>

//                     <div className='bg-white z-20 relative flex flex-col justify-center items-center'>
//                             <div className=' mt-24 w-[80%] flex md:flex-row flex-col gap-y-8 justify-between items-center'>
//                                      <img src={frontend} className='md:w-[40%] w-full object-cover rounded-md'></img>
//                                      <div className='md:w-[52%] w-full'>
//                                            <h2 className='md:text-6xl text-4xl lg:font-bold font-medium'>Frontend Development</h2>
//                                            <div className='mt-8 text-gray-600 text-xl'>
//                                                   <p>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we transform ideas into visually stunning digital realities. Our frontend development service is where creativity meets precision — delivering sleek, responsive, and high-performing user interfaces that make your brand unforgettable.</p>
//                                                   <p className='mt-8'>We don't just build websites and applications; we create digital journeys that captivate users and drive engagement. Whether you're launching a new product or revamping your online presence, our team crafts interfaces that align perfectly with your brand's voice and vision.</p>
//                                                   <p className='mt-8'>Every pixel we deliver is designed with purpose — fast, intuitive, and optimized for every screen. With seamless animations, modern design trends, and a user-first approach, we ensure your platform not only looks extraordinary but feels effortless to use.</p>
//                                                   <p className='mt-8'>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we believe your frontend is your brand’s first impression — and we make sure it’s powerful. Let us help you stand out in a crowded digital space with a frontend that connects, converts, and impresses.</p>
//                                            </div>
//                                            <button className="mt-6 text-white p-2 px-6 bg-blue-400 rounded-full hover:bg-gray-400">GET A QUOTE</button>
//                                      </div>
//                             </div>
                            
//                             <div className=' mt-24 w-[80%] flex md:flex-row flex-col-reverse gap-y-8 justify-between items-center'>
//                                      <div className='md:w-[52%] w-full'>
//                                            <h2 className='md:text-6xl text-4xl lg:font-bold font-medium'>Backend Development</h2>
//                                            <div className='mt-8 text-gray-600 text-xl'>
//                                                   <p>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we build the powerhouse behind your digital success. Our backend development service is all about strength, stability, and scalability — creating the invisible engine that keeps your application running flawlessly, 24/7.</p>
//                                                   <p className='mt-8'>We don’t just develop code — we architect reliable ecosystems tailored to your business logic. Whether you're running an e-commerce store, a scalable SaaS platform, or a dynamic content hub, our backend solutions ensure your data flows securely, your servers stay responsive, and your users enjoy seamless performance.</p>
//                                                   <p className='mt-8'>From building powerful APIs to integrating third-party services, we design backend systems that are robust, efficient, and future-proof. Speed, security, and stability aren’t just features — they’re the foundation of every line we write.</p>
//                                                   <p className='mt-8'>When you partner with <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, you’re choosing backend systems that grow with your business. We focus on clean, maintainable code and smart architecture that supports everything from startups to enterprise-level operations.</p>
//                                                   <p className='mt-8'>Your frontend may steal the spotlight — but it’s the backend that makes the magic happen. Let us power your digital product with a backend that’s as intelligent as it is invisible.</p>
//                                            </div>
//                                            <button className="mt-6 text-white p-2 px-6 bg-blue-400 rounded-full hover:bg-gray-400">GET A QUOTE</button>
//                                      </div>
//                                      <img src={backend} className='md:w-[40%] w-full object-cover rounded-md'></img>
//                             </div>

//                             <div className=' mt-24 w-[80%] flex md:flex-row flex-col gap-y-8 justify-between items-center'>
//                                      <img src={fullstack2} className='md:w-[40%] w-full object-cover rounded-md'></img>
//                                      <div className='md:w-[52%] w-full'>
//                                            <h2 className='md:text-6xl text-4xl lg:font-bold font-medium'>Full Stack Development</h2>
//                                            <div className='mt-8 text-gray-600 text-xl'>
//                                                   <p>When you need end-to-end digital solutions that just work — front to back — we deliver. Our Full Stack Development service brings together the best of both worlds: stunning, responsive frontends paired with powerful, secure backends that scale with your vision.</p>
//                                                   <p className='mt-8'>From initial concept to final deployment, we handle every layer of your digital product with precision and expertise. Whether you're building a web platform, SaaS product, or a dynamic business application, our full stack approach ensures seamless performance, fast load times, and flawless functionality across devices.</p>
//                                                   <p className='mt-8'>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we specialize in building complete ecosystems — not just standalone parts. Our full stack team collaborates closely with UI/UX designers, frontend engineers, and backend developers to ensure consistency, reliability, and user satisfaction at every touchpoint.</p>
//                                                   <p className='mt-8'>We use modern frameworks, clean code practices, and future-ready architectures to deliver products that are robust, scalable, and easy to maintain. You get faster development, better coordination, and one team accountable for the whole picture.</p>
//                                                   <p className='mt-8'>Launch smarter, grow faster, and scale seamlessly with our full stack development expertise. We don’t just build apps — we build the entire digital foundation your business can thrive on.</p>
//                                            </div>
//                                            <button className="mt-6 text-white p-2 px-6 bg-blue-400 rounded-full hover:bg-gray-400">GET A QUOTE</button>
//                                      </div>
//                             </div>

//                             <div className=' mt-24 w-[80%] flex md:flex-row flex-col-reverse gap-y-8 justify-between items-center'>
//                                      <div className='md:w-[52%] w-full'>
//                                            <h2 className='md:text-6xl text-4xl lg:font-bold font-medium'>E-Commerce Development</h2>
//                                            <div className='mt-8 text-gray-600 text-xl'>
//                                                   <p>In the fast-paced world of online shopping, your digital storefront needs more than just good looks — it needs power, performance, and a seamless user journey. Our E-Commerce development service is built to help you sell smarter, scale faster, and deliver unforgettable customer experiences.</p>
//                                                   <p className='mt-8'>From sleek product pages to secure payment gateways, we craft e-commerce platforms that convert visitors into loyal buyers. Whether you're a boutique brand or an expanding enterprise, we tailor every feature — cart systems, inventory management, analytics, and more — to suit your business goals.</p>
//                                                   <p className='mt-8'>At THECODECRAFTS, we understand that every click matters. That’s why we focus on speed, mobile responsiveness, and user-friendly navigation — all wrapped in a design that reflects your brand’s unique identity. We integrate trusted platforms like Shopify, WooCommerce, and custom solutions, giving you full control and flexibility over your store.</p>
//                                                   <p className='mt-8'>Our team ensures your online business is ready to handle high traffic, process smooth checkouts, and adapt to future growth with ease. From launching your first store to optimizing an existing one, we’re here to support your digital retail journey every step of the way.</p>
//                                                   <p className='mt-8'>Let us build an e-commerce experience your customers will love — and your competitors will envy.</p>
//                                            </div>
//                                            <button className="mt-6 text-white p-2 px-6 bg-blue-400 rounded-full hover:bg-gray-400">GET A QUOTE</button>
//                                      </div>
//                                      <img src={cart} className='md:w-[40%] w-full object-cover rounded-md'></img>
//                             </div>

//                             <div className=' mt-24 w-[80%] flex md:flex-row flex-col gap-y-8 justify-between items-center mb-20'>
//                                      <img src={ui} className='md:w-[40%] w-full object-cover rounded-md'></img>
//                                      <div className='md:w-[52%] w-full'>
//                                            <h2 className='md:text-6xl text-4xl lg:font-bold font-medium'>UI/UX DESIGN</h2>
//                                            <div className='mt-8 text-gray-600 text-xl'>
//                                                   <p>In today’s digital world, users don’t just expect functionality — they demand a seamless, intuitive, and visually delightful experience. That’s where we come in. Our UI/UX design service focuses on creating digital products that feel effortless to use and impossible to forget.</p>
//                                                   <p className='mt-8'>We blend creativity with strategy to design user interfaces that not only look stunning but guide users through meaningful interactions. Every screen, scroll, and swipe is thoughtfully crafted to reflect your brand’s identity while keeping the user at the center of it all.</p>
//                                                   <p className='mt-8'>At <Link to="/" className='text-blue-400'>THECODECRAFTS</Link>, we believe that great design is the bridge between your business and your customers. We dig deep into user behavior, map intuitive flows, and bring concepts to life through wireframes, prototypes, and high-fidelity visuals that speak your brand's language.</p>
//                                                   <p className='mt-8'>From startups launching their first product to established businesses revamping their digital presence, we deliver UI/UX designs that drive real results — more engagement, better retention, and increased conversions.</p>
//                                                   <p className='mt-8'>Let’s create experiences that users love to return to — clean, fast, and unforgettable. Because design isn't just what it looks like; it’s how it works — and we make it work beautifully.</p>
//                                            </div>
//                                            <button className="mt-6 text-white p-2 px-6 bg-blue-400 rounded-full hover:bg-gray-400">GET A QUOTE</button>
//                                      </div>
//                             </div>

//                             <MovableImage></MovableImage>

//                              <div className='bg-white flex w-full justify-center items-center mb-12'>
//                              <div className='w-[80%] flex justify-center items-center flex-col mt-12'>
//                                     <h2 className='text-6xl font-bold text-slate-800'>Reach Us</h2>
//                                     <p className='text-center mt-12 text-xl text-gray-600'>Driven by customer focus and powered by the latest emerging technologies, we deliver solutions that never compromise on quality. Every product is rigorously tested, built to perform, and offered at a price that keeps innovation accessible and affordable.</p>
//                                     <button className='mt-12 text-xl p-2 rounded-full border-1 border-slate-600 px-8 text-slate-600'>
//                                           <Link to="/contactus">Know More</Link>
//                                     </button>
//                              </div>
//                              </div> 

//                              <Footer></Footer>
//                     </div>
