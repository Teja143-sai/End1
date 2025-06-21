import { useEffect, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Hero from '../components/Hero';
import RoleSelection from '../components/RoleSelection';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import BackToTop from '../components/BackToTop';
import UserProfileSummary from '../components/UserProfileSummary';

const Home = () => {
  const { language } = useTranslation(); // This will trigger re-renders when language changes
  
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    };

    // Add click event to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="min-h-screen">
        <Hero />
        <RoleSelection />
        <Stats />
        <Testimonials />
        <BackToTop />
      </div>
    </div>
  );
};

export default Home;
