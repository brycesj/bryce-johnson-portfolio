export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  website: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Looq AI",
    role: "Electromechanical Assembly Technician",
    dates: "Oct. 2026 - Present",
    location: "San Diego, CA",
    website: "https://looq.ai/",
    bullets: [
      "Develop Python-based automation tools integrating UFactory xArm robotics and Jetson hardware to evaluate camera performance.",
      "Perform optical calibration and focus testing using ArUco markers, OpenCV, and MTF50 measurements to evaluate image sharpness.",
      "Assemble, calibrate, and troubleshoot electromechanical camera systems, ensuring lens alignment, hardware functionality, and quality."
    ]
  },
  {
    company: "Robotics Center of Silicon Valley",
    role: "Hardware Engineering Intern - Embedded Systems Team",
    dates: "Jun. 2026 - Sept. 2026",
    location: "San Francisco, CA",
    website: "https://www.roboticscenter.ai/",
    bullets: [
      "Integrated Franka R3 with ProHand into an Apple Vision Pro teleoperation workflow using control mapping and motion retargeting.",
      "Developed tools for a reinforcement learning pipeline, leveraging Grounding DINO and SAM2 for recognition and segmentation.",
      "Programmed and debugged ESP32 and Raspberry Pi 5 TCP connections, allowing wireless transfer of video streams and metadata."
    ]
  },
  {
    company: "UCSD Envision Makerspace",
    role: "Electronics Technician / Mentor",
    dates: "Sept. 2025 - Jun. 2026",
    location: "La Jolla, CA",
    website: "https://jacobsschool.ucsd.edu/envision",
    bullets: [
      "Provided technical guidance to hundreds of students for soldering, laser cutting, PCB circuit design, 3D printing, and digital design.",
      "Maintained readiness of electronics lab equipment, prototyping materials, and electrical components."
    ]
  }
];
