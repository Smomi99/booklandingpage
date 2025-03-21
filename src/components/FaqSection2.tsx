
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    {
      question: "I've already booked my practical driving test – can you help me find an earlier test?",
      answer:
        "Yes, we can! Sign-up with us, enter your preferences for where and when you want your test, then sit back and wait for us to notify you of an earlier test."
    },
    {
      question: "I haven't yet booked my practical driving test – can you help me find me something soon?",
      answer:
        "Yes, we can! You need to book your test with the DVSA, then come back here to sign-up with us, enter your preferences for where and when you would like us to change your test to, then sit back and wait for us to notify you of something sooner."
    },
    {
      question: "How likely is it you will find me an earlier test?",
      answer:
        "Very likely, we find tests for almost all of our customers and we'll refund your payment if we're unable to find you a test. There's no software to download and we notify you by text and email every time we find a test you may be interested in - if you see a test you like just reply with 'book' and your test will be changed!"
    },
    {
      question: "If I contact the DVSA will they be able to tell me what cancellations are available?",
      answer:
        "No, the DVSA do not have a cancellations list and the DVSA telephone operators see exactly the same test availability as you do if you use the DVSA online booking site - they cannot search for cancellations."
    },
    {
      question: "Can I find cancellations myself?",
      answer:
        "You can certainly try but you'll need to spend a lot of time logging into the DVSA site to see if suitable slots are available - cancellations tend to be snapped up very quickly which is why our service is so useful."
    },
    {
      question: "What is a driving test cancellation?",
      answer:
        "Driving test cancellations are practical driving test appointments that become available after a learner driver cancels or rearranges their driving test. Our driving test cancellation checker finds these DVSA driving test slots and offer them to you. If you accept the driving test, we change your driving test to an earlier date for you. We can automatically book driving tests for you too."
    },
    {
      question: "What is the best time to check for driving test cancellations?",
      answer:
        "Driving test cancellation appointments become available when learner drivers cancel or reschedule their driving tests, which can be at any time during the day. Our driving test cancellation finder regularly searches for these cancellations giving you the best chance of getting an earlier driving test."
    },
    {
      question: "Can I find driving test cancellations for free?",
      answer:
        "You can cancel and rebook your driving test yourself on the DVSA website but searching for driving test cancellations yourself takes time and can be stressful. BOOKDRIVINGTEST.CO.UK takes this stress away by finding you unlimited driving test cancellations until your next test."
    },
    {
      question: "How do I find driving test cancellations?",
      answer:
        "Can't find any available earlier driving tests? Find driving test cancellations using our driving test cancellation checker. It's easy to use and quick to set up. We regularly search up to 5 DVSA driving test centres for you to give you the best chance of finding an earlier driving test."
    },
    {
      question: "Can you automatically book driving test cancellations?",
      answer:
        "Yes. We can automatically book driving test cancellations that match your search preferences. You just need to turn on the autobook feature from your online account. You will need to book your initial driving test with the DVSA so that we can then change your driving test."
    },
    {
      question: "Which DVSA driving test centres can you find driving test cancellations at?",
      answer:
        "Can't find any driving tests available on the DVSA website? You must have a driving test booking before we can find you driving test cancellations. We can start searching for earlier driving tests as soon as you have booked your practical driving test."
    },
    {
      question: "Are driving test cancellations common?",
      answer:
        "Yes, the DVSA website releases driving test slots at any point. Cancellations appear when tests are cancelled, rearranged or new tests become available on the DVSA database. Our cancellation software frequently scans every test centre for the next available driving test dates so that we can get sooner driving tests for our customers."
    },
    {
      question: "How can I check my driving test date?",
      answer:
        "Check your driving test appointment details when you want to know the date and time of your driving test and the address of the driving test centre. You'll need your provisional driving licence number, theory test number or driving test reference number to get your booking details. BOOKDRIVINGTEST.CO.UK can change driving tests on your behalf. We search, find and change driving tests that meet your availability preferences. And we can keep moving your test forward as many times as you need until you take your test."
    },
    {
      question: "How many times can I change my driving test?",
      answer:
        "The DVSA allows you to change your driving test appointment up to 6 times before you need to cancel your test and rebook it. If you're using our cancellation checker, we can change your test as many times as you need until you take your next driving test. We can still continue to change your test after we have changed it six times, but you'll need to cancel your test and rebook it on the DVSA website before we can make any further test changes."
    },
    {
      question: "How long is the driving test cancellation list?",
      answer:
        "There isn't a driving test cancellation list, so the only way to find cancellation appointments is by searching the DVSA website for earlier driving test slots.\n\nThis can be boring and takes time. Our driving test app checks for driving test availability every few minutes. When we find a new test date matching your search preferences, we'll reserve the test and notify you instantly. And if you accept the test, we'll move it forward to the new date."
    },
    {
      question: "How can I check for driving test cancellations?",
      answer:
        "Our driving cancellation software checks test centres every few minutes for the latest cancellations, including short notice tests. The service reserves and books these cancellation appointments so you can get an earlier driving test quickly without any stress or hassle."
    }
  ];
  

const FAQSection2 = () => {
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
        <h1 className='text-4xl text-center m-8'>Frequently Asked Questions</h1>
        <div className="max-w-4xl mx-auto">
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

export default FAQSection2;
