import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { staffImages } from "../../data/staffImages";

const staffImageMap = new Map(staffImages.map((staff) => [staff.id, staff.image]));
const getStaffImage = (id: string, fallback: string) => staffImageMap.get(id) || fallback;

// Ordered list per request. Includes 9 staff entries (first + 8 others)
const staffMembers = [
  {
    id: "1",
    name: "DR. LN.K. RAJ KUMAR",
    role: "Chairman",
    image: getStaffImage(
      "1",
      "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzM5MjE5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ),
    experience: "Experienced Educational Leader",
    qualification: "LLB, MBA",
  },
  { id: "2", name: "Dr. R.K. Rao", role: "Chief Mentor", image: getStaffImage("2", ""), experience: "30+ Years (Indian Air Force + Academic Leadership)", qualification: "B.E., MBA" },
  { id: "3", name: "MR Anjaiah.M", role: "Principal", image: getStaffImage("3", ""), experience: "Experienced Academic Leader", qualification: "MA, M.Ed, M.Phil" },
  { id: "9", name: "Brigadier Prashant Halgeri", role: "Chief Advisor", image: getStaffImage("9", ""), experience: "36+ Years (Indian Army Leadership & Strategic Operations)", qualification: "M.Sc., M.Phil (Defence & Strategic Studies), MBA" },
  { id: "10", name: "Col. Shashir Kumar Das", role: "Chief Advisor", image: getStaffImage("10", ""), experience: "Senior Leadership Experience", qualification: "NCC Group Commander" },
  { id: "7", name: "Prof. D. Narayana Rao", role: "NDA Faculty", image: getStaffImage("7", ""), experience: "Experienced NDA Faculty", qualification: "Defence Exam Specialist" },
  { id: "8", name: "Prof. Raghu Kumar", role: "NDA Faculty", image: getStaffImage("8", ""), experience: "Experienced NDA Faculty", qualification: "Defence Exam Specialist" },
  { id: "6", name: "Prof. CSVS Murthy", role: "NDA Faculty", image: getStaffImage("6", ""), experience: "Experienced NDA Faculty", qualification: "Defence Exam Specialist" },
  { id: "5", name: "Ramalingam.T", role: "Mathematics Faculty", image: getStaffImage("5", ""), experience: "25+ Years (Mathematics Teaching & Competitive Exam Training)", qualification: "M.Sc., M.Ed., M.Phil" },
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

  const firstStaff = staffMembers[0];
  const otherStaff = staffMembers.slice(1);
  const leftColumn = otherStaff.slice(0, 4);
  const rightColumn = otherStaff.slice(4, 8);

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

        {/* Desktop View - First staff large, others in 3-column grid */}
        {!isMobile && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => handleStaffClick(firstStaff.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow mb-8"
            >
              <div className="flex items-center justify-center bg-white h-[520px] overflow-hidden">
                <img
                  src={firstStaff.image}
                  alt={firstStaff.name}
                  className="h-full w-auto object-contain mx-auto"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-extrabold uppercase text-gray-900 mb-2">{firstStaff.name}</h3>
                <p className="text-blue-900 font-medium mb-3">{firstStaff.role}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherStaff.map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => handleStaffClick(staff.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{staff.name}</h3>
                    <p className="text-blue-900 font-medium text-sm">{staff.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile View - first staff then two stacked columns (4 left, 4 right) */}
        {isMobile && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => handleStaffClick(firstStaff.id)}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer active:scale-95 transition-transform mb-4"
            >
              <div className="flex items-center justify-center bg-white">
                <img src={firstStaff.image} alt={firstStaff.name} className="h-80 w-auto mx-auto object-contain" />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-extrabold uppercase text-gray-900 mb-1">{firstStaff.name}</h3>
                <p className="text-xs text-blue-900 font-medium">{firstStaff.role}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {otherStaff.map((staff, i) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => handleStaffClick(staff.id)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                >
                  <div className="h-32 overflow-hidden">
                    <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{staff.name}</h3>
                    <p className="text-[10px] text-blue-900">{staff.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { staffMembers };
