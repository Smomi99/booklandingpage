
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "Get instant alerts",
    answer: "Staying vigilant is the key to quickly booking a driving test cancellation. We’ll keep you notified about the latest cancellations and send real-time updates straight to your inbox or phone."
  },
  {
    question: "Personalised search",
    answer: "Our system tirelessly searches for test cancellations based on your availability and finds and books test slots that best fit your schedule."
  },
  {
    question: "Multiple test centres",
    answer: "Widen your options to multiple test centres to secure your driving test slot faster at your preferred centre."
  },
  {
    question: "Autobooking",
    answer: "We can automatically book driving test cancellations for you as soon as they open up. Simply provide your location and time preferences, sit back, and relax!"
  },
  {
    question: "Save time & effort",
    answer: "Finding your preferred driving test date isn’t as hard as you might think anymore. Our intuitive platform guides you through the process effortlessly, allowing you to find the perfect driving test date. Thus, you can simply focus on what really matters - passing your test."
  },
  {
    question: "Unlimited driving test cancellations",
    answer: "Enjoy unlimited test cancellation searches, notifications, and bookings until you successfully pass your practical test."
  },
  {
    question: "24/7 customer support",
    answer: "Our customer support team is here to answer any questions you might have every step of the way."
  }
];

const FAQSection = () => {
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  const toggleFAQ = (value: string) => {
    setOpenFAQs(
      openFAQs.includes(value)
        ? openFAQs.filter((v) => v !== value)
        : [...openFAQs, value]
    );
  };

  return (
    <section id="faq" className="">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" value={openFAQs} className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b  overflow-hidden bg-white"
              >
                <AccordionTrigger 
                  onClick={() => toggleFAQ(`faq-${index}`)}
                  className="px-6 hover:no-underline  transition-colors"
                >
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
