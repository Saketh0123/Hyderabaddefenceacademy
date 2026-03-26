import { AnimatePresence, motion } from "motion/react";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description: string;
  }>({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

  const showPopup = (type: "success" | "error", title: string, description: string) => {
    setPopup({ open: true, type, title, description });
    window.setTimeout(() => {
      setPopup((prev) => ({ ...prev, open: false }));
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact message");
      }

      showPopup(
        "success",
        "Message Sent Successfully",
        "Thank you for contacting us. Our team will reach out soon.",
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      showPopup(
        "error",
        "Message Not Sent",
        "Unable to send your message right now. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <AnimatePresence>
        {popup.open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 left-4 right-4 sm:right-6 sm:left-auto z-50 w-auto sm:w-full sm:max-w-md"
          >
            <div
              className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-sm ${
                popup.type === "success"
                  ? "bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700"
                  : "bg-gradient-to-r from-red-700 to-red-600 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {popup.type === "success" ? (
                    <CheckCircle2 className="text-white" size={22} />
                  ) : (
                    <AlertCircle className="text-white" size={22} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base">{popup.title}</p>
                  <p className="text-white/90 text-xs sm:text-sm mt-1 leading-relaxed">{popup.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPopup((prev) => ({ ...prev, open: false }))}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close notification"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries or to learn more about our programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <p className="text-gray-600 mb-8">We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <a
                    href="https://maps.google.com/maps?sca_esv=0693a25b4e112fe7&sxsrf=ANbL-n7-jdl8hYl05VAxImDlUSRxnpT9vA:1774548291930&iflsig=AFdpzrgAAAAAacWDU4sHNb6S3gjbV-zgL8Kf8kKeh3GO&gs_lp=Egdnd3Mtd2l6IgxoeWRlcmFiYWQgZGUqAggAMgQQIxgnMhMQLhiABBhDGMcBGIoFGI4FGK8BMgUQABiABDIKEAAYgAQYFBiHAjIKEAAYgAQYQxiKBTIOEC4YgAQYxwEYjgUYrwEyChAAGIAEGEMYigUyBRAAGIAEMgUQABiABDIKEC4YgAQYQxiKBUiSelDWEVjWRnABeACQAQCYAYUwoAGnowGqAQM5LTS4AQHIAQD4AQGYAgWgAumjAagCCsICBxAjGCcY6gLCAgoQIxgnGMkCGOoCwgINECMY8AUYJxjqAhieBsICDRAjGPAFGCcYyQIY6gLCAgoQIxiABBgnGIoFwgIQECMY8AUYgAQYJxjJAhiKBcICDhAAGIAEGJECGLEDGIoFwgINEC4YgAQYsQMYFBiHAsICDRAAGIAEGLEDGEMYigXCAggQABiABBixA8ICERAuGIAEGLEDGMcBGI4FGK8BwgINEAAYgAQYsQMYFBiHApgDFfEFiYpNcuuZXPmSBwUxLjktNKAH6zqyBwM5LTS4B9SjAcIHAzMtNcgHNoAIAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KVc9prjgd8s7McALjzi2t_YD&daddr=GSR+ROAD,+NEW,+Keesara,+Rangapur,+Telangana+508126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline"
                  >
                    Hyderabad Defence Academy, Rangapur, Keesara,
                    <br />
                    Hyderabad, Telangana - 508126
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                    <img src="https://hyderabaddefenceacademy.com/assets/uploads/logo.png" alt="HDA logo" className="h-6 w-auto" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Our Branches</h4>
                    <div className="flex flex-col text-gray-600 gap-2 mt-2">
                      <a href="https://maps.google.com/maps?sca_esv=0693a25b4e112fe7&daddr=GSR+ROAD,+NEW,+Keesara,+Rangapur,+Telangana+508126" target="_blank" rel="noopener noreferrer" className="hover:underline">Keesara</a>
                      <a href="https://maps.google.com/maps?sca_esv=0693a25b4e112fe7&daddr=Yadagirigutta" target="_blank" rel="noopener noreferrer" className="hover:underline">Yadagirigutta</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                  <div className="text-gray-600 space-y-1">
                    <a className="block text-gray-600 hover:underline" href="tel:+919515234222">+91 95152 34222</a>
                    <a className="block text-gray-600 hover:underline" href="tel:+918008122933">+91 80081 22933</a>
                    <a className="block text-gray-600 hover:underline" href="tel:+917893319710">+91 78933 19710</a>
                    <a className="block text-gray-600 hover:underline" href="tel:+919985319710">+91 99853 19710</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <a
                    href={`mailto:hyderabaddefenceacademy@gmail.com?subject=${encodeURIComponent("Inquiry from Website")}&body=${encodeURIComponent("Hello Hyderabad Defence Academy,\n\nI would like to enquire about...")}`}
                    className="text-gray-600 hover:underline"
                  >
                    hyderabaddefenceacademy@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-6">
              <a
                href={`https://wa.me/919515234222?text=${encodeURIComponent("Hello Hyderabad Defence Academy, I would like to enquire about...")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form id="contact-form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-shadow"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-shadow"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-shadow"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-shadow resize-none"
                    placeholder="How can we help you? (optional)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  <Send size={20} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
