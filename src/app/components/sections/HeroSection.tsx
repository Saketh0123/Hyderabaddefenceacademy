import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { heroImages } from "../../data/heroImages";

const fallbackSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1723143870307-b18424a1d548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWZlbnNlJTIwYWNhZGVteSUyMGhlcm8lMjBiYW5uZXJ8ZW58MXx8fHwxNzczOTMyODQwfDA&ixlib=rb-4.1.0&q=80&w=1920",
    alt: "Hyderabad Defence Academy event highlight",
    title: "Capturing Moments\nThat Matter",
    subtitle: "Hyderabad Defence Academy Events, Achievements & Memories",
  },
  {
    image:
      "https://images.unsplash.com/photo-1767211808976-4317c37e77c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHRyYWluaW5nJTIwb3V0ZG9vciUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3MzkzMjgzNnww&ixlib=rb-4.1.0&q=80&w=1920",
    alt: "Outdoor defence training session",
    title: "Forging Tomorrow's\nDefenders",
    subtitle: "Elite Training Programs for India's Future Defence Leaders",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623546835805-ba3d0f9fb7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHVuaWZvcm0lMjBtYXJjaGluZ3xlbnwxfHx8fDE3NzM5MzI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1920",
    alt: "Students marching in uniform",
    title: "March Towards\nExcellence",
    subtitle: "Building Discipline, Leadership & National Pride Since Inception",
  },
  {
    image:
      "https://images.unsplash.com/photo-1660485345088-c398363c1f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzM4OTcyNDd8MA&ixlib=rb-4.1.0&q=80&w=1920",
    alt: "Academy celebration ceremony",
    title: "Celebrating\nEvery Victory",
    subtitle: "Our Students' Success Stories Inspire the Next Generation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1763890763377-abd05301034d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBsaWZlJTIwc3R1ZGVudHMlMjBvdXRkb29yfGVufDF8fHx8MTc3MzkzMjgzNnww&ixlib=rb-4.1.0&q=80&w=1920",
    alt: "Students enjoying campus life",
    title: "A Campus Full\nOf Memories",
    subtitle: "Vibrant Campus Life That Shapes Character Beyond the Classroom",
  },
];

const heroSlides =
  heroImages.length > 0
    ? heroImages.map((img, index) => {
        const content = fallbackSlides[index % fallbackSlides.length];
        return {
          image: img.src,
          alt: img.alt,
          title: content.title,
          subtitle: content.subtitle,
        };
      })
    : fallbackSlides;

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);

  const handleExploreClick = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Preload all images (non-blocking). Start autoplay only after all images loaded.
  useEffect(() => {
    let mounted = true;
    const loaders = heroSlides.map((s) =>
      new Promise((res) => {
        const img = new Image();
        img.src = s.image;
        img.onload = () => res(true);
        img.onerror = () => res(true);
      })
    );
    Promise.all(loaders).then(() => {
      if (mounted) setLoadedAll(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loadedAll) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [loadedAll, goToNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight bg-gradient-to-b from-[#FFF8CC] via-[#F0CC66] to-[#A87400] bg-clip-text text-transparent [-webkit-text-stroke:1.5px_rgba(88,58,0,0.7)] [text-shadow:0_4px_16px_rgba(0,0,0,0.45),0_0_24px_rgba(255,214,102,0.35)]">
                {currentSlide === 0 ? (
                  <>
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">WELCOME TO</span>
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">SOUTH INDIAS</span>
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">NO 1 DEFENCE ACADEMY</span>
                  </>
                ) : (
                  heroSlides[currentSlide].title
                )}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                {heroSlides[currentSlide].subtitle}
              </p>
              <motion.button
                onClick={handleExploreClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Gallery
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
