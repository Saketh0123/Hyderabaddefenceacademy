import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import { freshersImages } from "../data/freshersImages";
import { republicDayImages } from "../data/republicDayImages";
import { farewellGirlsImages } from "../data/farewellGirlsImages";
import { classroomImages } from "../data/classroomImages";
import { trainingImages } from "../data/trainingImages";
import { warriorMindsetImages } from "../data/warriorMindsetImages";

const galleryData: Record<string, { name: string; images: string[] }> = {
  classrooms: {
    name: "Classrooms",
    images: classroomImages,
  },
  events: {
    name: "Events",
    images: [
      "https://images.unsplash.com/photo-1771257808250-fa5fbffa8d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGV2ZW50JTIwc3R1ZGVudHMlMjBoYXBweXxlbnwxfHx8fDE3NzM5MzI4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1623546835805-ba3d0f9fb7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHVuaWZvcm0lMjBtYXJjaGluZ3xlbnwxfHx8fDE3NzM5MzI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1771257808250-fa5fbffa8d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGV2ZW50JTIwc3R1ZGVudHMlMjBoYXBweXxlbnwxfHx8fDE3NzM5MzI4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1623546835805-ba3d0f9fb7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHVuaWZvcm0lMjBtYXJjaGluZ3xlbnwxfHx8fDE3NzM5MzI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1771257808250-fa5fbffa8d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGV2ZW50JTIwc3R1ZGVudHMlMjBoYXBweXxlbnwxfHx8fDE3NzM5MzI4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1623546835805-ba3d0f9fb7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHVuaWZvcm0lMjBtYXJjaGluZ3xlbnwxfHx8fDE3NzM5MzI4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  farewells: {
    name: "Farewells",
    images: freshersImages,
  },
  "republic-day": {
    name: "Republic Day",
    images: republicDayImages,
  },
  "farewell-girls": {
    name: "Farewell Girls",
    images: farewellGirlsImages,
  },
  training: {
    name: "Training",
    images: trainingImages,
  },
  "warrior-mindset-programme": {
    name: "Warrior Mindset Programme",
    images: warriorMindsetImages,
  },
};

export function GalleryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [category]);

  const categoryData = category ? galleryData[category] : null;

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {categoryData.name}
            </h1>
            <p className="text-lg text-gray-600">
              Explore our collection of {categoryData.name.toLowerCase()} moments
            </p>
          </div>

          {categoryData.images.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
              No images added yet for this category. Add files in public/classroom-images, public/training-images, public/freshers-images, public/republic-day-images, public/farewell-girls-images, or public/warrior-mindset-images and update the corresponding data file in src/app/data.
            </div>
          )}

          {/* Masonry Gallery */}
          {categoryData.images.length > 0 && <Masonry columnsCount={3} gutter="1rem">
            {categoryData.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedImage(index)}
                className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group"
              >
                <img
                  src={image}
                  alt={`${categoryData.name} ${index + 1}`}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </Masonry>}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={categoryData.images[selectedImage]}
              alt={`${categoryData.name} ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}