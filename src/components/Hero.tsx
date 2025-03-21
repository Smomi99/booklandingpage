
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, CheckCircle, Globe, Eclipse, MessageCircle, MessageCircleCode } from 'lucide-react';

const Hero = () => {
  return (
    <section className=" pt-32 pb-8 overflow-hidden">

      <div className=' bg-blue-700 py-8'>
        <div className="container px-36 mt-8">
          <div className="max-w-7xl">
            <div className=''>

              <div className='flex gap-2'>
                <div className='flex flex-col  gap-2'>
                  <div className='flex gap-2'>
                    <div className='flex rounded p-2 px-4 bg-blue-900 gap-2'>
                      <div className='flex gap-1'>
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-yellow-500 mr-0.5"
                          >
                            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-normal text-white/90">18,597+ 5-Star Reviews</span>

                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl text-white mt-8 lg:text-5xl font-bold leading-tight mb-6 text-balance animate-fade-in">
                    Find early driving test cancellations and <br />
                    book now
                  </h1>

                  <p className="text-lg md:text-xl text-white mb-10 mx-auto max-w-2xl">
                    Need an earlier driving test? bookdrivingtest finds earlier test slots and books them for you, so you can start driving sooner without the stress!

                  </p>

                  <Button size="lg" className="w-full text-2xl sm:w-auto bg-white hover:bg-primary/90 rounded-lg transition-all duration-300 ease-in-out px-6 py-6 h-auto text-black">
                    Book My Driving Test
                  </Button>
                </div>
                <div>
                  <img
                    src="https://cdn.prod.website-files.com/65f821325a96255ad25d812e/677d2bf82f557c78d77d3c1f_1-p-500.png"
                    alt="Driving Test Center"
                    className="rounded-lg"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className='flex justify-center max-w-7xl p-4 mx-auto gap-4 mt-4'>

        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-700" />
            <div className='flex flex-col'>
            <span className="text-md font-medium ">Supported 170,000+ learner drivers</span>
            <span className="text-sm ">in successfully getting their driving licence</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <Eclipse className="h-6 w-6 text-blue-700" />
            <div className='flex flex-col'>
            <span className="text-md font-medium ">Supported 170,000+ learner drivers</span>
            <span className="text-sm  ">in successfully getting their driving licence</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <MessageCircleCode className="h-6 w-6 text-blue-700" />
            <div className='flex flex-col'>
            <span className="text-md font-medium ">Supported 170,000+ learner drivers</span>
            <span className="text-sm ">in successfully getting their driving licence</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-700" />
            <div className='flex flex-col'>
            <span className="text-md font-medium ">Supported 170,000+ learner drivers</span>
            <span className="text-sm  ">in successfully getting their driving licence</span>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Hero;
