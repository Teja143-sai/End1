import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Extract the number and any suffix (like + or %)
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9,]/g, '');
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numValue;
      const frames = 60; // Number of frames for the animation
      const increment = Math.ceil(end / frames);
      const incrementTime = (duration * 1000) / frames;
      
      const timer = setInterval(() => {
        start = Math.min(start + increment, end);
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numValue, duration]);
  
  // Format number with commas
  const formattedCount = count.toLocaleString();
  
  return (
    <span ref={ref}>
      {formattedCount}{suffix}
    </span>
  );
};

const stats = [
  { id: 1, name: 'Active Users', value: '10000+', description: 'Join our growing community of professionals' },
  { id: 2, name: 'Interviews Conducted', value: '50000+', description: 'Hours of interview practice and counting' },
  { id: 3, name: 'Countries', value: '100+', description: 'Global community from around the world' },
  { id: 4, name: 'Success Rate', value: '95%', description: 'Of users report improved interview skills' },
];

const Stats = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-garamond font-bold text-gray-900 dark:text-white mb-4">
            Join Our Thriving Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Be part of thousands of professionals improving their interview skills every day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light mb-2">
                <AnimatedCounter value={stat.value} duration={2} />
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{stat.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
