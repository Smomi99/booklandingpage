import logo from '../../public/images/logo.svg';
import Gateway from '../../public/images/gateway.png';
const Footer = () => {

  return (
    <footer className="bg-secondary/30 border-t border-border/30">
      <div className="container  mx-auto px-6 py-12">
        <div className="flex justify-center items-center">
          <a href="/" className="flex  items-center space-x-2 px-4">
            <img src={logo} alt="DriveTestPro Logo" className="" />

          </a>
        </div>
        <div className="mt-4 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
         
          <div className="flex space-x-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            
           
          </div>
          <div className="flex justify-center items-center">
          <a href="/" className="flex  items-center space-x-2 px-4">
            <img src={Gateway} alt="DriveTestPro Logo" className="" />

          </a>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
