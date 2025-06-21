import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckIcon, 
  ArrowPathIcon, 
  ArrowRightIcon, 
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Pricing = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Plan data
  const plans = {
    monthly: [
      {
        name: 'Basic',
        price: 0,
        period: 'month',
        features: [
          'Access to basic interview features',
          'Unlimited practice interviews',
          'Basic feedback on interviews',
          'Email support',
        ],
        buttonText: user?.subscriptionStatus === 'premium' ? 'Current Plan' : 'Get Started',
        buttonVariant: 'outline',
        featured: false,
      },
      {
        name: 'Premium',
        price: 19.99,
        period: 'month',
        features: [
          'All Basic features',
          'Advanced interview analytics',
          'Priority support',
          'Detailed feedback reports',
          'AI-powered interview insights',
        ],
        buttonText: user?.subscriptionStatus === 'premium' ? 'Current Plan' : 'Upgrade to Premium',
        buttonVariant: 'primary',
        featured: true,
      }
    ],
    yearly: [
      {
        name: 'Basic',
        price: 0,
        period: 'year',
        features: [
          'Access to basic interview features',
          'Unlimited practice interviews',
          'Basic feedback on interviews',
          'Email support',
        ],
        buttonText: user?.subscriptionStatus === 'premium' ? 'Current Plan' : 'Get Started',
        buttonVariant: 'outline',
        featured: false,
      },
      {
        name: 'Premium',
        price: 191.9, // ~20% discount for yearly
        period: 'year',
        features: [
          'All Basic features',
          'Advanced interview analytics',
          'Priority support',
          'Detailed feedback reports',
          'AI-powered interview insights',
        ],
        buttonText: user?.subscriptionStatus === 'premium' ? 'Current Plan' : 'Upgrade to Premium',
        buttonVariant: 'primary',
        featured: true,
      }
    ],
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    if (plan.name === 'Basic') {
      // Handle Basic plan selection
      toast.info('You have selected the Basic plan');
    } else {
      // Handle Premium plan selection
      if (user) {
        // User is logged in, handle upgrade
        toast.success('Upgrading to Premium plan...');
      } else {
        // User needs to log in
        toast.info('Please sign in to upgrade to Premium');
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary-100 dark:bg-blue-900/30 text-primary-800 dark:text-blue-200 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
            Find Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Whether you're just starting out or ready to take your interview skills to the next level, we have a plan that fits your needs.
          </p>
          
          {/* Billing Toggle */}
          <motion.div 
            className="mt-10 inline-flex items-center bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 relative ${
                selectedPlan === 'yearly'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              Yearly Billing
              <span className="absolute -top-2 -right-2 bg-yellow-400 dark:bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12"
        >
          {plans[selectedPlan].map((plan, index) => (
            <motion.div
              key={`${plan.name}-${selectedPlan}`}
              variants={item}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.featured 
                  ? 'transform scale-105 border-2 border-primary-500 shadow-xl' 
                  : 'border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-700/30'
              }`}
              onMouseEnter={() => setIsHovered(plan.name)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {plan.featured && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                  Most Popular
                </div>
              )}
              
              <div className="bg-white dark:bg-gray-800/80 p-8 h-full flex flex-col relative z-10">
                <div className="flex-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {plan.name === 'Basic' 
                      ? 'Perfect for getting started' 
                      : 'Everything you need to ace your interviews'}
                  </p>
                  
                  <div className="mb-8">
                    <span className="text-lg font-medium text-gray-500">
                      /{plan.period}
                    </span>
                    {plan.name === 'Premium' && selectedPlan === 'yearly' && (
                      <span className="ml-2 text-sm text-blue-600 font-medium">
                        (${(plan.price / 12).toFixed(2)}/month)
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'text-indigo-500' : 'text-green-500'
                        }`} />
                        <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={() => handlePlanSelect(plan)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  disabled={user?.subscriptionStatus === 'premium'}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
              
              {/* Hover effect */}
              {isHovered === plan.name && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Job Guarantee Section */}
      <div className="max-w-6xl mx-auto mt-24 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 md:p-12 shadow-inner border border-blue-100 dark:border-blue-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 mb-6">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Job Guarantee
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Land Your Dream Job in 6 Months or Get Your Money Back
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              We're so confident in our program that we offer a 100% money-back guarantee if you don't land a job within 6 months of completing our program.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
              {[
                {
                  title: "6-Month Job Guarantee",
                  description: "If you don't get hired within 6 months of completing our program, we'll give you a full refund.",
                  icon: ClockIcon
                },
                {
                  title: "Career Support",
                  description: "Unlimited 1:1 career coaching and interview preparation until you land your dream job.",
                  icon: UserGroupIcon
                },
                {
                  title: "Resume & LinkedIn",
                  description: "Professional resume and LinkedIn profile optimization to help you stand out to employers.",
                  icon: DocumentTextIcon
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 bg-white dark:bg-gray-800/80 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg inline-block">How It Works</h3>
              <div className="space-y-4">
                {[
                  "Complete our comprehensive interview preparation program",
                  "Apply to at least 10 jobs per week that match your skills and experience",
                  "Attend all scheduled coaching sessions and implement feedback",
                  "If you don't receive a job offer within 6 months of completing the program, we'll issue a full refund"
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                  <button className="inline-flex items-center px-6 py-3 border-2 border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/20 dark:shadow-blue-900/30 transition-all duration-200">
                  Get Started with Job Guarantee
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Can I switch plans later?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
            },
            {
              question: "Is there a free trial?",
              answer: "Yes, we offer a 7-day free trial for the Premium plan. No credit card is required to start the trial."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers."
            },
            {
              question: "Can I cancel anytime?",
              answer: "Absolutely! You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period."
            }
          ].map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700"
              onClick={() => toggleFaq(expandedFaq === index ? null : index)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                <motion.span
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  className="text-gray-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you with any questions about our plans and features.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-500/20 dark:shadow-indigo-900/30 transition-all duration-200">
            Contact Support
          </button>
        </div>
      </div>
  </div>
  );
};

export default Pricing;
