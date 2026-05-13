import Image from "next/image";

export const metadata = {
  title: "About | Bryce Johnson"
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:py-24">
        <div className="relative aspect-[4/4.25] overflow-hidden rounded-3xl border border-cyan-300/25 bg-slate-900 shadow-lift shadow-cyan-950/30">
          <Image
            src="/images/professional-image.jpeg"
            alt="Bryce Johnson professional portrait"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="portrait-crop"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">About</p>
          <h1 className="electric-text mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Engineer, builder, and curious teammate.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            I’m an Electrical Engineering student at UC San Diego with a strong interest in embedded systems, circuits, robotics, and hands-on hardware development. I enjoy building projects that connect software, electronics, and physical systems — from Arduino and ESP32 prototypes to FPGA logic, sensor-based circuits, servo mechanisms, and interactive engineering tools.
          </p>
        </div>
      </section>

      <section className="border-y border-cyan-300/15 bg-white/[0.04]">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Personal Side</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">A little more human, a little less resume.</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Hi, I’m Bryce! I’ll be telling you a little bit about myself. I played two years as a baseball pitcher in community college before transferring to UCSD, and I’d say that’s where a lot of my competitive nature really grew. Baseball taught me how to stay composed under pressure, take feedback seriously, and keep improving even when progress felt slow. That mindset still carries into the way I approach engineering, projects, and learning new skills.
              </p>
              <p>
                Recently, I’ve also picked up rock climbing, which has quickly become one of my favorite hobbies. As someone who enjoys being in nature, learning new sports, and pushing myself physically and mentally, it felt like the perfect challenge to try. Each route teaches you something new, whether it’s a better grip, a smarter movement, or simply learning to trust yourself a little more. I love that every climb gives me a chance to push myself, learn from the challenge, and carry that growth into whatever comes next.
              </p>
              <p>
                At my core, I’m curious. I like putting myself in new environments, trying things I’m not immediately good at, and slowly figuring them out. Whether that means learning a new sport, exploring a new food spot, or messing around with a new piece of tech, I enjoy the process of experimenting, improving, and finding the fun in learning something new.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900 shadow-soft md:col-span-4">
              <Image
                src="/images/baseball-throwing.jpg"
                alt="Bryce playing baseball"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900 shadow-soft md:col-span-2">
              <Image
                src="/images/rock-climbing.png"
                alt="Bryce rock climbing"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900 shadow-soft md:col-span-3">
              <Image
                src="/images/sf-stadium.png"
                alt="Friends at a San Francisco stadium"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="self-start rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-5 shadow-sm md:col-span-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Off the bench</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Starting at the age of 10, my family and I set out to visit all 30 Major League Baseball stadiums. Visiting anywhere from two to five ballparks a year, I was fortunate enough to complete the full 30 out of 30 by the age of 20. Some of my favorites include Oracle Park in San Francisco, Petco Park in San Diego, and Fenway Park in Boston. It was an incredible opportunity to see different parts of the United States and even some of Canada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
