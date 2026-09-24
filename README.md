# Bryce Johnson — Electrical Engineering Portfolio

**A project portfolio focused on embedded systems, circuits, robotics, and hands-on hardware development.**

[View the live portfolio](https://bryce-johnson-portfolio.vercel.app/) · [Connect on LinkedIn](https://www.linkedin.com/in/brycejohnsonurl/)

I am an Electrical Engineering student at UC San Diego who enjoys connecting software, electronics, and physical systems. This site documents the design process behind my work—from early circuit and mechanical prototypes to integrated, working builds.

## Featured Work

The portfolio includes projects across embedded systems, electromechanical design, controls, and engineering education, including:

- **Pigball Machine** — A quarter-long electromechanical pinball machine combining an Arduino Mega, optical scoring sensors, solenoid-driven flippers, a servo gate, bidirectional motor control, audio feedback, and a custom wooden enclosure.
- **Line-Following Robot** — An ESP32-based robot that connects photoresistor sensing, motor control, and adjustable PID behavior in a complete physical system.
- **Spark Lab** — A beginner-friendly electronics learning site with visual component lessons, circuit guides, interactive examples, and quizzes.
- **Portable Console Device** — A handheld ESP32 game system with an OLED display, button controls, and transistor-driven buzzer audio.
- **Water Bottle Plant Watering Device** — A servo-controlled prototype exploring automated pouring and mechanical design.

Each project page emphasizes the engineering decisions, iterations, implementation details, and final result rather than presenting only a finished image.

## Built With

- Next.js and React
- TypeScript
- Tailwind CSS
- Responsive image and video project galleries
- Data-driven project pages for consistent case-study layouts

## Run Locally

```bash
git clone https://github.com/brycesj/bryce-johnson-portfolio.git
cd bryce-johnson-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

Project case-study content is organized in `data/projects.ts`, with supporting media stored under `public/projects/`. This keeps the portfolio easy to expand while preserving a consistent presentation for visitors.
