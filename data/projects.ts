export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  href?: string;
  fit?: "cover" | "contain";
  aspect?: "standard" | "wide" | "poster" | "portrait";
};

export type ProjectSection = {
  eyebrow?: string;
  title: string;
  body: string;
  layout?: "single" | "paired" | "video-first" | "media-left" | "showcase";
  media?: ProjectMedia[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  accent: string;
  link?: string;
  highlights: string[];
  sections: ProjectSection[];
};

const sparkLabUrl = "https://spark-lab-nu.vercel.app/";

export const projects: Project[] = [
  {
    slug: "pigball-machine",
    title: "Pigball Machine",
    subtitle: "Quarter-long electromechanical pinball machine",
    description:
      "A pig-themed pinball machine built through iterative mechanical design, sensor circuits, motor drivers, score display logic, audio feedback, and final wooden construction.",
    coverImage: "/projects/pigball-machine/final-machine.jpeg",
    coverAlt: "Final pink Pigball pinball machine on a lab bench",
    tags: ["Arduino", "Electromechanical Design", "Sensors", "Motors", "CAD"],
    accent: "from-pink-500 to-cyan-500",
    highlights: [
      "Built from cardboard spacing mockup to painted birch and PLA final assembly",
      "Integrated optical scoring sensors, display logic, audio feedback, and motor control",
      "Used solenoids, a servo gate, and a bidirectional DC motor to create interactive gameplay"
    ],
    sections: [
      {
        eyebrow: "Prototype",
        title: "Cardboard Casing and First Workable Demo",
        body:
          "The first version used a cardboard casing so we could physically understand the spacing between the plunger path, flippers, display, motorized pig nose, sensors, and wiring before committing to wood. This helped us realize the enclosure needed more internal height for the electronics and ball-routing pieces.\n\nThe wiring shown here was the first workable demo. It grew out of the early module work: testing motor behavior, proving the basic button-controlled state machine, and validating that the subsystems could eventually be combined into one pinball machine.",
        layout: "media-left",
        media: [
          {
            type: "image",
            src: "/projects/pigball-machine/prototyping-internal.jpeg",
            alt: "Cardboard Pigball prototype with breadboards and wiring",
            caption: "First workable demo in the cardboard spacing prototype"
          }
        ]
      },
      {
        eyebrow: "Integration",
        title: "Refined Internal Electronics",
        body:
          "This was the more refined version of the machine after the electronics had been moved into the wooden structure. The internal layout brought together the Arduino Mega, power supply, solenoid driver circuits for the flippers, optical scoring sensor circuits, seven-segment display driver, buzzer feedback, servo gate, and DC motor control.\n\nThe scoring circuit came from the sensor module work: IR emitter and receiver pairs were conditioned through op-amps, filtering, peak detection, buffering, and a hysteretic comparator so the Arduino could read reliable scoring events.",
        layout: "media-left",
        media: [
          {
            type: "image",
            src: "/projects/pigball-machine/refined-internal.jpeg",
            alt: "Refined internal Pigball wiring inside the wooden machine",
            caption: "Refined internal layout with the main electronics installed"
          }
        ]
      },
      {
        eyebrow: "Final Build",
        title: "Painted Playfield and Mechanical Assembly",
        body:
          "The final machine used laser-cut quarter-inch birch with tab-and-slot construction, glued joints, PLA ramps and obstacles, sensor mounts, flippers, and a transparent acrylic shield to keep the ball inside the playfield. The painted pink exterior tied the technical build back to the pig theme.\n\nA major final improvement was replacing the single-direction DC motor circuit with an L298 dual H-bridge and boost converter. That let the Arduino reverse the pig nose motor based on scoring inputs while still accounting for the driver voltage drop.",
        layout: "media-left",
        media: [
          {
            type: "image",
            src: "/projects/pigball-machine/final-machine.jpeg",
            alt: "Final pink Pigball machine exterior",
            caption: "Final painted Pigball machine with playfield, plunger, flippers, and obstacles"
          }
        ]
      },
      {
        eyebrow: "Demo",
        title: "Pigball Machine Video Demonstration",
        body: "",
        layout: "showcase",
        media: [
          {
            type: "video",
            src: "https://drive.google.com/file/d/19n1S8zO6vHbnQR65-Gr050gjKB7IQTQU/view?usp=sharing"
          }
        ]
      },
      {
        eyebrow: "Complete",
        title: "Finished Quarter-Long Project",
        body: "",
        layout: "showcase",
        media: [
          {
            type: "image",
            src: "/projects/pigball-machine/bryce-with-pigball.jpeg",
            alt: "Bryce standing beside the finished Pigball machine",
            aspect: "portrait",
            fit: "contain"
          }
        ]
      }
    ]
  },
  {
    slug: "line-following-robot",
    title: "Line Following Robot",
    subtitle: "Sensor feedback, PID tuning, and physical robotics",
    description:
      "A hands-on robotics project combining photoresistor line detection, PID control, circuit design, and a compact final robot build.",
    coverImage: "/projects/line-following-robot/front-view.png",
    coverAlt: "Front view of the final line following robot",
    tags: ["Robotics", "PID Control", "ESP32", "Sensors", "Circuit Design"],
    accent: "from-circuit to-cyan-600",
    highlights: [
      "Translated PID theory into a working control panel",
      "Built photoresistor circuits for line detection",
      "Integrated sensors, motor control, and physical chassis design"
    ],
    sections: [
      {
        eyebrow: "Control",
        title: "PID Circuit to Physical Implementation",
        body:
          "The robot uses adjustable PID controls to tune how it reacts to the line in real time. Pairing the circuit design with the implemented hardware shows the bridge between control theory and the robot's physical behavior.",
        layout: "paired",
        media: [
          {
            type: "image",
            src: "/projects/line-following-robot/pid-circuit-design.png",
            alt: "PID control circuit design",
            caption: "PID circuit design",
            fit: "contain"
          },
          {
            type: "image",
            src: "/projects/line-following-robot/pid-implementation.png",
            alt: "Implemented PID control circuit",
            caption: "PID implementation"
          }
        ]
      },
      {
        eyebrow: "Sensing",
        title: "Photoresistor Line Detection",
        body:
          "The line detection circuit uses photoresistors to sense brightness differences on the surface below the robot, giving the ESP32 feedback it can use to correct direction.",
        layout: "paired",
        media: [
          {
            type: "image",
            src: "/projects/line-following-robot/photoresistor-circuit.png",
            alt: "Photoresistor circuit diagram",
            caption: "Photoresistor circuit",
            fit: "contain"
          },
          {
            type: "image",
            src: "/projects/line-following-robot/photoresistor-implementation.png",
            alt: "Physical photoresistor implementation",
            caption: "Physical implementation"
          }
        ]
      },
      {
        eyebrow: "System",
        title: "Full Project Poster",
        body:
          "The poster pulls the robot into one complete system view, showing the sensing, control, mechanical design, and final integration in one place.",
        layout: "single",
        media: [
          {
            type: "image",
            src: "/projects/line-following-robot/project-poster.png",
            alt: "Line following robot project poster",
            caption: "System poster",
            fit: "contain",
            aspect: "poster"
          }
        ]
      },
      {
        eyebrow: "Final Build",
        title: "Robot Profile Views",
        body:
          "The final build brings together motor drive, sensing, power, and chassis work into a robot that could be tested, tuned, and improved as a complete system.",
        layout: "paired",
        media: [
          {
            type: "image",
            src: "/projects/line-following-robot/front-view.png",
            alt: "Front view of the final robot",
            caption: "Final robot front view"
          },
          {
            type: "image",
            src: "/projects/line-following-robot/side-view.png",
            alt: "Side view of the final robot",
            caption: "Final robot side view"
          }
        ]
      }
    ]
  },
  {
    slug: "spark-lab",
    title: "Spark Lab",
    subtitle: "A beginner-friendly circuits learning website",
    description:
      "Spark Lab helps beginners recognize circuit components, understand what they do, see beginner examples of how they are configured, and test themselves with a quiz.",
    coverImage: "/projects/spark-lab/front-page.png",
    coverAlt: "Spark Lab homepage screenshot",
    tags: ["React", "Education", "Circuits", "UI Design", "Interactive Learning"],
    accent: "from-teal-500 to-amber-400",
    link: sparkLabUrl,
    highlights: [
      "Turns component recognition into a visual learning experience",
      "Includes guides, interactive examples, and quizzes",
      "Designed for students who are new to circuits"
    ],
    sections: [
      {
        eyebrow: "Website",
        title: "Beginner Electronics Made Friendlier",
        body:
          "The site focuses on the early friction points in learning circuits: naming parts, understanding what each part does, and seeing how components fit into simple circuit examples.",
        media: [
          {
            type: "image",
            src: "/projects/spark-lab/front-page.png",
            alt: "Spark Lab front page",
            caption: "Front page",
            href: sparkLabUrl
          },
          {
            type: "image",
            src: "/projects/spark-lab/components.png",
            alt: "Spark Lab components page",
            caption: "Components library",
            href: "https://spark-lab-nu.vercel.app/components"
          },
          {
            type: "image",
            src: "/projects/spark-lab/guides.png",
            alt: "Spark Lab guides page",
            caption: "Simple guides",
            href: "https://spark-lab-nu.vercel.app/guides"
          },
          {
            type: "image",
            src: "/projects/spark-lab/interactive.png",
            alt: "Spark Lab interactive examples",
            caption: "Interactive examples",
            href: "https://spark-lab-nu.vercel.app/interactive"
          },
          {
            type: "image",
            src: "/projects/spark-lab/lab-quiz.png",
            alt: "Spark Lab quiz page",
            caption: "Quiz lab",
            href: "https://spark-lab-nu.vercel.app/quiz"
          }
        ]
      }
    ]
  },
  {
    slug: "portable-console",
    title: "Portable Console Device",
    subtitle: "A handheld ESP32 game console inspired by a family memory",
    description:
      "A compact ESP32 game device with OLED display, pushbutton controls, transistor-driven buzzer audio, and playable mini game modes.",
    coverImage: "/projects/portable-console/front-view.jpeg",
    coverAlt: "Front view of the portable console device",
    tags: ["ESP32", "OLED", "Embedded Systems", "Buttons", "Prototyping"],
    accent: "from-slate-800 to-circuit",
    highlights: ["Arkenoid", "Jumping dinosaur browser-style game", "Hot dog display mode"],
    sections: [
      {
        eyebrow: "Inspiration",
        title: "From Waiting to Building",
        body:
          "It was 9pm at night, my whole family was waiting. The Disneyland light show turns on at 9:15 and all there was to do was wait....\n\n\"Mom, can I have your phone?\" my brother asks.\n\nWhat was waiting instantly turned into excitement. We found ourselves locked into a single game.\n\nArkenoid.\n\nLeveraging the skills I've developed through my electrical engineering coursework at UC San Diego, I designed and built a handheld game device from the ground up.\n\nAt its core, the system is powered by an ESP32, which handles the inputs, display, and sound. An OLED screen shows the game, while pushbuttons are used for controls. The buttons use internal pull-up resistors to ensure stable, reliable input.\n\nTo avoid power issues, the buzzer is controlled through a 2N2222 transistor instead of directly from the ESP32. This allows it to draw more current without affecting the rest of the system. Capacitors are also added across the power lines to smooth out voltage changes and ideally prevent screen flickering.\n\nTogether, these circuits create a simple but reliable system that brings a childhood memory to life."
      },
      {
        eyebrow: "Prototype",
        title: "Breadboard Development",
        body:
          "The breadboard phase helped validate input handling, display wiring, and the transistor-driven buzzer circuit before moving the design onto a compact handheld board.",
        media: [
          {
            type: "image",
            src: "/projects/portable-console/Console%20Image%20breadboard%20updated.png",
            alt: "Portable console breadboard development",
            caption: "Breadboard development"
          }
        ]
      },
      {
        eyebrow: "Demo",
        title: "Playable Console Demonstration",
        body:
          "The finished device combines the OLED display, controls, and sound into a small game console with multiple game and display modes.",
        media: [
          {
            type: "video",
            src: "/projects/portable-console/Console%20Video%20Demonstration%20Adjusted%20Storage.mov",
            caption: "Console video demonstration"
          },
          {
            type: "image",
            src: "/projects/portable-console/front-view.jpeg",
            alt: "Front of the portable console",
            caption: "Front view"
          },
          {
            type: "image",
            src: "/projects/portable-console/side-view.jpeg",
            alt: "Side of the portable console",
            caption: "Side view"
          }
        ]
      }
    ]
  },
  {
    slug: "water-bottle",
    title: "Water Bottle Plant Watering Device",
    subtitle: "Servo-controlled bottle angle for assisted plant watering",
    description:
      "A plant-watering prototype that uses servo motors to control the pouring angle of a water bottle for a simple automated watering setup.",
    coverImage: "/projects/water-bottle/front-view.jpeg",
    coverAlt: "Water bottle plant watering device",
    tags: ["Servo Motors", "Arduino", "Mechanical Design", "Automation", "Prototype"],
    accent: "from-sky-600 to-emerald-500",
    highlights: [
      "Uses servo motion to control pouring angle",
      "Includes a custom holder concept in Onshape",
      "Explores assistive and home automation use cases"
    ],
    sections: [
      {
        eyebrow: "Demo",
        title: "Servo-Controlled Watering",
        body:
          "The demo is the heart of this project: the mechanism adjusts the water bottle's angle so water can be poured in a controlled way.",
        layout: "video-first",
        media: [
          {
            type: "video",
            src: "/projects/water-bottle/demo.mov",
            caption: "Water bottle plant watering demo"
          }
        ]
      },
      {
        eyebrow: "Design",
        title: "From CAD Concept to Physical Prototype",
        body:
          "A future version could support people who need help watering plants or want a simple automated setup at home.",
        media: [
          {
            type: "image",
            src: "/projects/water-bottle/base-onshape-design.jpeg",
            alt: "Onshape design for water bottle base",
            caption: "Onshape base design"
          },
          {
            type: "image",
            src: "/projects/water-bottle/front-view.jpeg",
            alt: "Water bottle watering device front view",
            caption: "Physical prototype"
          }
        ]
      }
    ]
  },
  {
    slug: "speaker-project",
    title: "Speaker Project",
    subtitle: "LM386 amplification, protection, and physical enclosure design",
    description:
      "An analog speaker build centered on an LM386 amplifier, diode current protection, stripboard prototyping, and an adjustable potentiometer knob.",
    coverImage: "/projects/speaker/final-design.jpeg",
    coverAlt: "Final speaker project build",
    tags: ["Analog Circuits", "LM386", "Amplification", "Stripboard", "Prototyping"],
    accent: "from-zinc-800 to-copper",
    highlights: [
      "Designed around an LM386 amplifier circuit",
      "Used stripboard prototyping to move beyond the schematic",
      "Finished with a physical speaker enclosure and adjustable control knob"
    ],
    sections: [
      {
        eyebrow: "Circuit",
        title: "LM386 Speaker Circuit",
        body:
          "The circuit uses an LM386 op amp for signal amplification, diode current protection, and a potentiometer knob to adjust resistance and amplification behavior.",
        media: [
          {
            type: "image",
            src: "/projects/speaker/circuit-design.jpeg",
            alt: "LM386 speaker circuit design",
            caption: "Circuit design",
            fit: "contain"
          },
          {
            type: "image",
            src: "/projects/speaker/stripboard-prototype.jpeg",
            alt: "Speaker stripboard prototype",
            caption: "Stripboard prototype",
            fit: "contain"
          }
        ]
      },
      {
        eyebrow: "Build",
        title: "Prototype to Final Design",
        body:
          "The stripboard prototype helped prove the analog design before the final physical build brought the amplifier, speaker, controls, and enclosure together.",
        media: [
          {
            type: "image",
            src: "/projects/speaker/final-design.jpeg",
            alt: "Final speaker design",
            caption: "Final speaker design",
            fit: "contain"
          }
        ]
      }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
