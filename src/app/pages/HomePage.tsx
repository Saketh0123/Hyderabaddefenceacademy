import { HeroSection } from "../components/sections/HeroSection";
import { CategorySection } from "../components/sections/CategorySection";
import { AboutSection } from "../components/sections/AboutSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { StaffSection } from "../components/sections/StaffSection";
import { StatsSection } from "../components/sections/StatsSection";
import { CTASection } from "../components/sections/CTASection";
import { ContactSection } from "../components/sections/ContactSection";
import { MapSection } from "../components/sections/MapSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <AboutSection />
      <TestimonialsSection />
      <StaffSection />
      <StatsSection />
      <CTASection />
      <ContactSection />
      <MapSection />
    </>
  );
}
