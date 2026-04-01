import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Bus } from "lucide-react";

interface ZoneCardProps {
  name: string;
  image: string;
  description: string;
  vehicleType: "jeep" | "canter";
}

export default function ZoneCard({
  name,
  image,
  description,
  vehicleType,
}: ZoneCardProps) {
  return (
    <Link
      href={`/booking?zone=${encodeURIComponent(name)}`}
      className="group card block overflow-hidden"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={`${name} Safari Zone`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        {/* Vehicle Badge */}
        <div className="absolute bottom-3 right-4">
          <span className="badge badge-mauve">
            {name === "Dhikala" ? (
              <>
                <Bus className="h-3 w-3 mr-1" />
                <Car className="h-3 w-3 mr-1" />
                Canter/Jeep*
              </>
            ) : vehicleType === "canter" ? (
              <>
                <Bus className="h-3 w-3 mr-1" />
                Canter
              </>
            ) : (
              <>
                <Car className="h-3 w-3 mr-1" />
                Jeep
              </>
            )}
          </span>
        </div>

        {/* Zone Name */}
        <div className="absolute bottom-3 left-4">
          <h3 className="font-display text-2xl font-bold text-white tracking-wide">
            {name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-[#a1a1aa] line-clamp-2 mb-4">{description}</p>

        <span className="flex items-center gap-1 text-sm font-medium text-[#d4a853] group-hover:gap-2 transition-all">
          Book Safari
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
