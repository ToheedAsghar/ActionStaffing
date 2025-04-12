import React, { useState } from 'react';
import axios from 'axios';

interface ContactFormProps {
  className?: string;
  compact?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '', compact = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await axios.post('/api/contact', formData);
      
      setSubmitStatus({
        success: true,
        message: response.data.message || 'Your message has been sent successfully. We will contact you soon!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again later.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {submitStatus.message && (
        <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {compact ? 'Full Name' : 'Full Name'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            placeholder="Your email"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          placeholder="Your phone number"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          placeholder="Message subject"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          placeholder="Write your message here..."
        ></textarea>
      </div>
      
      <div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn btn-primary py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm; 