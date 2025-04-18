import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold font-heading">
            Action<span className="text-green">Staffing</span>
          </span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div 
            className="flex space-x-4 lg:space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a href="/" className="text-sm lg:text-base font-medium text-deep-navy hover:text-green transition-colors">Home</a>
            <a href="/about" className="text-sm lg:text-base font-medium text-deep-navy hover:text-green transition-colors">About</a>
            <a href="/contact" className="text-sm lg:text-base font-medium text-deep-navy hover:text-green transition-colors">Contact</a>
          </motion.div>
          
          <motion.div 
            className="flex space-x-3 lg:space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="mailto:info@actionstaffing.co.uk" 
              className="border border-green text-green rounded-md px-4 py-2.5 flex items-center justify-center hover:bg-green-50 transition-all duration-300"
              aria-label="Email Us"
            >
              <FaEnvelope size={18} className="mr-2" />
              <span>Email</span>
            </a>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-deep-navy p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom px-4 flex flex-col py-4 space-y-3">
            <a href="/" className="py-2 font-medium text-deep-navy hover:text-green transition-colors">Home</a>
            <a href="/about" className="py-2 font-medium text-deep-navy hover:text-green transition-colors">About</a>
            <a href="/contact" className="py-2 font-medium text-deep-navy hover:text-green transition-colors">Contact</a>
            
            <div className="flex pt-3">
              <a 
                href="mailto:info@actionstaffing.co.uk" 
                className="border border-green text-green rounded-md flex-1 py-2.5 flex items-center justify-center hover:bg-green-50 transition-all duration-300"
                aria-label="Email Us"
              >
                <FaEnvelope size={16} className="mr-2" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 