import { Link } from "react-router";
import Footer from "../components/Footer";
import { useEffect, useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { FaWhatsapp } from "react-icons/fa6";
import Galaxy from "../components/Galaxy";

const ContactUs = () => {
         const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_q5lq92j', 'template_73fjq6l', form.current, {
        publicKey: 'hikQRv9nIQUWowDls',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

       return(
        <div className="min-h-screen">
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

                 <div className="relative h-[800px] w-full">
                   <Galaxy 
                     mouseRepulsion={true}
                     mouseInteraction={true}
                     density={1.5}
                     glowIntensity={0.20}
                     saturation={0.8}
                     hueShift={240}
                   />
                 </div>
                 

                 <div className="w-full flex justify-center items-center flex-col">
                            
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.6863772192432!2d86.14154107508409!3d22.77701737934658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4daa475a5cd%3A0xd87b53fadcd771a1!2sNational%20Institute%20of%20Technology%20Jamshedpur%20(NIT%20Jamshedpur)!5e0!3m2!1sen!2sin!4v1754332322155!5m2!1sen!2sin"
                              width="80%"
                              height="400px"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="mt-18 rounded-md"/>

                                <div className="flex md:flex-row flex-col md:justify-between justify-center mx-auto gap-y-8 md:w-[80%] w-full mt-14 mb-16">
                                     <div className="bg-gray-950 p-2 flex justify-between flex-col border-[1px] border-gray-900 rounded-md ">
                                           <h3 className="text-3xl text-gray-400 font-bold">Send us your queries</h3>
                                           <p className="mt-6 text-xl text-gray-400">THECODECRAFTS</p>
                                           <p className="mt-1 text-xl text-gray-400">Jamshedpur, INDIA</p>
                                           <p className="mt-1 text-xl text-gray-400">T:<span className="text-blue-400">+917004109936</span></p>
                                           <p className="mt-1 text-xl text-gray-400">E:<span className="text-blue-400">thecodecrafts07@gmail.com</span></p>
                                     </div>
                                     <form ref={form} onSubmit={sendEmail} >
                                            <div className=" flex md:flex md:flex-row flex-col gap-x-5 gap-y-5">
                                                 <div className="animated-border md:w-[160px] w-full h-[50px]">
                                                        <input
                                                        type="text"
                                                        required
                                                        placeholder="Full Name"
                                                        name="user_name"
                                                      />
                                                    </div>
                                                    <div className="md:w-[160px] animated-border w-full h-[50px]">
                                                        <input type="email" required placeholder="Email" name="user_email"></input>
                                                    </div>
                                                    <div className="md:w-[160px] animated-border w-full h-[50px]">
                                                         <input type="tel"  required pattern="[0-9]{10}" 
                                                  title="Enter a valid 10-digit phone number"
                                                  placeholder="Phone Number" name="user_phone"></input>
                                                    </div>
                                            </div>
                                            <div className="animated-border rounded-md mt-5 w-full">
                                             <textarea
                                               placeholder="How Can We Help You?"
                                               required
                                               name="message"
                                               className="w-full h-[140px] bg-gray-200 rounded-md border-none outline-none p-3 resize-none"
                                             ></textarea>
                                           </div>
                                            <button className='mt-7 animated-border text-white p-4 cursor-pointer w-[70px] h-[40px]'>SEND</button>
                                     </form>
                     </div>
                 </div>
        </div>
       )
}

export default ContactUs