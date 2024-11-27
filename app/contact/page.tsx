'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { motion } from 'framer-motion';
 
const theme = createTheme({
  palette: {
    primary: {
      main: '#515151', // Green as the primary color
    },
  },
});


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

  const contactVariants ={
      initial: { x: +200 },
      enter: { x: 0 },
      exit: { x: +200 },
  }
  const pageTransition = {
      duration: 0.8,
      ease: "easeInOut",
  }

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={contactVariants} transition={pageTransition} >
      <main className="custom-contact-us-height flex items-center justify-center bg-gray-100">
        <div className="mx-auto my-[100px] w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-left mb-10 text-[80px] font-cormorant_garamond uppercase font-light">Contact Us</h1>
          <p className="uppercase font-montserrat x-6 pt-5 pb-16 max-w-[500px] text-sm">Ready to capture your story with LifeClicks? Share your details below, and our team will be in touch within 24 hours with a personalized overview of our photography services. Let’s bring your moments to life.</p>
        
          {submitted ? (
            <p className="text-green-600">Thank you for your message!</p>
          ) : (
            <ThemeProvider theme={theme}>
              <form className="contact-us bg-black font-montserrat pl-20 pr-60 pt-20 pb-60" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 " >
                    <div>
                      <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField label="Where Do You Live?" name="location" value={formData.location} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField select label="Event Type" name="eventType" value={formData.eventType} onChange={handleChange} variant="standard" fullWidth required  >
                        <MenuItem value="wedding">Wedding</MenuItem>
                        <MenuItem value="birthday">Birthday</MenuItem>
                        <MenuItem value="corporate">Corporate Event</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    </div>
                    <div>
                      <TextField label="What Is Your Role?" name="role" value={formData.role} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    {/* <div>
                      <TextField label="Date" name="date" value={formData.date} onChange={handleChange} variant="standard" fullWidth required />
                    </div> */}
                    <div className="date-wrap">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker label="Date" />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
  

                    <div>
                      <TextField label="Event Location" name="eventLocation" value={formData.eventLocation} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                    <TextField select label="Budget" name="budget" value={formData.budget} onChange={handleChange} variant="standard" fullWidth required >
                        <MenuItem value="3-5">3000€ - 5000€</MenuItem>
                        <MenuItem value="5-10">5000€ - 10000€</MenuItem>
                        <MenuItem value="10+">10000€ + </MenuItem>
                      </TextField>
                    </div>
                    <div>
                      <TextField label="How Did You Hear About Us?" name="hear" value={formData.hear} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div className="md:col-span-2 max-w-[60%]" >
                      <TextField label="Message" name="message" value={formData.message} onChange={handleChange} variant="standard" multiline rows={4} fullWidth required autoComplete="off" />
                    </div>  
                    <div className="md:col-span-2 max-w-[60%]" >
                        <input type="checkbox" id="terms" name="terms"  className="p-5 bg-black text-white form-checkbox" required />
                        <p className="block text-sm font-medium mb-1 bg-black text-white uppercase pl-[30px]">
                          I consent for the information submitted above to be recorded and
                          stored for the purposes of providing services relating to my inquiry. I
                          agree that registration on or use of the Bottega 53 site constitutes
                          agreement to its User Agreement & Privacy Policy
                        </p>
                    </div>
                    <div className="md:col-span-2 text-left">
                      <button type="submit" className=" text-white font-semibold rounded-md shadow-sm hover:underline ">SEND</button>
                    </div>
                </div>
              </form>
            </ThemeProvider>
          )}
        </div>
      </main>
    </motion.div>
  );
}