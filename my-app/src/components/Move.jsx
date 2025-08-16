
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import move from "../assets/move.jpg"

const MovableBackgroundSection = () => {
    // State to hold the horizontal translation value for the image (in pixels)
    const [translateXValue, setTranslateXValue] = useState(0);

    // Adjust this value to control the speed of the parallax effect.
    // A smaller value (e.g., 0.05) means slower movement, a larger value (e.g., 0.2) means faster movement.
    const parallaxSpeed = 0.09; 

    // Ref to attach to the main container div
    const sectionRef = useRef(null);
    // Ref to attach to the inner image element for movement
    const imageRef = useRef(null);

    const form = useRef();

    // useEffect hook to handle the scroll event listener.
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !imageRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const imageWidth = imageRef.current.offsetWidth;
            const containerWidth = sectionRef.current.offsetWidth;

            // Calculate the maximum possible horizontal shift for the image
            // This is the excess width of the image that can be moved
            const maxShift = imageWidth - containerWidth;

            // Get the current vertical scroll position of the window
            const scrollTop = window.scrollY;

            // Calculate a scroll progress relative to the viewport height
            // This ensures the parallax effect is tied to the scroll position
            // and the image moves from left to right (or vice versa) across its buffer.
            // We want the image to move from 0 to maxShift as we scroll down.
            // The `scrollTop / window.innerHeight` creates a normalized scroll progress.
            const scrollProgress = scrollTop * parallaxSpeed;

            // Map scrollProgress to the range of movement.
            // We'll move the image from a negative position (left edge) towards 0 (right edge)
            // or from 0 towards a negative position depending on desired direction.
            // To ensure coverage, we want the image to be wider than the container.
            // Let's make it move from -maxShift / 2 to +maxShift / 2 (relative to its center)
            // or simply from 0 to -maxShift (if we start from left and move left)
            
            // A simple approach: move from 0 to -maxShift * X (where X is a fraction)
            // This makes the image move left as you scroll down.
            const newTranslateX = -(scrollProgress % maxShift); // Use modulo to loop movement if needed, or just cap it

            // If you want it to move from left to right as you scroll down
            // const newTranslateX = (scrollProgress % maxShift) - maxShift; // Example for right-to-left

            // Let's ensure it moves within a reasonable range and always covers.
            // We'll calculate a percentage of the maxShift based on scroll.
            // This ensures the image moves across its 'buffer' without exposing edges.
            const scrollFactor = Math.min(1, scrollTop / (document.body.scrollHeight - window.innerHeight)); // Normalize scroll from 0 to 1
            const calculatedTranslateX = -(maxShift * scrollFactor * parallaxSpeed * 2); // Multiply by 2 and adjust speed for more movement

            // Cap the movement to prevent going beyond the buffer
            const finalTranslateX = Math.max(-maxShift, Math.min(0, calculatedTranslateX));


            // A simpler, more direct approach for continuous movement:
            // Just move it left based on scroll top. The `background-size` and `overflow:hidden`
            // will handle the coverage.
            const directTranslateX = -scrollTop * parallaxSpeed;
            setTranslateXValue(directTranslateX);
        };

        // Add the scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [parallaxSpeed]); // Dependency array: re-run effect if parallaxSpeed changes


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
    return (
        <div 
            ref={sectionRef} // Attach the ref to this div
            style={{
                height: "1100px", // Fixed height for your section
                width: "100%", // Full width of its parent
                overflow: "hidden", // Crucial to hide the excess image that provides the buffer
                position: 'relative', // Needed for absolute positioning of the image
                display: 'flex', // Flexbox properties to center any text content
                alignItems: 'center',
                justifyContent: 'center',
            }}
            // Tailwind CSS classes can be added here for additional styling
            className="mt-18" 
        >
            {/* The actual image element that will be moved */}
            <img 
                ref={imageRef} // Attach ref to the image
                src={move} // Your background image source
                alt="Background"
                style={{
                    position: 'absolute', // Position absolutely within the parent div
                    top: 0,
                    left: 0,
                    minWidth: '400%', // Make the image significantly wider than the container
                    height: '100%', // Maintain height
                    objectFit: 'cover', // Ensures the image covers its own dimensions
                    transform: `translateX(${translateXValue}px)`, // Apply horizontal translation
                    transition: 'transform 0s linear', // No transition for smooth parallax
                    zIndex: -1, // Place behind text content
                }}
            />

            {/* Optional: Overlay for better text readability */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark overlay
                    zIndex: 0, // Below the text, above the image
                }}
            ></div>

            <div className='bg-blue-500/40 h-[1100px] w-full flex flex-col items-center justify-center'>
                     <div className='w-[80%] flex flex-col items-center justify-center z-30'>
                           <h1 className='text-7xl font-bold text-white'>Ready to Talk?</h1>
                           <p className='mt-5 text-xl text-white'>Get in touch now to get a free consultation</p>
                     </div>
                     <form className='flex flex-col mt-8 w-[70%] justify-center items-center z-30' ref={form} onSubmit={sendEmail}>
                                <div className='flex flex-col lg:flex-row justify-between w-full gap-y-4'>
                                     <input className='bg-white animated-border h-14 pl-3 lg:w-[340px] w-full rounded-md' name="user_name" type="text"  required placeholder='Full Name'></input>
                                     <input className='bg-white animated-border h-14 pl-3 lg:w-[340px] w-full rounded-md' name="user_email" type="email" required placeholder='Email'></input>
                                     <input className='bg-white animated-border h-14 pl-3 lg:w-[340px] w-full rounded-md' name="user_phone" type="tel" required placeholder='Phone Number'></input>
                                </div>
                                <textarea placeholder='How can i help you?' name="message" required className='w-full animated-border bg-white mt-5 h-35 pl-3 rounded-md'></textarea>
                                <button className='mt-7 glow-btn relative border-[0.25em] px-12 py-4 text-[17px] font-bold rounded-xl outline-none transition-all duration-300 cursor-pointer'>Send</button>
                     </form>
            </div>
        </div>
    );
};

export default MovableBackgroundSection;


