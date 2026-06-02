import { HeroSection } from "./components/HeroSection";
import { StorySection } from "./components/StorySection";
import { EventDetails } from "./components/EventDetails";
import { GallerySection } from "./components/GallerySection";
import { RSVPSection } from "./components/RSVPSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StorySection />
      <EventDetails />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </div>
  );
}