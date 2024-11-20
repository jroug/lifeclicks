'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  location: string;
  eventType: string;
  role: string;
  hear: string;
  date: string;
  eventLocation: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    location: '',
    eventType: '',
    role: '',
    hear: '',
    date: '',
    eventLocation: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="custom-contact-us-height flex items-center justify-center bg-gray-100">
      <div className="mx-auto my-[100px] w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-left mb-10 text-[80px] font-cormorant_garamond uppercase font-light">Contact Us</h1>
        <p className="uppercase font-montserrat x-6 pt-5 pb-16 max-w-[500px] text-sm">Ready to capture your story with LifeClicks? Share your details below, and our team will be in touch within 24 hours with a personalized overview of our photography services. Let’s bring your moments to life.</p>
        {submitted ? (
          <p className="text-green-600">Thank you for your message!</p>
        ) : (
          <form className="contact-us bg-black font-montserrat pl-20 pr-60 pt-20 pb-60" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16  " >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 bg-black text-white">FULL NAME</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 bg-black text-white">EMAIL</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1 bg-black text-white">WHERE DO YOU LIVE?</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1 bg-black text-white">EVENT TYPE</label>
                  <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-black text-white" required>
                    <option value="" disabled></option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-1 bg-black text-white">WHAT IS YOUR ROLE?</label>
                  <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1 bg-black text-white">DATE</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="eventLocation" className="block text-sm font-medium mb-1 bg-black text-white">EVENT LOCATION</label>
                  <input type="text" id="eventLocation" name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-1 bg-black text-white">BUDGET</label>
                  <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div>
                  <label htmlFor="hear" className=" block text-sm font-medium mb-1 bg-black text-white">HOW DID YOU HERE ABOUT US?</label>
                  <input type="text" id="hear" name="hear" value={formData.hear} onChange={handleChange} className="w-full bg-black text-white" required />
                </div>
                <div className="col-span-2 max-w-[60%]" >
                  <label htmlFor="message" className="block text-sm font-medium mb-1 bg-black text-white">MESSAGE</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full bg-black text-white" required ></textarea>
                </div>
                <div className="col-span-2 max-w-[60%]" >
                <input type="checkbox" id="terms" name="terms"  className="p-5 bg-black text-white" required />
                    <p className="block text-sm font-medium mb-1 bg-black text-white">
                      I consent for the information submitted above to be recorded and
                      stored for the purposes of providing services relating to my inquiry. I
                      agree that registration on or use of the Bottega 53 site constitutes
                      agreement to its User Agreement & Privacy Policy
                    </p>
                </div>
                <div className="col-span-2 text-left">
                  <button type="submit" className=" text-white font-semibold rounded-md shadow-sm hover:underline ">SEND</button>
                </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}