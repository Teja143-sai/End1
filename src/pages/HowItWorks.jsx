import { motion } from 'framer-motion';
import { 
  UserCircleIcon,
  UserPlusIcon,
  MagnifyingGlassIcon, 
  ClockIcon, 
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: (
      <div className="relative">
        <UserCircleIcon className="h-10 w-10" />
        <UserPlusIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-white bg-blue-500 rounded-full p-0.5" />
      </div>
    ),
    title: 'Create Profile',
    description: 'Sign up and set up your profile in under 2 minutes. Share your skills, experience, and interview goals to help us match you with the perfect interviewer.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    icon: (
      <div className="relative">
        <MagnifyingGlassIcon className="h-10 w-10" />
        <StarIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-yellow-400" />
      </div>
    ),
    title: 'Find Interviewer',
    description: 'Browse our network of experienced interviewers or let our smart matching algorithm suggest the best fit based on your profile and interview needs.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.4
  },
  {
    icon: (
      <div className="relative">
        <ClockIcon className="h-10 w-10" />
        <CalendarIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-white bg-orange-500 rounded-full p-0.5" />
      </div>
    ),
    title: 'Schedule Session',
    description: 'Choose a convenient time from the interviewer\'s availability. We support multiple timezones to fit your schedule.',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.6
  },
  {
    icon: (
      <div className="relative">
        <VideoCameraIcon className="h-10 w-10" />
        <ChatBubbleLeftRightIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-white bg-green-500 rounded-full p-0.5" />
      </div>
    ),
    title: 'Mock Interview',
    description: 'Experience a realistic interview in a supportive environment. Our platform includes video calling and code collaboration tools.',
    color: 'from-green-500 to-teal-500',
    delay: 0.8
  },
  {
    icon: (
      <div className="relative">
        <DocumentTextIcon className="h-10 w-10" />
        <ShieldCheckIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-white bg-red-500 rounded-full p-0.5" />
      </div>
    ),
    title: 'Get Feedback',
    description: 'Receive detailed, actionable feedback on your performance, including technical skills, problem-solving approach, and communication.',
    color: 'from-red-500 to-pink-500',
    delay: 1.0
  }
];

const benefits = [
  {
    icon: (
      <div className="relative">
        <ArrowPathIcon className="h-8 w-8 text-primary" />
        <ArrowTrendingUpIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
      </div>
    ),
    title: 'Practice Makes Perfect',
    description: 'Repeat interviews to build confidence and improve with each session.'
  },
  {
    icon: (
      <div className="relative">
        <BriefcaseIcon className="h-8 w-8 text-primary" />
        <StarIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-yellow-400" />
      </div>
    ),
    title: 'Expert Interviewers',
    description: 'Get interviewed by professionals from top tech companies.'
  },
  {
    icon: (
      <div className="relative">
        <LightBulbIcon className="h-8 w-8 text-primary" />
        <AcademicCapIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-blue-500" />
      </div>
    ),
    title: 'Personalized Tips',
    description: 'Receive customized advice to improve your interview performance.'
  },
  {
    icon: (
      <div className="relative">
        <ChartBarIcon className="h-8 w-8 text-primary" />
        <ShieldCheckIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500" />
      </div>
    ),
    title: 'Track Progress',
    description: 'Monitor your improvement over time with detailed analytics.'
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/90 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWJhY2tncm91bmQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybi1iYWNrZ3JvdW5kKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-white/90">
              Master your next technical interview with our comprehensive mock interview platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto"
            >
              Follow these simple steps to prepare for your next interview
            </motion.p>
          </motion.div>
          
          <div className="relative">
            {/* Animated connecting line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden md:block absolute h-1 bg-gradient-to-r from-blue-500 to-pink-500 top-1/2 left-0 right-0 -translate-y-1/2 z-0"
              style={{ originX: 0 }}
            />
            
            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: 'spring',
                      stiffness: 100,
                      damping: 12,
                      delay: index * 0.15
                    }
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  {/* Step number */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.5 + (index * 0.1),
                      type: 'spring',
                      stiffness: 150
                    }}
                    className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-primary rounded-full items-center justify-center z-20"
                  >
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </motion.div>
                  
                  {/* Step card */}
                  <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ 
                        scale: 1,
                        rotate: [0, 10, -10, 0],
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.3 + (index * 0.1),
                        type: 'spring',
                        stiffness: 200
                      }}
                      className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                    >
                      <div className="scale-125">
                        {step.icon}
                      </div>
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-2">
              Why Choose Our Platform
            </h2>
            <p className="mt-2 max-w-2xl text-xl text-gray-600 dark:text-gray-200 mx-auto">
              Everything you need to succeed in your technical interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-primary/10 dark:bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of candidates who have improved their interview skills with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white dark:bg-gray-800 text-primary dark:text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 inline-block border-2 border-transparent hover:border-primary/20 dark:hover:border-white/20"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-blue-500/20"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
