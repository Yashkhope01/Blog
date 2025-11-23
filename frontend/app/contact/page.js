"use client"
import React, { useState } from 'react';
import { contactAPI } from '@/lib/api';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await contactAPI.submitContact({
        name,
        email,
        subject,
        message
      });
      
      alert("Thank you for contacting us! We will get back to you soon.");
      
      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert("Sorry, there was an error submitting your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4"> 
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md text-center">
          Have a question or want to work together? Send us a message!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 font-medium">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What is this about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 rounded-lg border dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium">Message:</label>
            <textarea 
              id="message" 
              name="message" 
              placeholder="Your message here..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="6"
              className="w-full p-3 rounded-lg border dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
            <footer className="footer mt-5 py-5 bg-white dark:bg-[#393f4d]">
        <div className="container mx-auto px-2 gap-50">
          <div className="text-center">
            <p className="text-sm flex flex-col md:flex-row gap-6 md:gap-14 justify-center">
              <a
                href="mailto:yashkhope123@gmail.com"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/mail.png" alt="GMail" className="w-20 h-20" />
              </a>

              <a
                href="tel:+91 8975905912"
                className="hover:scale-110 transition-transform duration-300 mt-3"
              >
                <img src="/phone.png" alt="Contact" className="w-16 h-16" />
              </a>

              <a
                href="https://www.instagram.com/your_instagram/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/insta.png" alt="Instagram" className="w-20 h-20" />
              </a>

              <a
                href="https://www.linkedin.com/in/your_linkedin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/linkedin.png" alt="Linkedin" className="w-20 h-20" />
              </a>

              <a
                href="https://github.com/Yashkhope01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/github.png" alt="GitHub" className="w-20 h-20" />
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ContactForm;