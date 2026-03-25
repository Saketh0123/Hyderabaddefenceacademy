import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, Award, BookOpen, Calendar } from "lucide-react";
import { staffMembers } from "../components/sections/StaffSection";
import { useEffect } from "react";

const staffDetails: Record<
  string,
  {
    bio: string;
    achievements: string[];
    specializations: string[];
  }
> = {
  "1": {
    bio: "Sri. Lion K. Raj Kumar is an accomplished writer having authored several text books in his field of interest, Geography. He has earned his Masters degree in Management from Osmania University and an LLB from Kakatiya University.\n\nBeing an effective educational leader requires a complex set of knowledge, skills, and qualities; and Sri. Lion K. Raj Kumar is adept at all. He is a progressive leader who believes that inclusion, integrity and insight are the keys to good administration.\n\nHe is a firm believer in the infinite potential of young minds he mentors and adheres to the principle that education is incomplete without incorporating core values within the system.\n\nHe possesses a clear vision and a strong sense of purpose. He is a self driven leader with excellent communication and interpersonal skills.\n\nHe has established and partnered with a number of schools, junior colleges, and degree & P.G colleges.",
    achievements: [
      "Authored multiple academic textbooks in Geography",
      "Holds MBA (Osmania University) and LLB (Kakatiya University)",
      "Established and partnered with multiple educational institutions",
      "Promotes value-based and inclusive education systems",
    ],
    specializations: [
      "Educational Leadership & Administration",
      "Student Development & Mentorship",
      "Institutional Growth & Partnerships",
      "Value-Based Education Systems",
    ],
  },
  "2": {
    bio: "A man with 30 years of distinguished service in the Indian Air Force, Dr. R.K. Rao has held many important appointments throughout his career. After retirement, he worked as Principal and Chief Administrator in multiple academies before joining Hyderabad Defence Academy as Chief Mentor.\n\nHe is a pioneer in creating awareness about national-level competitive exams and has produced outstanding results in IIT-JEE, NDA, and engineering entrance exams for Indian Navy, Army, and Air Force. His expertise also extends to training candidates for technical roles in the Armed Forces including Air Force, Navy, Army, and Coast Guard.\n\nHe holds an Engineering degree along with a Master's degree in Management, combining technical expertise with strong leadership and administrative skills.",
    achievements: [
      "30+ years of distinguished service in the Indian Air Force",
      "Held multiple high-level leadership and administrative roles",
      "Served as Principal and Chief Administrator in reputed academies",
      "Mentored students achieving success in IIT-JEE, NDA, and defence exams",
      "Specialized in training candidates for Armed Forces technical positions",
    ],
    specializations: [
      "Defence Training & Competitive Exam Guidance",
      "Academic Leadership & Institutional Administration",
      "IIT-JEE, NDA & Engineering Entrance Coaching",
      "Strategic Mentorship & Career Development",
    ],
  },
  "3": {
    bio: "Macha Anjaiah is the Principal and an experienced academic leader with a strong foundation in teaching, mentoring, and institutional administration. He has played an important role in shaping student-focused academic environments and maintaining high educational standards.",
    achievements: [
      "Led student-centric academic initiatives",
      "Contributed to institutional development and discipline",
      "Guided students across multiple competitive streams",
      "Known for structured and practical academic leadership",
    ],
    specializations: [
      "Academic Leadership",
      "Student Mentorship",
      "Institutional Administration",
      "Curriculum Guidance",
    ],
  },
  "4": {
    bio: "Srisailam is a dedicated Physics faculty member known for clear conceptual teaching and student-friendly instruction. He focuses on helping aspirants build strong fundamentals and confidence required for defence and competitive examinations.",
    achievements: [
      "Guided students in core and advanced Physics topics",
      "Known for strong conceptual teaching approach",
      "Helped aspirants improve problem-solving skills",
      "Consistent support for defence exam preparation",
    ],
    specializations: [
      "Physics Fundamentals",
      "Problem Solving Techniques",
      "Competitive Exam Preparation",
      "Concept-Based Teaching",
    ],
  },
  "5": {
    bio: "T. Ramalingam Sir is a renowned Mathematics faculty with over 25 years of teaching experience. He has successfully trained thousands of aspirants throughout his career.\n\nFor the past several years, he has been guiding students to tackle some of the toughest national-level competitive exams such as IIT-JEE, NDA, and engineering entrance examinations for the Indian Navy and Army, along with other competitive exams.\n\nHis strong academic background combined with practical teaching expertise makes him highly effective in simplifying complex mathematical concepts for students.",
    achievements: [
      "25+ years of experience in Mathematics education",
      "Trained thousands of students for competitive exams",
      "Expertise in IIT-JEE, NDA, and engineering entrance coaching",
      "Known for simplifying complex mathematical concepts",
      "Consistent track record of student success",
    ],
    specializations: [
      "Advanced Mathematics & Problem Solving",
      "IIT-JEE & NDA Mathematics Coaching",
      "Competitive Exam Preparation Strategies",
      "Concept-Based Teaching & Student Guidance",
    ],
  },
  "6": {
    bio: "Prof. CSVS Murthy is a committed NDA faculty member with extensive experience in training students for defence entrance examinations. His practical guidance and exam-oriented methods help aspirants prepare with confidence and discipline.",
    achievements: [
      "Mentored students for NDA and related defence exams",
      "Designed focused preparation strategies for aspirants",
      "Known for disciplined and practical training methods",
      "Helped students improve exam readiness and confidence",
    ],
    specializations: [
      "NDA Exam Coaching",
      "Defence Aptitude Preparation",
      "Student Mentorship",
      "Exam Strategy",
    ],
  },
  "7": {
    bio: "Prof. D. Narayana Rao is an experienced NDA faculty member known for his student-friendly approach and strong command over defence exam preparation topics. He helps aspirants build confidence through structured practice and conceptual clarity.",
    achievements: [
      "Experienced faculty for NDA preparation",
      "Guided aspirants across competitive defence streams",
      "Known for clear and methodical teaching",
      "Strong focus on student outcomes",
    ],
    specializations: [
      "NDA Coaching",
      "Concept Clarity",
      "Competitive Exam Guidance",
      "Student Mentorship",
    ],
  },
  "8": {
    bio: "Prof. Raghu Kumar is a dedicated NDA faculty member with extensive classroom experience in competitive coaching. His teaching style emphasizes fundamentals, practice, and strategic exam preparation for defence aspirants.",
    achievements: [
      "Trained students for NDA and allied exams",
      "Built strong classroom engagement and discipline",
      "Focused on result-oriented preparation",
      "Helped aspirants strengthen core competencies",
    ],
    specializations: [
      "NDA Exam Preparation",
      "Competitive Coaching",
      "Problem Solving",
      "Student Guidance",
    ],
  },
  "9": {
    bio: "Brigadier Prashant Halgeri (Indian Army Veteran) brings over 36 years of distinguished service in the Indian Army. He has held key strategic and operational leadership roles across the country and abroad, with his last assignment as Director Education at HQ TASA.\n\nHis extensive experience spans multiple terrains and regions including Jammu & Kashmir, North East, and desert areas. He has also contributed significantly in instructional and teaching capacities, shaping military leaders at various levels.\n\nA subject matter expert in HR management, security, and operational readiness, he has been actively involved in training and capacity building programs for cadets to senior military leadership.\n\nHe is highly qualified in tactics, weapons, and military technology, with hands-on experience in their application, maintenance, and operational deployment across diverse environments.\n\nBrigadier Halgeri has also served in conflict zones including UN assignments in the Democratic Republic of Congo, where he led high-performance teams and managed complex operations involving government bodies, NGOs, and civil organizations.",
    achievements: [
      "36+ years of service in the Indian Army",
      "Served as Director Education at HQ TASA",
      "Extensive operational experience across J&K, North East, and desert regions",
      "Led missions in international conflict zones including UN assignments",
      "Expert in training military leaders from cadet to senior levels",
      "Managed large-scale operations including planning, budgeting, and execution",
    ],
    specializations: [
      "Strategic Military Leadership & Operations",
      "Defence Training & Capacity Building",
      "Security, HR & Operational Readiness",
      "Tactics, Weapons & Military Technology",
    ],
  },
  "10": {
    bio: "Col. Shashir Kumar Das serves as Chief Advisor with distinguished leadership experience as an NCC Group Commander. He provides strategic guidance, discipline-oriented mentorship, and direction for developing future defence aspirants.",
    achievements: [
      "Served in senior leadership roles",
      "NCC Group Commander with deep operational insight",
      "Guides institutional strategy and student discipline",
      "Supports defence-oriented career mentoring",
    ],
    specializations: [
      "Strategic Defence Guidance",
      "Leadership Development",
      "NCC-Oriented Mentorship",
      "Institutional Advisory",
    ],
  },
};

export function StaffDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blankRightSideIds = new Set(["3", "4", "6", "7", "8", "10"]);

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const staff = staffMembers.find((s) => s.id === id);
  const details = id ? staffDetails[id] : null;
  const shouldHideRightSide = staff ? blankRightSideIds.has(staff.id) : false;

  if (!staff || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff member not found</h1>
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
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-32">
              <div className="mb-6">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full aspect-square object-cover rounded-xl shadow-lg mb-6"
                />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{staff.name}</h1>
                <p className="text-xl text-blue-900 font-medium mb-4">{staff.role}</p>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="text-blue-900" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{staff.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <BookOpen className="text-blue-900" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Qualification</p>
                    <p className="font-medium">{staff.qualification}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <a
                  href="mailto:hyderabaddefenceacademy@gmail.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-900 transition-colors"
                >
                  <Mail size={20} />
                  <span className="text-sm">Send Email</span>
                </a>
                <a
                  href="tel:9515234222"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-900 transition-colors"
                >
                  <Phone size={20} />
                  <span className="text-sm">Call Now</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {!shouldHideRightSide && (
              <>
                {/* Biography */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{details.bio}</p>
                </div>

                {/* Specializations */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details.specializations.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-blue-50 rounded-lg p-4"
                      >
                        <div className="w-2 h-2 bg-blue-900 rounded-full" />
                        <span className="text-gray-900 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h2>
                  <div className="space-y-4">
                    {details.achievements.map((achievement, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center mt-1">
                          <Award className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{achievement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {staff.id === "1"
                      ? "Want to learn from our leadership?"
                      : staff.id === "2"
                        ? "Want to learn from our mentors?"
                        : staff.id === "5" || staff.id === "9"
                          ? "Want to learn from our experts?"
                          : `Want to learn from ${staff.name.split(" ")[0]}?`}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {staff.id === "5" || staff.id === "9"
                      ? "Join Hyderabad Defence Academy today and get guidance from our experienced faculty"
                      : "Join Hyderabad Defence Academy today and get guidance from our expert faculty"}
                  </p>
                  <button
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    }}
                    className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Contact Us
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}