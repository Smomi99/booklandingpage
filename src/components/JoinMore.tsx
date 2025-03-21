
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';


const JoinMore = () => {
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  const toggleFAQ = (value: string) => {
    setOpenFAQs(
      openFAQs.includes(value)
        ? openFAQs.filter((v) => v !== value)
        : [...openFAQs, value]
    );
  };

  return (
    <section id="faq" className="bg-blue-700 p-16 mt-32">
      <div className="container mx-auto px-6">
        <h1 className='text-4xl text-white text-center m-8'>Join more than 170,000 people that <br /> finds early driving test</h1>
        <div className='flex justify-center items-center mt-8'>
        <Button size="lg" className="w-full text-xl sm:w-auto hover:bg-primary bg-primary/90 rounded-lg transition-all text-white duration-300 ease-in-out px-6 py-4 h-auto">
          Book My Driving Test
          <ArrowRight /></Button>
      </div>
      </div>
    </section>
  );
};

export default JoinMore;
