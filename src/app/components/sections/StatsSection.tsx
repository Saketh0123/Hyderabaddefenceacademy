import { motion } from "motion/react";
import { Award, Users, Calendar, Trophy } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "20+",
    label: "Years of Excellence",
  },
  {
    icon: Users,
    value: "5000+",
    label: "Trained Students",
  },
  {
    icon: Trophy,
    value: "93%",
    label: "Success rate in defence services",
  },
  {
    icon: Award,
    value: "96.8%",
    label: "Merit in intermediate",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                  <Icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
