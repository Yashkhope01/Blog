"use client"
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(''); // State for reason

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., send data to an API
    console.log('Form submitted:', { name, phone, age, email, reason }); // Log reason
    alert("Thank you for submitting the Details . We will come back to you soon.")
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}> 
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label htmlFor="reason">Reason for Contact:</label> {/* New label and input for reason */}
          <textarea 
            id="reason" 
            name="reason" 
            placeholder="Your Reason" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <button type="submit" style={{ padding: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}> {/* Changed button color */}
            Submit
          </button>
        </form>
      </div>
      <footer className="footer mt-10 py-10" style= {{background: '#2A004E'}}>
  <div className="container mx-auto px-4 gap-16"> 
    <div className="text-center">
      <p className="text-sm flex flex-col md:flex-row gap-3 md:gap-8 justify-center"> 
        <a
          href="mailto:your.email@gmail.com"
          className="hover:scale-110 transition-transform duration-300 hover:text-blue-500"
        >
          your.email@gmail.com
        </a>
        <a
          href="tel:+1234567890"
          className="hover:scale-110 transition-transform duration-300 hover:text-blue-500"
        >
          +1234567890
        </a>
        <a
          href="https://www.instagram.com/your_instagram/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 hover:text-blue-500"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/your_linkedin/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 hover:text-blue-500"
        >
          Linkedin
        </a>
      </p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default ContactForm;