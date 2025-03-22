import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingOption = ({
  title,
  price,
  description,
  features,
  popular = false,
  cta = "Start Now",
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta?: string;
}) => (
  <Card className={`border p-4 transition-all duration-300 ${popular ? 'bg-blue-700 shadow-lg border-primary/20 relative' : 'shadow-sm hover:shadow-md'}`}>

    <CardHeader className={`${popular ? 'pt-8' : 'pt-6'}`}>

      <CardTitle className={`text-2xl font-bold ${popular ? 'text-white' : ''}`}>{title}</CardTitle>
      <div className={`mt-1 mb-2 ${popular ? 'text-white' : ''}`}>
        <span className="text-3xl font-bold">{price}</span>
      </div>
      <CardDescription className={popular ? 'text-white' : ''}>{description}</CardDescription>
      <div>
        <Link  to="/book-now">
        <Button
          className={` ${popular ? 'hover:bg-primary/90 bg-white border text-black' : 'bg-white border text-black hover:bg-secondary/90 text-foreground'}`}
        >
          {cta}
          <ArrowRight />
        </Button></Link>
      </div>
    </CardHeader>

    <CardContent>
      <ul className="space-y-3">
        {features.map((feature, index) => (
         <li key={index} className={`flex ${popular ? 'text-white' : ''}`}>
         <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
         <span className="text-sm">{feature}</span>
       </li>
       
        ))}
      </ul>
    </CardContent>

  </Card>
);

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-md ">
            At Book Driving Test, we offer flexible prices to meet the unique needs of every learner driver. Choose the best option for you and start your stress-free booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PricingOption
            title="Standard Test"
            price="£19"
            popular={true}
            description="Perfect for confident drivers who just need the official test"
            features={[
              "Unlimited Test Centres",
              "Unlimited Notifications",
              "Real-Time Notifications",
              "Live Support"
            ]}
          />

          <PricingOption
            title="Premium Test"
            price="£49"
            description="Our most popular option with pre-test guidance and priority booking"

            features={[
              "Unlimited Test Centres",
              "Automatically Checks Slots Every Second",
              "Detailed Search Preferences",
              "Dedicated Customer Support",
            ]}
          />

        </div>

      </div>
      
    </section>
  );
};

export default PricingSection;
