import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight, PersonStanding } from 'lucide-react';
import { Button } from './ui/button';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    videoUrl: "https://bookdrivingtest.s3.eu-central-1.amazonaws.com/1.mp4",
    role: "New Driver",
    rating: 5,
    text: "The booking process was incredibly smooth and the test center was exactly as described. I passed on my first attempt thanks to the pre-test guidance session!",
    location: "Downtown Test Center"
  },
  {
    id: 2,
    name: "Michael Chen",
    videoUrl: "https://bookdrivingtest.s3.eu-central-1.amazonaws.com/2.mp4",
    role: "Student",
    rating: 5,
    text: "I was really nervous about my driving test, but the premium package helped me prepare perfectly. The practice session was invaluable and the examiner was professional.",
    location: "Westside Driving School"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    videoUrl: "https://bookdrivingtest.s3.eu-central-1.amazonaws.com/3.mp4",
    role: "International License Holder",
    rating: 4,
    text: "Converting my license was much easier than expected. The team helped me understand the differences in driving rules and the test was straightforward.",
    location: "North County DMV"
  },
  {
    id: 4,
    name: "David Wilson",
    videoUrl: "https://bookdrivingtest.s3.eu-central-1.amazonaws.com/4.mp4",
    role: "Returning Driver",
    rating: 5,
    text: "After not driving for years, I was worried about taking the test again. The complete package gave me the confidence I needed and the instructor was patient and encouraging.",
    location: "East End Testing"
  },
  {
    id: 5,
    name: "Olivia Taylor",
    videoUrl: "https://bookdrivingtest.s3.eu-central-1.amazonaws.com/5.mp4",
    role: "First-time Driver",
    rating: 5,
    text: "I can't thank DriveTestPro enough! From booking to the actual test day, everything was perfectly organized. The route familiarization guide was especially helpful.",
    location: "Downtown Test Center"
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <Card className="h-full bg-gray-200 border border-border/40 transition-all duration-300 hover:shadow-md">
    <CardContent className=" flex items-center gap-6 rounded-lg ">
      <div className="flex items-start justify-between ">
        <div className="flex-shrink-0">
          {/* Video element replacing the original Avatar */}
          <div className="h-68 w-52  border border-border/30 overflow-hidden ">
            {review.videoUrl ? (
              <video
                src={review.videoUrl}
                controls
                className="h-full rounded-l-lg  w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200">
                {review.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating
                  ? "text-blue-600 fill-blue-600"
                  : "text-muted stroke-muted"
                }`}
            />
          ))}
        </div>

        <p className="text-sm">{review.text}</p>
      </div>
    </CardContent>
  </Card>
);

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const reviewsPerPage = { base: 1, md: 2, lg: 3 };
  const [visibleCount, setVisibleCount] = useState(reviewsPerPage.base);

  // Adjust visible reviews based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(reviewsPerPage.lg);
      } else if (width >= 768) {
        setVisibleCount(reviewsPerPage.md);
      } else {
        setVisibleCount(reviewsPerPage.base);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + visibleCount >= reviews.length ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, visibleCount]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= reviews.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, reviews.length - visibleCount) : prevIndex - 1
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleCount);
  if (visibleReviews.length < visibleCount && reviews.length > visibleCount) {
    // Fill the remaining reviews from the beginning
    visibleReviews.push(...reviews.slice(0, visibleCount - visibleReviews.length));
  }

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16">
          <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">Customer Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="h-full animate-fade-in">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-6 md:mt-8">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors mr-2"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center mt-8'>
        <Button size="lg" className="w-full text-md sm:w-auto hover:bg-primary bg-primary/90 rounded-lg transition-all text-white duration-300 ease-in-out px-32 py-4 h-auto">
          Book My Driving Test
          <ArrowRight /></Button>
          <p className='mt-2 text-md flex'>
          <PersonStanding className='text-blue-700' />
          Express Processing • Lowest price guarantee • 24/7 Support</p>
      </div>
    </section>
  );
};

export default ReviewSection;
