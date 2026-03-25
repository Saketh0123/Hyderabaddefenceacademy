import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { freshersImages } from "../../data/freshersImages";
import { republicDayImages } from "../../data/republicDayImages";
import { farewellGirlsImages } from "../../data/farewellGirlsImages";
import { classroomImages } from "../../data/classroomImages";
import { trainingImages } from "../../data/trainingImages";
import { warriorMindsetImages } from "../../data/warriorMindsetImages";

const classroomThumbnail =
  classroomImages[0] ??
  "https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBlZHVjYXRpb24lMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzkzMjgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const farewellsThumbnail =
  freshersImages[0] ??
  "https://images.unsplash.com/photo-1571071481471-a20b04ecd6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJld2VsbCUyMHN0dWRlbnRzJTIwZW1vdGlvbmFsfGVufDF8fHx8MTc3MzkzMjgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const republicDayThumbnail =
  republicDayImages[0] ??
  "https://images.unsplash.com/photo-1526698542258-f7c17f192f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

const farewellGirlsThumbnail =
  farewellGirlsImages[0] ??
  "https://images.unsplash.com/photo-1571071481471-a20b04ecd6ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJld2VsbCUyMHN0dWRlbnRzJTIwZW1vdGlvbmFsfGVufDF8fHx8MTc3MzkzMjgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const trainingThumbnail =
  "/training-images/_DSC4324.JPG";

const warriorMindsetThumbnail =
  "/warrior-mindset-images/0S2A2748.JPG";

const categories = [
  {
    id: "classrooms",
    name: "Classrooms",
    image: classroomThumbnail,
  },
  {
    id: "farewells",
    name: "Farewells",
    image: farewellsThumbnail,
  },
  {
    id: "republic-day",
    name: "Republic Day",
    image: republicDayThumbnail,
  },
  {
    id: "farewell-girls",
    name: "Farewell Girls",
    image: farewellGirlsThumbnail,
  },
  {
    id: "training",
    name: "Training",
    image: trainingThumbnail,
  },
  {
    id: "warrior-mindset-programme",
    name: "Warrior Mindset Programme",
    image: warriorMindsetThumbnail,
  },
];

export function CategorySection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/gallery/${categoryId}`);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of memorable moments across different categories
          </p>
        </motion.div>

        {/* Desktop View - Grid Cards */}
        {!isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View - Circular Thumbnails with Horizontal Scroll */}
        {isMobile && (
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg active:scale-95 transition-transform">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">
                    {category.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
