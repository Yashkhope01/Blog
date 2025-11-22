import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-32 bg-gray-100 dark:bg-gray-700 ">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0 ">
              <div className="relative w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/photo.jpg"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center ">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Me</h1>
              <p className="text-gray-600 dark:text-gray-50 text-lg mb-4">
              I’m Yash Prakash Khope — a passionate Full-Stack Engineer based in India, currently steering the fast lane in MERN stack & performance-focused development. With a driving motto of “Engineering speed whether it’s code or cars”, I thrive on delivering sleek, high-impact solutions that are built for real-world scale and agility              </p>
              <p className="text-gray-600 dark:text-gray-50 text-lg">
              My journey began with a spark of curiosity and a relentless drive to push boundaries. Over the years, I’ve honed my skills in crafting seamless user experiences and robust backend systems, always with an eye on performance and scalability. When I’m not coding, you’ll find me behind the wheel, indulging my love for fast cars and the thrill of the open road.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white"> Journey as an Engineer</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-50">
              My journey began with a spark of curiosity and a relentless drive to push boundaries. Over the years, I’ve honed my skills in crafting seamless user experiences and robust backend systems, always with an eye on performance and scalability. When I’m not coding, you’ll find me behind the wheel, indulging my love for fast cars and the thrill of the open road.
            </p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <img src="/spark.png" alt="iage 5" className="h-1/2 rounded-lg shadow-lg " />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white dark:text-white">The Spark of Curiosity</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                My curiosity is fueled by the drive to understand how things work beneath the surface. Whenever I build or debug, I naturally dive deeper  exploring structures, patterns, and hidden connections that shape how systems behave. I enjoy dissecting complex problems, experimenting with new approaches, and pushing myself to uncover smarter, faster, and more efficient solutions.

This mindset keeps me learning, improving, and innovating. For me, curiosity is not a moment it’s a continuous force that shapes the way I develop, create, and evolve as a builder.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/3">
                <img src="/dd.png" alt="image 3" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Diving Deeper</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                I’m driven by the urge to explore beyond the obvious. Surface-level understanding has never been enough for me  I naturally break things down into smaller layers, trace the flow, and analyze the mechanics behind every system I work with.
Whether it’s backend architecture, frontend behavior, or the logic connecting both ends, I prefer knowing why something works, not just how. This deeper exploration helps me build with intention, refine with clarity, and engineer solutions that are stable, scalable, and meaningful.
Going deeper isn’t just a habit it’s the foundation of how I grow, improve, and create work that stands stronger with every iteration.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <img src="/problems.png" alt="imagee2" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Taking on Challenges</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                I thrive in fast-paced, high-pressure environments. From leading teams during various events to organizing escape room games and coordinating technical tasks, I’ve learned to stay composed, make clear decisions, and guide people toward a common goal.
Challenges bring out my best  they sharpen my leadership, strengthen my teamwork, and push me to deliver results that matter.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/3">
                <img src="/GIV.png" alt="image 1" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Giving Back</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                I believe growth means sharing what you learn. Whether it’s helping teammates debug, guiding juniors through concepts, organizing tech events, or building experiences that inspire others, I enjoy contributing to the community around me.
Giving back keeps me grounded, connected, and constantly learning it’s my way of strengthening the ecosystem that helped shape me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
