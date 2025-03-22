import { cn } from '@/lib/utils';
import logo from '../../../public/images/logo.svg';

interface BookingHeaderProps {
  isScrolled: boolean;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ isScrolled }) => (
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
);
