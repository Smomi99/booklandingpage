
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricingSection from '@/components/PricingSection';
import ReviewSection from '@/components/ReviewSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FAQSection2 from '@/components/FaqSection2';
import JoinMore from '@/components/JoinMore';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample location data
  const locations = [
    {
      id: "1",
      name: "Downtown Test Center",
      address: "123 Main St, San Francisco, CA",
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviewCount: 253,
      availability: "Next available: Tomorrow",
      popular: true,
      waitTime: "2-3 days"
    },
    {
      id: "2",
      name: "Westside Driving School",
      address: "456 Ocean Ave, San Francisco, CA",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviewCount: 128,
      availability: "Next available: This week",
      waitTime: "3-5 days"
    },
    {
      id: "3",
      name: "East End Testing",
      address: "789 Market St, San Francisco, CA",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviewCount: 98,
      availability: "Next available: Next week",
      waitTime: "5-7 days"
    },
    {
      id: "4",
      name: "North County DMV",
      address: "101 Park Blvd, Oakland, CA",
      image: "https://images.unsplash.com/photo-1596986104770-3091267286e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.3,
      reviewCount: 87,
      availability: "Next available: This week",
      waitTime: "4-6 days"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />

        {/* Test Locations Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simplify booking your driving test
              </h2>
              <p className="text-lg ">
                Don’t wait weeks or months for your driving test. Use the UK's most trusted driving test cancellation finder to reschedule your existing test to a more convenient date.</p>
            </div>
            <div className="grid grid-cols-5 max-w-6xl mx-auto gap-8 justify-center">
              <div className='flex flex-col col-span-2'>
                <img
                  src="https://cdn.prod.website-files.com/65f821325a96255ad25d812e/677d6e67413fbad7e8534fb1_Frame%202.png"
                  alt="Driving Test Center"
                  className="rounded-t-lg"
                  width={600}
                  height={400}
                />

                <div className='bg-green-100/50 p-4 rounded-b-lg'>
                  <div className='flex gap-1 mt-2'>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-blue-600 mr-0.5"
                      >
                        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                      </svg>
                    ))}
                  </div>
                  <p >
                    I was really worried about finding a convenient driving test date. But luckily, it worked out very easily with this amazing service. Just within a week, I received multiple notifications about driving test cancellations and available slots. So I was able to get a test date exactly a month earlier than my previous booking. A real game changer, highly recommend!
                  </p>
                </div>
              </div>
              <div className='col-span-3'>
                <FAQSection />
              </div>

            </div>

            <div className='flex justify-center items-center mt-8'>
              <Link  to="/book-now" >
              <Button size="lg" className="w-full text-xl sm:w-auto hover:bg-primary bg-primary/90 rounded-lg transition-all text-white duration-300 ease-in-out px-6 py-4 h-auto">
                Book My Driving Test
              <ArrowRight /></Button>
              </Link>
            </div>
          </div>

        </section>

        <PricingSection />
        <ReviewSection />
        <FAQSection2 />
        <JoinMore />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
