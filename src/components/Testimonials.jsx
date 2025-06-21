import { motion, useAnimation, useInView, useDragControls } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

// Duplicate testimonials for infinite scroll effect
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer at TechCorp',
    content: 'RI Connect helped me land my dream job! The mock interviews were incredibly realistic and the feedback was invaluable.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    content: 'As an interviewer, I\'ve met so many talented individuals. It\'s rewarding to help others while improving my own skills.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Recent Graduate',
    content: 'The practice I got here was better than any interview prep course. Real people, real questions, real results!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Senior Developer',
    content: 'The platform is amazing for practicing system design interviews. The interviewers gave me detailed feedback that helped me improve significantly.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Data Scientist',
    content: 'Great way to prepare for technical interviews. The community is very supportive and the interviewers are knowledgeable.',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
];

// Create a duplicated array for seamless looping
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial, className = '' }) => (
  <div className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] mx-6 border border-gray-100 dark:border-gray-700 ${className}`}>
    <div className="flex items-center mb-6">
      <img 
        src={testimonial.avatar} 
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-700 dark:text-gray-200 text-lg italic">"{testimonial.content}"</p>
    <div className="mt-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(15);
  const [manualScroll, setManualScroll] = useState(false);
  const dragControls = useDragControls();
  const [position, setPosition] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const containerWidth = useRef(0);
  const contentWidth = useRef(0);
  const scrollableWidth = useRef(0);
  const scrollContainerRef = useRef(null);

  // Calculate scrollable width
  useEffect(() => {
    if (scrollContainerRef.current) {
      containerWidth.current = scrollContainerRef.current.offsetWidth;
      contentWidth.current = scrollContainerRef.current.scrollWidth / 2; // Since we duplicate the content
      scrollableWidth.current = contentWidth.current - containerWidth.current;
    }
  }, [testimonials]);

  // Auto-scroll animation
  useEffect(() => {
    if (!isInView || manualScroll) return;
    
    const startAnimation = async () => {
      await controls.start({
        x: ['0%', '-50%'],
        transition: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };
    
    startAnimation();
    
    return () => controls.stop();
  }, [controls, isInView, duration, manualScroll]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!manualScroll) return;
    
    const moveAmount = 100; // Pixels to move per key press
    let newPosition = position;
    
    if (e.key === 'ArrowLeft') {
      newPosition = Math.min(0, position + moveAmount);
    } else if (e.key === 'ArrowRight') {
      newPosition = Math.max(-scrollableWidth.current, position - moveAmount);
    } else {
      return;
    }
    
    setPosition(newPosition);
    controls.stop();
    controls.set({ x: `${newPosition}px` });
  }, [manualScroll, position, controls, scrollableWidth]);
  
  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  // Handle drag start
  const handleDragStart = (e, info) => {
    setManualScroll(true);
    setDragStart(info.point.x);
    controls.stop();
  };
  
  // Handle drag
  const handleDrag = (e, info) => {
    if (!manualScroll) return;
    const delta = info.point.x - dragStart;
    const newPosition = Math.max(-scrollableWidth.current, Math.min(0, position + delta));
    setPosition(newPosition);
    setDragStart(info.point.x);
    controls.set({ x: `${newPosition}px` });
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setManualScroll(false);
  };
  
  // Toggle manual scroll on mouse enter/leave
  const handleMouseEnter = () => {
    setManualScroll(true);
    controls.stop();
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setManualScroll(false);
    setIsPaused(false);
  };



  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden" ref={ref}>
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-garamond font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </motion.div>

        <div 
          className="relative w-full overflow-hidden max-w-[2000px] mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
        >
          <div className="relative py-8 -mx-8 px-8 md:-mx-12 md:px-12">
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 z-10 pointer-events-none" />
          
            <motion.div 
              className="flex cursor-grab active:cursor-grabbing"
              ref={containerRef}
              animate={controls}
              drag="x"
              dragConstraints={{
                left: -scrollableWidth.current,
                right: 0
              }}
              dragElastic={0.1}
              dragControls={dragControls}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{ x: position }}
            >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-2"
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  className={isPaused ? 'scale-100' : 'hover:scale-105 transition-transform duration-300'}
                />
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                manualScroll ? 'w-2 bg-gray-300 dark:bg-gray-600' : 'w-6 bg-primary'
              }`}
            />
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default Testimonials;
