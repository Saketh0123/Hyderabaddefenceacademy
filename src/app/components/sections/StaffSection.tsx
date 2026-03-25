import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { staffImages } from "../../data/staffImages";

const staffImageMap = new Map(staffImages.map((staff) => [staff.id, staff.image]));
const getStaffImage = (id: string, fallback: string) => staffImageMap.get(id) || fallback;

const staffMembers = [
  {
    id: "1",
    name: "Ln. Dr. K. Raj Kumar",
    role: "Chairman",
    image: getStaffImage(
      "1",
      "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzM5MjE5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "Experienced Educational Leader",
    qualification: "LLB, MBA",
  },
  {
    id: "2",
    name: "Dr. R.K. Rao",
    role: "Chief Mentor",
    image: getStaffImage(
      "2",
      "https://images.unsplash.com/photo-1758685848147-e1e149bf2603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwdGVhY2hlcnxlbnwxfHx8fDE3NzM5MzI4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "30+ Years (Indian Air Force + Academic Leadership)",
    qualification: "B.E., MBA",
  },
  {
    id: "3",
    name: "Macha Anjaiah",
    role: "Principal",
    image: getStaffImage(
      "3",
      "https://images.unsplash.com/photo-1718434114814-a6eb91717c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJpdHklMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM5MzI4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "Experienced Academic Leader",
    qualification: "MA, M.Ed, M.Phil",
  },
  {
    id: "4",
    name: "Srisailam",
    role: "Physics Faculty",
    image: getStaffImage(
      "4",
      "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwZXhlY3V0aXZlfGVufDF8fHx8MTc3MzkzMjg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "Experienced Physics Educator",
    qualification: "M.Sc., M.Ed.",
  },
  {
    id: "5",
    name: "T. Ramalingam",
    role: "Mathematics Faculty",
    image: getStaffImage(
      "5",
      "https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwdGVhY2hlcnxlbnwxfHx8fDE3NzM5MzI4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "25+ Years (Mathematics Teaching & Competitive Exam Training)",
    qualification: "M.Sc., M.Ed., M.Phil",
  },
  {
    id: "6",
    name: "Prof. CSVS Murthy",
    role: "NDA Faculty",
    image: getStaffImage(
      "6",
      "https://images.unsplash.com/photo-1758685848147-e1e149bf2603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwdGVhY2hlcnxlbnwxfHx8fDE3NzM5MzI4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "Experienced NDA Faculty",
    qualification: "Defence Exam Specialist",
  },
  {
    id: "7",
    name: "Prof. D. Narayana Rao",
    role: "NDA Faculty",
    image: getStaffImage(
      "7",
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ),
    experience: "Experienced NDA Faculty",
    qualification: "Defence Exam Specialist",
  },
  {
    id: "8",
    name: "Prof. Raghu Kumar",
    role: "NDA Faculty",
    image: getStaffImage(
      "8",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ),
    experience: "Experienced NDA Faculty",
    qualification: "Defence Exam Specialist",
  },
  {
    id: "9",
    name: "Brig. Prashant Halgeri",
    role: "Chief Advisor",
    image: getStaffImage(
      "9",
      "https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ),
    experience: "36+ Years (Indian Army Leadership & Strategic Operations)",
    qualification: "M.Sc., M.Phil (Defence & Strategic Studies), MBA",
  },
  {
    id: "10",
    name: "Col. Shashir Kumar Das",
    role: "Chief Advisor",
    image: getStaffImage(
      "10",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ),
    experience: "Senior Leadership Experience",
    qualification: "NCC Group Commander",
  },
];

export function StaffSection() {
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

  const handleStaffClick = (staffId: string) => {
    navigate(`/staff/${staffId}`);
  };

  return (
    <section id="staff" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Expert Staff
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of experienced professionals committed to your success
          </p>
        </motion.div>

        {/* Desktop View - Grid Cards */}
        {!isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleStaffClick(staff.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                  <p className="text-blue-900 font-medium mb-3">{staff.role}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Experience: {staff.experience}</p>
                    <p>{staff.qualification}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View - Thumbnail Cards */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-4">
            {staffMembers.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleStaffClick(staff.id)}
                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer active:scale-95 transition-transform"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{staff.name}</h3>
                  <p className="text-xs text-blue-900 font-medium line-clamp-2">{staff.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { staffMembers };
