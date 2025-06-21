import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { 
  ArrowPathIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  UserIcon,
  BriefcaseIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// List of common skills for autocomplete
const COMMON_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'TypeScript', 'Swift',
  'Kotlin', 'Go', 'Ruby', 'Rust', 'Dart', 'SQL', 'HTML', 'CSS', 'React',
  'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
  'React Native', 'Flutter', 'Android', 'iOS', 'AWS', 'Azure', 'Google Cloud',
  'Docker', 'Kubernetes', 'Git', 'Machine Learning', 'Data Science', 'AI',
  'Blockchain', 'Cybersecurity', 'DevOps', 'UI/UX', 'Figma', 'Adobe XD',
  'Project Management', 'Agile', 'Scrum', 'Problem Solving', 'Teamwork',
  'Communication', 'Leadership', 'Time Management', 'Critical Thinking'
].sort();

// List of common fields of study
const FIELDS_OF_STUDY = [
  'Computer Science', 'Computer Engineering', 'Software Engineering',
  'Information Technology', 'Data Science', 'Artificial Intelligence',
  'Machine Learning', 'Cybersecurity', 'Computer Networks',
  'Web Development', 'Mobile App Development', 'Game Development',
  'Database Management', 'Cloud Computing', 'DevOps', 'UI/UX Design',
  'Information Systems', 'Computer Graphics', 'Robotics',
  'Bioinformatics', 'Computational Biology', 'Mathematics',
  'Physics', 'Chemistry', 'Biology', 'Biotechnology', 'Mechanical Engineering',
  'Electrical Engineering', 'Electronics and Communication', 'Civil Engineering',
  'Aerospace Engineering', 'Chemical Engineering', 'Biomedical Engineering',
  'Business Administration', 'Finance', 'Marketing', 'Economics', 'Accounting',
  'Psychology', 'Sociology', 'Political Science', 'International Relations',
  'English Literature', 'History', 'Philosophy', 'Linguistics',
  'Fine Arts', 'Graphic Design', 'Film Studies', 'Music', 'Theater Arts',
  'Medicine', 'Nursing', 'Pharmacy', 'Dentistry', 'Public Health',
  'Law', 'Criminal Justice', 'Environmental Science', 'Agriculture',
  'Architecture', 'Urban Planning', 'Anthropology', 'Archaeology', 'Geography'
].sort((a, b) => a.localeCompare(b));

const Signup = () => {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: roleFromUrl === 'interviewer' ? 'interviewer' : 'interviewee',
    phoneNumber: '',
    institution: '',
    jobTitle: '',
    academicYear: '',
    fieldOfStudy: '',
    skills: [],
    agreeToTerms: false,
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const skillsInputRef = useRef(null);
  
  // Field of study autocomplete states
  const [fieldOfStudyInput, setFieldOfStudyInput] = useState(formData.fieldOfStudy || '');
  const [filteredFields, setFilteredFields] = useState([]);
  const [showFieldSuggestions, setShowFieldSuggestions] = useState(false);
  const fieldInputRef = useRef(null);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupStatus, setSignupStatus] = useState({ success: false, message: '' });
  const { signup } = useAuth();
  const { signInWithGoogle } = useFirebase();
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      console.log('Initializing Google Sign-In...');
      
      // Create Google provider
      const provider = new GoogleAuthProvider();
      // Add scopes
      provider.addScope('profile');
      provider.addScope('email');
      
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      // The signed-in user info
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      
      // Get the role from the URL or use 'interviewee' as default
      const role = searchParams.get('role') || 'interviewee';
      
      // Redirect to the appropriate dashboard based on role
      const redirectPath = role === 'interviewer' 
        ? '/interviewer/dashboard' 
        : '/interviewee/dashboard';
      
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath);
      
    } catch (error) {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used
      const email = error.customData?.email;
      // The AuthCredential type that was used
      const credential = GoogleAuthProvider.credentialFromError(error);
      
      console.error('Google Sign-In Error:', {
        errorCode,
        errorMessage,
        email,
        credential
      });
      
      // Update UI with error message
      setSignupStatus({
        success: false,
        message: errorCode === 'auth/popup-closed-by-user' 
          ? 'Sign in was cancelled' 
          : `Failed to sign in with Google: ${errorMessage}`
      });
    }
  };

  // Handle Microsoft Sign-In (Coming Soon)
  const handleMicrosoftSignIn = () => {
    setSignupStatus({
      success: false,
      message: 'Microsoft sign-in is coming soon!'
    });
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleAddSkill = (e, skillToAdd = null) => {
    e.preventDefault();
    const skill = skillToAdd || skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
      setShowSkillSuggestions(false);
    }
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    
    if (value.trim() === '') {
      setFilteredSkills([]);
      setShowSkillSuggestions(false);
      return;
    }
    
    const filtered = COMMON_SKILLS.filter(skill =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
    setShowSkillSuggestions(filtered.length > 0);
  };

  const handleSuggestionClick = (e, skill) => {
    e.preventDefault();
    handleAddSkill(e, skill);
  };

  // Field of study handlers
  const handleFieldOfStudyChange = (e) => {
    const value = e.target.value;
    setFieldOfStudyInput(value);
    setFormData(prev => ({
      ...prev,
      fieldOfStudy: value
    }));
    
    if (value.trim() === '') {
      setFilteredFields([]);
      setShowFieldSuggestions(false);
      return;
    }
    
    const filtered = FIELDS_OF_STUDY.filter(field =>
      field.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFields(filtered);
    setShowFieldSuggestions(filtered.length > 0);
  };

  const handleFieldSuggestionClick = (e, field) => {
    e.preventDefault();
    setFieldOfStudyInput(field);
    setFormData(prev => ({
      ...prev,
      fieldOfStudy: field
    }));
    setShowFieldSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillsInputRef.current && !skillsInputRef.current.contains(event.target)) {
        setShowSkillSuggestions(false);
      }
      if (fieldInputRef.current && !fieldInputRef.current.contains(event.target)) {
        setShowFieldSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.role === 'interviewee' && !formData.institution) {
      newErrors.institution = 'Institution is required for interviewees';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    setIsLoading(true);
    setSignupStatus({ success: false, message: 'Creating your account...' });
    
    try {
      console.log('Attempting to sign up with:', {
        email: formData.email,
        role: formData.role || 'interviewee'
      });
      
      const result = await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role || 'interviewee',
        phoneNumber: formData.phoneNumber,
        institution: formData.institution,
        jobTitle: formData.jobTitle,
        academicYear: formData.academicYear,
        fieldOfStudy: formData.fieldOfStudy,
        skills: formData.skills
      });
      
      console.log('Signup result:', result);
      
      if (result && result.success) {
        console.log('Signup successful, redirecting to dashboard');
        
        setSignupStatus({
          success: true,
          message: 'Account created successfully! Redirecting to dashboard...'
        });
        
        // Redirect to the appropriate dashboard based on role
        const redirectPath = formData.role === 'interviewer' 
          ? '/interviewer/dashboard' 
          : '/interviewee/dashboard';
          
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1500);
      } else {
        const errorMessage = result?.error || 'Failed to create account. Please try again.';
        console.error('Signup failed:', errorMessage);
        setSignupStatus({
          success: false,
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Join thousands of learners',
      description: 'Be part of a growing community of professionals and learners.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Expand your network globally',
      description: 'Connect with professionals from around the world.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Get matched instantly',
      description: 'Our smart algorithm pairs you with the perfect interview partners.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-[#036d66] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        
        <div className="relative z-10 mb-16">
          <button 
            onClick={(e) => {
              e.preventDefault();
              console.log('Navigating to home page...');
              // Use replace to prevent adding to history
              setTimeout(() => {
                window.location.replace('/');
              }, 50);
            }}
            className="flex items-center bg-transparent border-none p-0"
          >
            <span className="text-3xl font-serif font-bold text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
              RI Connect
            </span>
          </button>
          
          <div className="max-w-md mx-auto md:mx-0 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-garamond font-bold leading-tight">
              Start Your Journey
            </h1>
            <p className="text-lg text-white/90">
              Create your account and join our community of learners and professionals
            </p>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-white/10 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-8 text-center md:text-left text-white/70 text-sm">
          &copy; {new Date().getFullYear()} RI Connect. All rights reserved.
        </div>
      </div>
      
      {/* Right Panel - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {signupStatus.message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg shadow-lg flex items-start space-x-3 ${
                signupStatus.success ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {signupStatus.success ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
              )}
              <p className={`text-sm ${signupStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                {signupStatus.message}
              </p>
            </motion.div>
          )}

          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-garamond font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Sign up to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role is now handled by the route or default value */}
            <input type="hidden" name="role" value={formData.role} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your email address"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  required
                />
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">At least 8 characters with uppercase, lowercase, and number</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Additional Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.role === 'interviewee' ? 'College/University *' : 'Current Company'}
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  value={formData.institution}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.institution ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.role === 'interviewee' ? 'Your college/university' : 'Your company name'}
                  required={formData.role === 'interviewee'}
                />
                {errors.institution && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.institution}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor={formData.role === 'interviewee' ? 'fieldOfStudy' : 'jobTitle'} className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.role === 'interviewee' ? 'Major/Field of Study' : 'Job Title'}
                </label>
                {formData.role === 'interviewee' ? (
                  <div className="relative" ref={fieldInputRef}>
                    <div className="relative">
                      <input
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        type="text"
                        value={fieldOfStudyInput}
                        onChange={handleFieldOfStudyChange}
                        onFocus={() => fieldOfStudyInput.trim() && setShowFieldSuggestions(true)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="e.g., Computer Science"
                        autoComplete="off"
                      />
                      {fieldOfStudyInput && (
                        <button
                          type="button"
                          onClick={() => {
                            setFieldOfStudyInput('');
                            setFormData(prev => ({ ...prev, fieldOfStudy: '' }));
                            setFilteredFields([]);
                            setShowFieldSuggestions(false);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {showFieldSuggestions && filteredFields.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200 max-h-60 overflow-auto"
                        >
                          {filteredFields.map((field, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              onClick={(e) => handleFieldSuggestionClick(e, field)}
                            >
                              {field}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="e.g., Software Engineer"
                  />
                )}
              </div>
            </div>

            {formData.role === 'interviewee' && (
              <div>
                <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <select
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select graduation year</option>
                  <option value="none">None</option>
                  {Array.from({ length: new Date().getFullYear() + 5 - 2000 + 1 }, (_, i) => {
                    const year = 2000 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  }).reverse()}
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            <div className="relative" ref={skillsInputRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills & Interests
              </label>
              <div className="flex space-x-2 relative">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(e))}
                    onFocus={() => skillInput.trim() && setShowSkillSuggestions(true)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Start typing to see suggestions"
                  />
                  {skillInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSkillInput('');
                        setFilteredSkills([]);
                        setShowSkillSuggestions(false);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  type="button"
                >
                  Add Skill
                </button>
              </div>
              <AnimatePresence>
                {showSkillSuggestions && filteredSkills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200 max-h-60 overflow-auto"
                  >
                    {filteredSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={(e) => handleSuggestionClick(e, skill)}
                      >
                        <span className="flex-1">{skill}</span>
                        <span className="text-xs text-gray-400 ml-2">Click to add</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 text-primary/70 hover:text-primary focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  *
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-teal-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Sign up with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleMicrosoftSignIn}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Sign up with Microsoft</span>
                  <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 11.5H23V0H11.5V11.5Z" fill="#F25022"/>
                    <path d="M0 11.5H11.5V0H0V11.5Z" fill="#7FBA00"/>
                    <path d="M11.5 23H23V11.5H11.5V23Z" fill="#00A4EF"/>
                    <path d="M0 23H11.5V11.5H0V23Z" fill="#FFB900"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
