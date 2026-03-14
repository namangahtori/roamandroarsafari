import Header from "@/components/Header";
import ZoneCard from "@/components/ZoneCard";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Shield, Clock, Award } from "lucide-react";

const zones = [
  {
    name: "Dhikala",
    image: "/images/dhikala.jpg",
    description:
      "The largest and most iconic zone, offering stunning grasslands and high chances of tiger spotting.",
    vehicleType: "canter" as const,
  },
  {
    name: "Bijrani",
    image: "/images/bijrani.jpg",
    description:
      "One of the most popular zones with excellent tiger sighting probability and diverse wildlife.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Garjiya",
    image: "/images/garjiya.jpg",
    description:
      "Located near the famous Garjiya Devi Temple, offering scenic river views and wildlife.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Jhirna",
    image: "/images/jhirna.jpg",
    description:
      "Open throughout the year, known for leopards, elephants, and sloth bears.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Dhela",
    image: "/images/dhela.jpg",
    description:
      "The newest zone with growing wildlife population and beautiful sal forests.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Durga Devi",
    image: "/images/durgadevi.jpg",
    description:
      "Perfect for bird watching with over 600 species and scenic hilly terrain.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Heritage",
    image: "/images/heritage.jpg",
    description:
      "Rich in historical significance with colonial-era forest rest houses.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Sitabani",
    image: "/images/sitabani.jpg",
    description:
      "Buffer zone ideal for nature walks and photography, rich in biodiversity.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Bhandharpani",
    image: "/images/bhandharpani.jpg",
    description:
      "Scenic zone with waterfalls and diverse flora, great for nature lovers.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Phato",
    image: "/images/phato.jpg",
    description:
      "Lesser-known zone with peaceful atmosphere and excellent wildlife sightings.",
    vehicleType: "jeep" as const,
  },
  {
    name: "Hathidagar",
    image: "/images/haathidagar.jpg",
    description:
      "Named after wild elephants, this zone offers exciting elephant encounters.",
    vehicleType: "jeep" as const,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <p className="text-[#d4a853] font-medium tracking-widest uppercase mb-4">
            Jim Corbett National Park
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-wide">
            ROAR & ROAM
          </h1>
          <p className="text-xl md:text-2xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto">
            Experience the wild beauty of India&apos;s oldest national park. Book your
            safari adventure and witness majestic tigers in their natural habitat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-gold text-lg">
              Book Your Safari
            </Link>
            <Link href="#zones" className="btn-outline text-lg">
              Explore Zones
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#d4a853] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#d4a853] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#262626]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a853]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#d4a853]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                GUARANTEED BOOKING
              </h3>
              <p className="text-[#a1a1aa] text-sm">
                Confirmed safari permits with hassle-free booking process
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a853]/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#d4a853]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                EXPERT NATURALISTS
              </h3>
              <p className="text-[#a1a1aa] text-sm">
                Experienced guides with deep knowledge of wildlife
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a853]/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#d4a853]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                INSTANT CONFIRMATION
              </h3>
              <p className="text-[#a1a1aa] text-sm">
                Quick WhatsApp booking with real-time availability updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section id="zones" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-[#d4a853] font-medium tracking-widest uppercase mb-3">
              Explore
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              SAFARI ZONES
            </h2>
            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
              Choose from 11 distinct zones, each offering unique wildlife experiences
              and breathtaking landscapes of Jim Corbett National Park.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => (
              <ZoneCard key={zone.name} {...zone} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#166534]/20 to-[#d4a853]/20" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            READY FOR THE WILD?
          </h2>
          <p className="text-lg text-[#a1a1aa] mb-8 max-w-xl mx-auto">
            Book your safari now and experience the thrill of spotting tigers,
            elephants, and exotic wildlife in their natural habitat.
          </p>
          <Link href="/booking" className="btn-gold text-lg inline-block">
            Book Your Safari Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-[#262626] py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-display text-2xl font-bold text-white mb-4 tracking-wide">
                ROAR & ROAM
              </h4>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                Your trusted partner for Jim Corbett National Park safari
                bookings. Experience wildlife like never before with our expert
                guided tours.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-4">
                QUICK LINKS
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#zones"
                    className="text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
                  >
                    Safari Zones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
                  >
                    Book Safari
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-4">
                CONTACT US
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="tel:+918077354975"
                    className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +91 8077354975
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/918077354975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#d4a853] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-3 text-[#a1a1aa]">
                    <MapPin className="h-4 w-4" />
                    Jim Corbett National Park
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#262626] mt-12 pt-8 text-center text-sm text-[#a1a1aa]">
            <p>&copy; 2026 Roar & Roam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
