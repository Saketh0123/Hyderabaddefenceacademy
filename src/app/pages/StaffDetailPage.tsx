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
    bio: "Chairman's Vision – Hyderabad Defence College\n\nDr. LN. K. Raj Kumar, the esteemed Chairman of Hyderabad Defence Academy and Junior College , is a visionary leader who has built the institution on the strong foundations of ethics, discipline, moral values, and national service. With an unwavering commitment to shaping the youth of the nation, he has dedicated his life to inspiring and preparing young aspirants to join the Indian Armed Forces and serve the country with pride, honour, and integrity.\n\nFrom an early age, Dr. Raj Kumar nurtured a deep aspiration to serve the nation in uniform. While circumstances did not allow him to fulfill that dream personally, he transformed his vision into a greater mission — establishing a premier defence institution that empowers students to achieve what he once envisioned. Today, under his dynamic leadership and guidance, numerous students have successfully secured positions in prestigious defence services, including the National Defence Academy (NDA).\n\nRecognized for its commitment to excellence, discipline, and result-oriented training, Hyderabad Defence Academy proudly stands as South India's No.1 Defence Academy  and most trusted defence training institutions, setting benchmarks in both academic and physical preparation for defence aspirants.\n\nUnder his stewardship, the institution has emerged as a centre of excellence where students are trained holistically — academically, physically, and mentally — to meet the rigorous standards of the armed forces and to develop into responsible, resilient, and nation-first individuals.\n\nDr. Raj Kumar firmly believes that being born in India is a privilege that comes with a duty to serve the nation. His guiding philosophy, inspired by the timeless spirit of \"Jai Jawan, Jai Kisan,\" reflects his deep respect for those who protect and sustain the nation.\n\nThrough his relentless dedication and visionary leadership, he continues to inspire generations of youth to uphold the honour, integrity, and pride of India by serving in the armed forces.\nJAI HIND.",
    achievements: [],
    specializations: [],
  },
  "2": {
    bio: "Dr. RK. Rao, Chief Mentor at Hyderabad Defence Academy, is a highly accomplished professional with over 30 years of service in the Indian Air Force and strong academic leadership experience. With qualifications in Engineering (B.E.) and Management (MBA), he has held key leadership and administrative roles and is a pioneer in defence training and competitive exam guidance. Known for his strategic, result-oriented mentorship, he has consistently guided students to success in IIT-JEE, NDA, and various defence entrance exams, while continuing to inspire aspirants with a focus on discipline, excellence, and service to the nation.",
    achievements: [],
    specializations: [],
  },
  "3": {
    bio: "Mr. Anjaiah M., Principal of Hyderabad Defence Academy & Junior College, is a distinguished academic leader with over 25 years of experience in the field of education. Holding advanced qualifications including M.A., M.Ed., and M.Phil., he has consistently demonstrated excellence in academic administration and student development. Under his leadership, the institution has achieved commendable results, including State Ranks in Intermediate Board Examinations and notable success in competitive examinations such as NDA, JEE Mains & Advanced, and EAPCET. His disciplined, student-centric approach and commitment to high academic standards have significantly contributed to nurturing competent, responsible, and future-ready individuals aligned with the institution's vision of national service.",
    achievements: [],
    specializations: [],
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
    bio: "Chief Advisor – Hyderabad Defence Academy\n\nBrigadier Prashant Halgeri, Chief Advisor of Hyderabad Defence Academy, is a distinguished Indian Army veteran with over 36 years of exemplary service in leadership, strategy, and operational excellence. Holding advanced qualifications in Defence & Strategic Studies (M.Sc., M.Phil) and an MBA, he has served in key leadership roles across diverse and challenging terrains, including Jammu & Kashmir, the North East, and desert sectors. A seasoned expert in strategic operations, security, HR management, and operational readiness, he has extensively trained and mentored personnel from cadets to senior leaders, with notable international experience through United Nations assignments in the Democratic Republic of Congo, successfully leading complex missions. Renowned for his expertise in tactics, weapons, and military technology, Brigadier Halgeri continues to guide and inspire defence aspirants with a strong vision of excellence, discipline, and national service",
    achievements: [],
    specializations: [],
  },
  "10": {
    bio: "Colonel Shashir Kumar Das, Chief Advisor of Hyderabad Defence Academy, is a distinguished Indian Army officer and an eminent leader in youth development through the National Cadet Corps (NCC). Having served as Commander of the NCC Andhra Pradesh & Telangana Directorate, he is widely recognized for implementing transformative reforms that enhanced training standards, discipline, and overall organizational effectiveness. With a strong foundation in values, discipline, and leadership, he has consistently inspired and mentored young aspirants, instilling in them a spirit of service, responsibility, and patriotism. In his role as Chief Advisor, he provides strategic guidance and direction to the institution, ensuring the development of confident, disciplined, and nation-ready individuals aligned with the highest standards of the armed forces.",
    achievements: [],
    specializations: [],
  },
};

export function StaffDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blankRightSideIds = new Set(["4", "6", "7", "8"]);

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
                {details.specializations.length > 0 && (
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
                )}

                {/* Achievements */}
                {details.achievements.length > 0 && (
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
                )}

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {`Want to learn from ${staff.name}?`}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {staff.id === "5" || staff.id === "9"
                      ? "Join Hyderabad Defence Academy today and get guidance from our experienced faculty"
                      : "Join Hyderabad Defence Academy today and get guidance from our expert faculty"}
                  </p>
                  <button
                    onClick={() => {
                      navigate("/contact#contact-form");
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