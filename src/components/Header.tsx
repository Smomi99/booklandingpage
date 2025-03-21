
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, Menu, X } from 'lucide-react';
import logo from '../../public/images/logo.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-6',
        isScrolled 
          ? 'bg-white backdrop-blur-md shadow-sm' 
          : 'bg-white'
      )}
    >
      <div className=" mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 px-4">
              <img src={logo} alt="DriveTestPro Logo" className="" />
            
            </a>
            <nav className="hidden md:flex items-center space-x-8">
            <a href="#locations" className="font-medium hover:text-primary transition-colors">
              How It Works?
            </a>
            <a href="#reviews" className=" font-medium hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#faq" className=" font-medium hover:text-primary transition-colors">
              Pricing
            </a>

          </nav>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">

            <Button className="bg-primary  hover:bg-primary/90 transition-colors text-lg">
              Book My Driving Test
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container py-4 px-6 flex flex-col space-y-4">

            <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">
              <Calendar className="mr-2 h-4 w-4" />
              Book My Driving Test
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
