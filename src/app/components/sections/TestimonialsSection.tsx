import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const testimonials = [
  {
    name: "Eatala Rajendar",
    role: "Member of the Lok Sabha",
    image: "https://www.thestatesman.com/wp-content/uploads/2025/06/Untitled-design-22-1-jpg.webp",
    quote:
      "Hyderabad Defence Academy stands out for disciplined training, dedicated mentors, and a student-focused culture that builds confidence and character.",
  },
  {
    name: "Kethireddy Venkatarami Reddy",
    role: "Former Member of the Legislative Assembly of Andhra Pradesh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmf3jf67niTljAMK_EoHFSjgIPvRBLHBlvpA&s",
    quote:
      "The academy's infrastructure, strong academic support, and committed faculty create a perfect environment for aspirants preparing for defence careers.",
  },
  {
    name: "Bandaru Dattatraya",
    role: "Former Member of the Lok Sabha and Governor",
    image: "https://www.newsbharati.com/Encyc/2021/7/15/2_02_35_54_Bandaru-Dattatreya_1_H@@IGHT_360_W@@IDTH_600.jpg",
    quote:
      "I appreciate the academy's values-driven atmosphere, experienced staff, and systematic preparation that guides students towards national service.",
  },
  {
    name: "Crisna Chaitanya Reddy",
    role: "Motivational Speaker",
    image:
      "https://yt3.googleusercontent.com/N2EUyZLW3-8uUnCs72EPuC1vbFrmdVamWfWq-9HBWTxu8iwz8L0yNJDcE4irmNaDmjGaldx7=s900-c-k-c0x00ffffff-no-rj",
    quote:
      "The positivity on campus is remarkable. From classrooms to mentoring sessions, Hyderabad Defence Academy inspires students to think big and stay disciplined.",
  },
  {
    name: "Venu Kalyan",
    role: "Motivational Speaker",
    image: "https://in.bmscdn.com/artist/venu-kalyan-2041937-1731219568.jpg",
    quote:
      "The training model here is practical and focused. The faculty and facilities together give students a strong edge in defence exam preparation.",
  },
  {
    name: "Dr. Vakulabharanam Krishna Mohan Rao",
    role: "Former Chairman, BC Commission",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqaEaAWmiQkOAjwursrUs5ds3vYakBy9vaw&s",
    quote:
      "Hyderabad Defence Academy has built an excellent learning ecosystem with quality infrastructure, disciplined routines, and supportive staff committed to student success.",
  },
];

export function TestimonialsSection() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = useMemo(() => {
    const groups = [];
    for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
      groups.push(testimonials.slice(i, i + cardsPerSlide));
    }
    return groups;
  }, [cardsPerSlide]);

  useEffect(() => {
    setActiveSlide((prev) => Math.min(prev, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrev = () => {
    if (slides.length <= 1) {
      return;
    }
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    if (slides.length <= 1) {
      return;
    }
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const cardClass =
    cardsPerSlide === 1
      ? "bg-gray-50 rounded-2xl p-8 relative"
      : "bg-gray-50 rounded-2xl p-8 relative min-h-[360px]";

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Celebrities Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from respected leaders and speakers praising Hyderabad Defence Academy
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {slides[activeSlide]?.map((testimonial) => (
                <div key={testimonial.name} className={cardClass}>
                  <div className="absolute top-6 right-6 text-blue-900/10">
                    <Quote size={48} />
                  </div>

                  <div className="mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>

                  <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/95 shadow-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonials"
              >
                &#8249;
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/95 shadow-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Next testimonials"
              >
                &#8250;
              </button>
            </>
          )}

          {slides.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeSlide ? 1 : -1);
                    setActiveSlide(index);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide ? "w-8 bg-blue-900" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
