/**
 * Input validation and sanitization utilities
 * Ensures all user inputs are safe and properly formatted
 */

// Sanitize string input - removes HTML tags and trims whitespace
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>\"'&]/g, "") // Remove potentially dangerous characters
    .trim();
}

// Validate phone number (Indian format)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  // Indian phone: 10 digits, or with country code 12 digits
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith("91"));
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Aadhaar (12 digits)
export function isValidAadhaar(aadhaar: string): boolean {
  const cleaned = aadhaar.replace(/\D/g, "");
  return cleaned.length === 12;
}

// Validate date (must be at least 3 days in future)
export function isValidBookingDate(dateString: string): boolean {
  const selectedDate = new Date(dateString);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  minDate.setHours(0, 0, 0, 0);
  return selectedDate >= minDate;
}

// Validate guest count
export function isValidGuestCount(count: number, maxGuests: number): boolean {
  return count >= 1 && count <= maxGuests;
}

// Sanitize all form data
export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  aadhaar: string;
  zone: string;
  date: string;
  guests: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateBookingForm(data: BookingFormData, maxGuests: number): ValidationResult {
  const errors: string[] = [];

  // Validate name
  if (!data.name || sanitizeString(data.name).length < 2) {
    errors.push("Please enter a valid name");
  }

  // Validate phone
  if (!isValidPhone(data.phone)) {
    errors.push("Please enter a valid 10-digit phone number");
  }

  // Validate email
  if (!isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  // Validate Aadhaar
  if (!isValidAadhaar(data.aadhaar)) {
    errors.push("Please enter a valid 12-digit Aadhaar number");
  }

  // Validate zone
  if (!data.zone) {
    errors.push("Please select a safari zone");
  }

  // Validate date
  if (!data.date || !isValidBookingDate(data.date)) {
    errors.push("Please select a date at least 3 days from today");
  }

  // Validate guests
  const guestCount = parseInt(data.guests, 10);
  if (!isValidGuestCount(guestCount, maxGuests)) {
    errors.push(`Number of guests must be between 1 and ${maxGuests}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
