import { motion } from "motion/react";
import { Camera } from "lucide-react";

export function CTASection() {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 md:p-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Camera size={40} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Preserving Every Important Moment<br />at Hyderabad Defence Academy
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join us in creating and capturing memories that will last a lifetime. 
            Be part of our journey towards excellence.
          </p>
          <motion.button
            onClick={handleContactClick}
            className="px-8 py-4 bg-white text-blue-900 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
