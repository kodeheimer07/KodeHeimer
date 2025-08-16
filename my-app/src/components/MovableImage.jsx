
import React, { useState, useEffect, useRef } from 'react';
import city from "../assets/city.png"

const MovableImage = () => {
    // State to hold the horizontal translation value for the image (in pixels)
    const [translateXValue, setTranslateXValue] = useState(0);

    // Adjust this value to control the speed of the parallax effect.
    // A smaller value (e.g., 0.05) means slower movement, a larger value (e.g., 0.2) means faster movement.
    const parallaxSpeed = 0.09; 

    // Ref to attach to the main container div
    const sectionRef = useRef(null);
    // Ref to attach to the inner image element for movement
    const imageRef = useRef(null);

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

    return (
        <div 
            ref={sectionRef} // Attach the ref to this div
            style={{
                height: "800px", // Fixed height for your section
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
                src={city} // Your background image source
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

            <div className='bg-blue-500/40 h-[1100px] w-[100%] flex flex-col items-center justify-center'>
                    <h2 className='text-6xl font-bold text-white text-center'>We are here since 2025</h2>
                                           <p className='w-[70%] text-xl text-white text-center mt-8'>Founded in 2025, we’ve quickly emerged as a trusted name in the digital space — delivering high-impact development solutions tailored for the modern age. From frontend brilliance to robust backends, seamless UI/UX, full stack efficiency, and dynamic e-commerce platforms, we handle every phase of the digital product journey — from concept and design to development, launch, and ongoing support.</p>

            </div>
        </div>
    );
};

export default MovableImage;

// To run this, you would typically use it in your App.js like this:
/*
import React from 'react';
import MovableBackgroundSection from './MovableBackgroundSection'; // Assuming this component is in MovableBackgroundSection.js

function App() {
  return (
    <div>
      <MovableBackgroundSection />
      <div style={{ height: '1500px', backgroundColor: '#f0f4f8', padding: '50px' }}>
        <h2 style={{ fontSize: '2em', textAlign: 'center', marginBottom: '20px' }}>Scrollable Content Below</h2>
        <p style={{ lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          This content will scroll over the parallax section.
          <br/><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default App;
*/
