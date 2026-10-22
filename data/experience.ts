export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Looq AI",
    role: "Electromechanical Assembly Technician",
    dates: "Oct. 2026 - Present",
    location: "San Diego, CA",
    bullets: [
      "Assemble, test, and troubleshoot electromechanical hardware for Looq camera systems, identifying mechanical and electrical issues.",
      "Support hardware production through mechanical assembly, cable routing and wiring, inspections, and hands-on product testing."
    ]
  },
  {
    company: "Robotics Center of Silicon Valley (YC S25)",
    role: "Hardware Engineering Intern - Embedded Systems Team",
    dates: "Jun. 2026 - Sept. 2026",
    location: "San Francisco, CA",
    bullets: [
      "Integrated robotic arms and hands into teleoperation workflows, defining control mappings, motion bounds, and safety limits.",
      "Built tools for reviewing synchronized robot recordings, detecting objects, correcting segmentation, and validating collected datasets.",
      "Programmed and debugged ESP32 embedded systems, diagnosing UART, Wi-Fi, and SPI/DMA communication."
    ]
  },
  {
    company: "UCSD Envision Makerspace",
    role: "Electronics Technician / Mentor",
    dates: "Sept. 2025 - Jun. 2026",
    location: "La Jolla, CA",
    bullets: [
      "Used soldering, laser cutting, PCB design, 3D printing, and digital design experience to educate peers.",
      "Maintained equipment readiness, organized electrical components, and improved lab workflow."
    ]
  }
];
