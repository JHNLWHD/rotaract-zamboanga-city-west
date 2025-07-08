export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  status: 'upcoming' | 'registration_open' | 'past';
  registrationUrl: string;
  shareableLink: string;
  image: string;
  invitationImage: string;
  highlights: string[];
  agenda?: string[];
  requirements?: string[];
  gallery: Array<{
    id: number;
    url: string;
    caption: string;
    category: string;
  }>;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Basic Orientation Seminar 2025",
    slug: "basic-orientation-seminar-2025",
    description: "Essential orientation seminar for new members and those interested in learning more about Rotaract values, mission, and community service opportunities. With a shared commitment to Unite for Good, this session emphasizes the core values of Rotary and Rotaract, highlighting the power of unity in driving meaningful change.",
    date: "2025-06-12",
    time: "1:00 PM",
    venue: "Southern City Colleges-Centra Campus, Zamboanga City",
    category: "Training",
    status: "past",
    registrationUrl: "https://forms.google.com/your-orientation-form",
    shareableLink: "https://rotaract.rotaryzcwest.org/events/2025-06-12/basic-orientation-seminar-2025",
    image: "/events/basic-orientation-seminar-2025.jpg",
    invitationImage: "/events/basic-orientation-seminar-2025.jpg",
    highlights: [
      "Meet the Great West orientation program",
      "Rotaract fundamentals and core values training",
      "Great West Talk with club updates and activities",
      "Networking opportunities with current members",
      "Mission and purpose understanding sessions"
    ],
    agenda: [
      "1:00 PM - Registration and Welcome",
      "1:30 PM - Meet the Great West Introduction",
      "2:00 PM - Rotary and Rotaract Core Values",
      "2:45 PM - Coffee Break and Networking",
      "3:00 PM - Great West Talk - Club Activities & Updates",
      "3:45 PM - Mission and Purpose Deep Dive",
      "4:30 PM - Q&A Session with Current Members",
      "5:00 PM - Closing and Next Steps"
    ],
    requirements: [
      "Open to aspiring members",
      "Notebook and pen for taking notes",
      "Comfortable attire",
      "Complete membership application process"
    ],
    gallery: []
  },
  {
    id: 2,
    title: "Solidares 3.0: Great West Strategic Planning 2025",
    slug: "solidares-3-0",
    description: "The Rotaract Club of Zamboanga City West presents Solidares 3.0: Great West Strategic Planning 2025 and Revisiting of the 5-year Action Plan. Expect powerful brainstorming sessions, breakthrough strategies, and the energy that only our vibrant club can bring!",
    date: "2025-06-20",
    time: "8:00 AM - 6:00 PM",
    venue: "J&D Private Resort, Tumaga-Putik Rd., Zamboanga City",
    category: "Strategic Planning",
    status: "past",
    registrationUrl: "https://forms.google.com/solidares-3-0-registration",
    shareableLink: "https://rotaract.rotaryzcwest.org/events/2025-06-20/solidares-3-0",
    image: "/events/solidares-3.0.jpg",
    invitationImage: "/events/solidares-3.0.jpg",
    highlights: [
      "Strategic planning sessions for 2025",
      "5-year Action Plan revisiting and updates",
      "Powerful brainstorming and breakthrough strategies",
      "Team building and club development activities",
      "Networking and fellowship opportunities"
    ],
    agenda: [
      "8:00 AM - Registration and Welcome Breakfast",
      "8:30 AM - Opening Ceremony and Objectives",
      "9:00 AM - Strategic Planning Session 1",
      "10:30 AM - Coffee Break",
      "10:45 AM - 5-year Action Plan Review",
      "12:00 PM - Lunch Break",
      "1:00 PM - Breakthrough Strategy Workshop",
      "2:30 PM - Team Building Activities",
      "4:00 PM - Action Plan Finalization",
      "5:30 PM - Closing Ceremony and Next Steps",
      "6:00 PM - Fellowship Dinner"
    ],
    requirements: [
      "Active Rotaract Club members",
      "Bring notebook and writing materials",
      "Comfortable clothes for activities",
      "Commitment to full-day participation"
    ],
    gallery: []
  }
]; 