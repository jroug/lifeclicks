'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
// import { useSiteData } from '@/context/SiteDataContext';


// import { validateName } from "@/utils/validations";
import { logDev } from '@/utils/logDev';
import { Dayjs } from "dayjs";
// Apollo Client



const theme = createTheme({
  palette: {
    primary: {
      main: '#515151', // Green as the primary color
    },
  },
});

// PagesMap declarations start
type PagesMap = {
  [key: string]: Page;
};
interface Page {
  id: string;
  title: string;
  slug: string;
  uri: string;
  content: string | null;
  date: string;
  pageExtras: PageExtras;
  featuredImage: FeaturedImage | null;
}
interface PageExtras {
  secondaryText: string | null;
}
interface FeaturedImage {
  node:{
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      }
  }
}
// PagesMap declarations end


interface ContactPageClientProps {
  pagesMap: PagesMap;
}

interface FormData {
  form_name: string;
  form_email: string;
  form_location: string;
  form_eventType: string;
  form_role: string;
  form_hear: string;
  form_date: Dayjs | null;
  form_eventLocation: string;
  form_budget: string;
  form_message: string;
}

const ContactPageClient: React.FC<ContactPageClientProps> = ({ pagesMap }) => {

  const pageContactData = pagesMap['contact'];
  // const data = useSiteData();

  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    form_name: '',
    form_email: '',
    form_location: '',
    form_eventType: '',
    form_role: '',
    form_hear: '',
    form_date: null,
    form_eventLocation: '',
    form_budget: '',
    form_message: '',
  });

  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setFormData({ ...formData, form_date: newDate });
    }
    
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    logDev('Submit Button pressed');


    e.preventDefault();

    
    const contact_submit = document.getElementById('contact_submit')as HTMLButtonElement | null;

    if(!contact_submit) return;

    contact_submit.disabled = true;
 
    const form_vars = {
      form_name: formData.form_name,
      form_email: formData.form_email,
      form_location: formData.form_location,
      form_eventType: formData.form_eventType,
      form_role: formData.form_role,
      form_hear: formData.form_hear,
      form_date: formData.form_date?.format('DD/MM/YYYY'),
      form_eventLocation: formData.form_eventLocation,
      form_budget: formData.form_budget,
      form_message: formData.form_message,
    }

    logDev('form_vars', form_vars);


    try {
          const response = await fetch('/api/sendEmail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form_vars),
          });
          if (response.ok) {
              const responseData = await response.json();
              const emailSent = JSON.parse(responseData.emailSent);

              logDev(responseData);
              if (emailSent.status == 200) {
                setFormSuccessMessage(emailSent.message);
                setSubmitted(true);
              }else{
                setFormErrorMessage(emailSent.message);
                setSubmitted(false);
                logDev(emailSent);
              }
          }else{
              setSubmitted(false);
              setFormErrorMessage('Bad Request');
              logDev('There was a problem parsing the JSON:', response);
          }
    } catch (error) {
          setSubmitted(false);
          setFormErrorMessage('Your message was not sent, please try again!');
          if (error instanceof SyntaxError) {
              logDev('There was a problem parsing the JSON:', error);
          } else {
              logDev('There was a problem with the fetch operation:', error);
          }
    }

    return false;
    
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
        <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl">
          <h1 className="mx-5 md:mx-auto text-[40px] md:text-[80px] font-bold text-left sm:mb-10 font-cormorant_garamond uppercase font-light">{pageContactData?.title}</h1>
          <div className="mx-5 md:mx-0 uppercase font-montserrat pt-5 pb-16 max-w-[600px] text-[16px]">{pageContactData.content ? parse(pageContactData.content) : '' }</div>
        
          {submitted ? (
            <p className="text-green-600 text-[40px] font-montserrat text-center pt-[100px] pb-[200px]">{formSuccessMessage}</p>
          ) : (
            <ThemeProvider theme={theme}>
              <form id="contact_submit" className="contact-us bg-black font-montserrat pl-5 md:pl-20 pr-10 md:pr-60 pt-20 pb-10 md:pb-60" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 " >
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="Full Name" id="form_name" name="form_name" value={formData.form_name} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="Email" id="form_email" name="form_email" type="email" value={formData.form_email} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="Where Do You Live?" id="form_location" name="form_location" value={formData.form_location} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                      <TextField select label="Event Type" id="form_eventType" name="form_eventType" value={formData.form_eventType} onChange={handleChange} variant="standard" fullWidth required  >
                        <MenuItem value="wedding">Wedding</MenuItem>
                        <MenuItem value="birthday">Birthday</MenuItem>
                        <MenuItem value="corporate">Corporate Event</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    </div>
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="What Is Your Role?" id="form_role" name="form_role" value={formData.form_role} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    {/* <div>
                      <TextField label="Date" name="date" value={formData.date} onChange={handleChange} variant="standard" fullWidth required />
                    </div> */}
                    <div className="date-wrap">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                          <DatePicker
                            label="Date"
                            value={formData.form_date}
                            onChange={handleDateChange}
                            format="DD/MM/YYYY" // Specify the format
                            slotProps={{
                              textField: {
                                required: true, // Make it required
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="Event Location" id="form_eventLocation" name="form_eventLocation" value={formData.form_eventLocation} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div>
                    <TextField select label="Budget" name="form_budget" value={formData.form_budget} onChange={handleChange} variant="standard" fullWidth required >
                        <MenuItem value="3-5">3000€ - 5000€</MenuItem>
                        <MenuItem value="5-10">5000€ - 10000€</MenuItem>
                        <MenuItem value="10+">10000€ + </MenuItem>
                      </TextField>
                    </div>
                    <div>
                      <TextField inputProps={{ maxLength: 50 }} label="How Did You Hear About Us?" id="form_hear" name="form_hear" value={formData.form_hear} onChange={handleChange} variant="standard" fullWidth required autoComplete="off" />
                    </div>
                    <div className="md:col-span-2 md:max-w-[60%]" >
                      <TextField inputProps={{ maxLength: 800 }} label="Message" id="form_message" name="form_message" value={formData.form_message} onChange={handleChange} variant="standard" multiline rows={4} fullWidth required autoComplete="off" />
                    </div>  
                    <div className="md:col-span-2 md:max-w-[60%]" >
                        <input type="checkbox" id="terms" name="terms"  className="p-5 bg-black text-white form-checkbox" required />
                        <p className="block text-sm font-medium mb-1 bg-black text-white uppercase pl-[50px] md:pl-[30px]">{pageContactData.pageExtras?.secondaryText!==null ? parse(pageContactData.pageExtras?.secondaryText) : ''}</p>
                    </div>
                    <div className="md:col-span-2 text-left">
                      <button type="submit" className=" text-white font-semibold rounded-md shadow-sm hover:underline ">SEND</button>
                    </div>
                    <div className="md:col-span-2 text-left">
                      <p className="text-red-600 text-[20px] font-montserrat text-center">{formErrorMessage}</p>
                    </div>
                </div>
              </form>
            </ThemeProvider>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default ContactPageClient;