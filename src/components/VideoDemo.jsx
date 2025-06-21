import { motion } from 'framer-motion';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const VideoDemo = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-garamond font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            See RI Connect in Action
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch how RI Connect helps you ace your next interview
          </motion.p>
        </div>

        <motion.div 
          className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto aspect-video flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20" />
          <button 
            className="relative z-10 group flex flex-col items-center text-primary hover:text-primary/90 transition-colors"
            onClick={() => {/* Add video play functionality */}}
            aria-label="Play demo video"
          >
            <PlayCircleIcon className="h-16 w-16 md:h-20 md:w-20 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium">Watch Demo</span>
          </button>
          
          {/* Video thumbnail or placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Video thumbnail will appear here</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Real Practice',
              description: 'Practice with real people in realistic interview scenarios.'
            },
            {
              title: 'Instant Feedback',
              description: 'Get constructive feedback to improve your performance.'
            },
            {
              title: 'Any Device',
              description: 'Access your practice sessions from anywhere, on any device.'
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
