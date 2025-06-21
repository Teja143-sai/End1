import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BoltIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Software Engineer',
    content: 'The mock interviews helped me land my dream job at a FAANG company!',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Product Manager',
    content: 'The feedback from industry experts was incredibly valuable for my preparation.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Data Scientist',
    content: 'The platform is intuitive and the interviewers are top-notch professionals.',
    rating: 4
  }
];

// FAQ data
const faqs = [
  {
    question: 'How do I book a mock interview?',
    answer: 'Simply sign up, choose an interviewer, and select an available time slot that works for you.'
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Yes, we offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll refund your money.'
  },
  {
    question: 'How are the interviewers vetted?',
    answer: 'All our interviewers go through a rigorous selection process and have proven industry experience.'
  }
];

const features = [
  {
    icon: <BoltIcon className="h-6 w-6" />,
    title: 'Fast Matching',
    description: 'Get matched with interviewers in under 30 seconds.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <ChartBarIcon className="h-6 w-6" />,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed analytics.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: 'Expert Community',
    description: 'Connect with industry professionals.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: <ClockIcon className="h-6 w-6" />,
    title: 'Flexible Scheduling',
    description: 'Book interviews 24/7 at your convenience.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: 'Secure & Private',
    description: 'Your data is always protected.',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: <CheckCircleIcon className="h-6 w-6" />,
    title: 'Proven Success',
    description: 'Join thousands who aced their interviews.',
    color: 'from-indigo-500 to-purple-500'
  }
];

const Features = () => {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Add spacing for fixed navbar */}
      <div className="h-24 dark:bg-gray-900" />
      
      {/* Compact Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/90 text-white overflow-hidden -mt-24 pt-24">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full text-white/90 dark:text-white/80"
            >
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              Trusted by 10,000+ professionals
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold mb-4 max-w-3xl mx-auto leading-tight text-white"
            >
              Master Your Next Technical Interview
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 dark:text-white/80 max-w-2xl mx-auto mb-6"
            >
              Practice with real interview questions and get detailed feedback from industry experts.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <button 
                className="px-6 py-2.5 bg-white dark:bg-gray-100 text-primary font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                Start Free Trial
              </button>
              <button className="px-6 py-2.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 text-sm">
                Watch Demo
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-white/80 pt-4 border-t border-white/10"
            >
              {[
                { value: '95%', label: 'Success Rate' },
                { value: '50+', label: 'Expert Coaches' },
                { value: '10K+', label: 'Interviews' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-bold text-white dark:text-gray-100">{stat.value}</div>
                  <div className="dark:text-gray-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simplified Tabs Navigation */}
      <div className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm sticky top-16 z-40 shadow-sm py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-full p-1.5 shadow-inner">
            <div className="relative flex">
              <motion.div
                className="absolute inset-0 h-full bg-gradient-to-r from-primary to-primary/90 rounded-full shadow-md"
                initial={false}
                animate={{
                  width: '33.333%',
                  left: activeTab === 'features' 
                    ? '0%' 
                    : activeTab === 'testimonials' 
                      ? '33.333%' 
                      : '66.666%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
              {['features', 'testimonials', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-colors duration-200 ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:font-medium'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Indicators */}
          <div className="mt-3 flex justify-center space-x-2">
            {['features', 'testimonials', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  activeTab === tab ? 'w-6 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-400'
                }`}
                aria-label={`View ${tab}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Tab */}
        {activeTab === 'features' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Comprehensive tools and resources to help you ace your technical interviews</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(feature.icon, { className: 'h-7 w-7' })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Hear from professionals who transformed their interview performance</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold text-2xl mr-4 dark:bg-gray-700 dark:text-gray-100">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="flex mr-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                          fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{testimonial.rating}.0/5.0</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Find answers to common questions about our platform and services</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary mr-3">•</span>
                    {faq.question}
                  </h3>
                  <div className="pl-6">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-10 lg:p-12 text-center text-white overflow-hidden relative mt-20 z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of professionals who landed their dream jobs with our mock interview platform.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-white dark:bg-gray-100 text-primary font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200">
                Start Free Trial
              </button>
              <button className="px-8 py-3.5 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                Schedule a Demo
              </button>
            </div>
          </div>
        </motion.section>
      </main>

    </div>
  );
};

export default Features;
