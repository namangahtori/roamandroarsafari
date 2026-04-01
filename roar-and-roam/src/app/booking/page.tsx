"use client";

import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useMemo } from "react";
import { Phone, MessageCircle, AlertCircle, Car, Bus, MapPin } from "lucide-react";
import { validateBookingForm, sanitizeString } from "@/lib/validation";

interface ZoneInfo {
  name: string;
  price: number;
  priceLabel: string;
  vehicleType: "jeep" | "canter";
  advance: number | "full";
  maxGuests: number;
}

const zonesData: ZoneInfo[] = [
  { name: "Dhikala", price: 2500, priceLabel: "/person", vehicleType: "canter", advance: "full", maxGuests: 16 },
  { name: "Bijrani", price: 7600, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Garjiya", price: 7500, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Jhirna", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Dhela", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Durga Devi", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Heritage", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Sitabani", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 2000, maxGuests: 6 },
  { name: "Bhandharpani", price: 7700, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
  { name: "Phato", price: 7300, priceLabel: "/jeep", vehicleType: "jeep", advance: 2000, maxGuests: 6 },
  { name: "Hathidagar", price: 7300, priceLabel: "/jeep", vehicleType: "jeep", advance: 4000, maxGuests: 6 },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919870969734";

function BookingForm() {
  const searchParams = useSearchParams();
  const preSelectedZone = searchParams.get("zone") || "";
  const isZonePreSelected = Boolean(preSelectedZone && zonesData.some(z => z.name === preSelectedZone));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    aadhaar: "",
    zone: isZonePreSelected ? preSelectedZone : "",
    date: "",
    guests: "2",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const selectedZoneInfo = useMemo(() => {
    return zonesData.find((z) => z.name === formData.zone);
  }, [formData.zone]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const maxGuests = selectedZoneInfo?.maxGuests || 6;
    const validation = validateBookingForm(formData, maxGuests);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Sanitize inputs before sending
    const sanitizedName = sanitizeString(formData.name);
    const sanitizedEmail = sanitizeString(formData.email);

    const zoneInfo = selectedZoneInfo;
    const advanceText = zoneInfo?.advance === "full"
      ? "Full Payment Required"
      : `₹${zoneInfo?.advance?.toLocaleString("en-IN")} Advance`;

    const message = `Safari Booking Request

*Personal Details*
Name: ${sanitizedName}
Phone: ${formData.phone.replace(/\D/g, "")}
Email: ${sanitizedEmail}
Aadhaar: ${formData.aadhaar}

*Booking Details*
Zone: ${formData.zone}
Date: ${formData.date}
Guests: ${formData.guests}
Vehicle: ${zoneInfo?.vehicleType === "canter" ? "Canter Safari" : "Jeep Safari"}

*Payment Info*
Price: ₹${zoneInfo?.price?.toLocaleString("en-IN")}${zoneInfo?.priceLabel}
Advance: ${advanceText}

Please confirm availability and booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }

    // For Aadhaar, only allow digits and max 12
    if (name === "aadhaar") {
      const cleaned = value.replace(/\D/g, "").slice(0, 12);
      setFormData({ ...formData, [name]: cleaned });
      return;
    }

    // For phone, only allow digits and common separators
    if (name === "phone") {
      const cleaned = value.replace(/[^\d+\-\s]/g, "");
      setFormData({ ...formData, [name]: cleaned });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Minimum date is today + 3 days
  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split("T")[0];
  }, []);

  // Generate guest options based on zone
  const guestOptions = useMemo(() => {
    const max = selectedZoneInfo?.maxGuests || 6;
    return Array.from({ length: max }, (_, i) => i + 1);
  }, [selectedZoneInfo]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Error Display */}
      {errors.length > 0 && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
          <ul className="text-sm text-red-400 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Zone Selection - Only show if NOT pre-selected */}
      {!isZonePreSelected ? (
        <div>
          <label
            htmlFor="zone"
            className="block text-sm font-medium text-[#a1a1aa] mb-2"
          >
            Select Safari Zone
          </label>
          <select
            id="zone"
            name="zone"
            required
            value={formData.zone}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Choose a zone</option>
            {zonesData.map((zone) => (
              <option key={zone.name} value={zone.name}>
                {zone.name} - ₹{zone.price.toLocaleString("en-IN")}{zone.priceLabel}
              </option>
            ))}
          </select>
        </div>
      ) : (
        /* Show selected zone info when pre-selected */
        <div className="card p-4 border-[#d4a853]/30">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#d4a853]" />
            <div>
              <p className="text-sm text-[#a1a1aa]">Selected Zone</p>
              <p className="text-xl font-display font-bold text-white">{formData.zone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Zone Info Display - Show pricing after zone is selected */}
      {selectedZoneInfo && (
        <div className="card p-4 border-[#262626]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {selectedZoneInfo.vehicleType === "canter" ? (
                <Bus className="h-5 w-5 text-[#4ade80]" />
              ) : (
                <Car className="h-5 w-5 text-[#d4a853]" />
              )}
              <div>
                <p className="text-sm text-[#a1a1aa]">
                  {selectedZoneInfo.vehicleType === "canter" ? "Canter Safari" : "Jeep Safari"}
                </p>
                <p className="text-xs text-[#666]">
                  Max {selectedZoneInfo.maxGuests} guests
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#d4a853]">
                ₹{selectedZoneInfo.price.toLocaleString("en-IN")}
                <span className="text-sm font-normal text-[#a1a1aa]">
                  {selectedZoneInfo.priceLabel}
                </span>
              </p>
              <p className="text-sm text-[#a1a1aa]">
                Advance: {selectedZoneInfo.advance === "full"
                  ? "Full Payment"
                  : `₹${selectedZoneInfo.advance.toLocaleString("en-IN")}`}
              </p>
            </div>
          </div>

          {selectedZoneInfo.name === "Dhikala" && (
            <div className="mt-4 p-3 bg-[#166534]/20 rounded-lg border border-[#166534]/40 space-y-2">
              <p className="text-sm text-[#4ade80] flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Max 16 people per canter. For larger groups, please contact us directly.
              </p>
              <p className="text-sm text-[#4ade80] flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                For Jeep Safari in Dhikala, the state government requires the guests to stay a day in their quarters for the night, for which arrangements are to be made and will incur more cost.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Personal Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="aadhaar"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Aadhaar Number (12 digits) *
            </label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              required
              inputMode="numeric"
              value={formData.aadhaar}
              onChange={handleChange}
              className="form-input"
              placeholder="XXXX XXXX XXXX"
              maxLength={12}
            />
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">
          Booking Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Safari Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={minDate}
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
            <p className="text-xs text-[#666] mt-1">
              Minimum 3 days advance booking
            </p>
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-[#a1a1aa] mb-2"
            >
              Number of Guests *
            </label>
            <select
              id="guests"
              name="guests"
              required
              value={formData.guests}
              onChange={handleChange}
              className="form-input"
            >
              {guestOptions.map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formData.zone}
        className="w-full btn-gold text-lg flex items-center justify-center gap-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Booking
      </button>
    </form>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-[#d4a853] font-medium tracking-widest uppercase mb-3">
              Reserve Your Spot
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              BOOK YOUR SAFARI
            </h1>
            <p className="text-lg text-[#a1a1aa]">
              Fill in the details below and we&apos;ll confirm your Jim Corbett
              safari experience.
            </p>
          </div>

          <div className="card p-6 sm:p-8 mb-8">
            <Suspense
              fallback={
                <div className="text-center py-8 text-[#a1a1aa]">Loading form...</div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>

          {/* Disclaimers */}
          <div className="card p-6 border-[#d4a853]/30 mb-8">
            <h3 className="font-display text-lg font-semibold text-[#d4a853] mb-4">
              IMPORTANT INFORMATION
            </h3>
            <ul className="space-y-3 text-sm text-[#a1a1aa]">
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-[#d4a853] mt-0.5 flex-shrink-0" />
                <span>
                  Online booking requires minimum 3 days advance. For earlier slots,
                  please call us directly at{" "}
                  <a href="tel:+918077354975" className="text-[#d4a853] hover:underline">
                    +91 8077354975
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-[#d4a853] mt-0.5 flex-shrink-0" />
                <span>
                  Advance amount is non-refundable as it is paid to the government
                  in advance for permit bookings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-[#d4a853] mt-0.5 flex-shrink-0" />
                <span>
                  Prices are subject to change based on government regulations.
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Card */}
          <div className="card p-6 text-center">
            <p className="text-[#a1a1aa] mb-4">
              Need help or have questions? Contact us directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919870969734"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
