import { motion } from "motion/react";
import { Award, Target, Users } from "lucide-react";
import { heroImages } from "../../data/heroImages";

const aboutImage = heroImages[0] ?? {
  src: "/hero-images/hero1.webp",
  alt: "Hyderabad Defence Academy Building",
};

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImage.src}
                alt={aboutImage.alt}
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-900/10 rounded-2xl -z-10 hidden lg:block" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hyderabad Defence Academy stands as a beacon of excellence in defence education, 
              nurturing young minds to become future leaders through discipline, dedication, and determination.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our academy is committed to providing world-class training facilities, experienced faculty, 
              and a holistic approach to education that encompasses physical fitness, mental resilience, 
              and character building. We take pride in our students' achievements and the memorable 
              moments we create together on this transformative journey.
            </p>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower aspiring defence professionals with exceptional training, 
                    strong values, and the skills needed to serve the nation with honor.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be recognized as the leading defence academy in the region, 
                    known for excellence in training and the success of our students.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
                  <p className="text-gray-600">
                    Discipline, integrity, excellence, and a commitment to nurturing 
                    well-rounded individuals who will make a difference.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
