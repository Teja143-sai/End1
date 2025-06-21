import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BoltIcon, ChartBarIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: <BoltIcon className="h-8 w-8" />,
    title: 'Fast Matching',
    description: 'Get matched with interviewers in under 30 seconds using our smart matching algorithm.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: <ChartBarIcon className="h-8 w-8" />,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed analytics and personalized feedback reports.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    icon: <UserGroupIcon className="h-8 w-8" />,
    title: 'Expert Community',
    description: 'Connect with industry professionals and experienced interviewers.',
    color: 'from-green-500 to-teal-500',
    delay: 0.3
  },
  {
    icon: <ClockIcon className="h-8 w-8" />,
    title: 'Flexible Scheduling',
    description: 'Book mock interviews 24/7 according to your availability.',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.4
  },
  {
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with enterprise-grade security.',
    color: 'from-red-500 to-pink-500',
    delay: 0.5
  },
  {
    icon: <CheckCircleIcon className="h-8 w-8" />,
    title: 'Proven Success',
    description: 'Join thousands who have successfully aced their interviews with our help.',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.6
  }
];

const FeatureCard = ({ icon, title, description, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
    >
      <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
          >
            Everything you need to ace your next interview
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your interview skills?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
