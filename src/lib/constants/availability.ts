import type { AvailabilityRegion } from "@/types";

export const OTHER_STATE_OPTION = "Other State";

export const AVAILABILITY_CHECKER_COPY = {
  eyebrow: "Coverage check",
  title: "Check whether myimportagent can visit your exporter location.",
  description:
    "Select the exporter state and city to see whether verification coverage is available before you request a visit.",
  stateLabel: "Exporter State",
  cityLabel: "Exporter City",
  statePlaceholder: "Select exporter state",
  cityPlaceholder: "Select exporter city",
  unavailableCityPlaceholder: "City selection not available",
  checkButton: "Check Availability",
  bookButton: "Book Verification",
  availablePrefix: "Good news — myimportagent verification is available in",
  unavailableMessage:
    "Sorry, we are expanding and will be available soon in this state.",
  missingStateMessage: "Please choose the exporter state first.",
  missingCityMessage: "Please choose the exporter city before checking availability.",
};

export const AVAILABLE_REGIONS: readonly AvailabilityRegion[] = [
  {
    state: "Telangana",
    cities: ["Hyderabad", "Secunderabad", "Warangal"],
  },
  {
    state: "Delhi NCR",
    cities: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad"],
  },
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  },
  {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  },
  {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Tiruppur", "Madurai"],
  },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  },
  {
    state: "Andhra Pradesh",
    cities: ["Vijayawada", "Visakhapatnam", "Guntur", "Tirupati"],
  },
  {
    state: "Kerala",
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  },
  {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  },
  {
    state: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Noida", "Agra", "Varanasi"],
  },
  {
    state: "Haryana",
    cities: ["Gurugram", "Faridabad", "Panipat", "Sonipat"],
  },
  {
    state: "Punjab",
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Chandigarh"],
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  },
  {
    state: "Madhya Pradesh",
    cities: ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
  },
  {
    state: "Odisha",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela"],
  },
];

export const STATE_OPTIONS = [
  ...AVAILABLE_REGIONS.map((region) => region.state),
  OTHER_STATE_OPTION,
];
