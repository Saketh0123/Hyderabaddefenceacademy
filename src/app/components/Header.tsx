import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Gallery", path: "/#gallery" },
    { name: "Staff", path: "/#staff" },
    { name: "Contact", path: "/contact#contact-form" },
  ];

  const handleNavClick = (path: string) => {
    // If path is an in-page anchor (starts with '/#'), scroll on the same page
    if (path.startsWith("/#")) {
      const sectionId = path.split("#")[1];
      if (location.pathname !== "/") {
        navigate(`/#${sectionId}`);
        return;
      }

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // For full routes (including hashes like /contact#contact-form) just navigate normally
    navigate(path);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled || !isHomePage ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
          isScrolled || !isHomePage ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 min-w-0">
            {/* Logo */}
            <Link to="/" className="flex items-center min-w-0">
              <img
                src="https://hyderabaddefenceacademy.com/assets/uploads/logo.png"
                alt="Hyderabad Defence Academy"
                className="h-10 sm:h-16 w-auto max-w-[72vw] sm:max-w-none object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (link.path.includes("#")) {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }}
                  className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                    isScrolled || !isHomePage ? "text-gray-900" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors shrink-0 ${
                isScrolled || !isHomePage ? "text-gray-900" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (link.path.includes("#")) {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-medium text-gray-900 hover:text-blue-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
