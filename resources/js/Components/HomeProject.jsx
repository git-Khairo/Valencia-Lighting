import { motion } from "framer-motion";

const HomeProject = () => {
    const projects = [
        { id: 1, image: "https://picsum.photos/200", title: "Side Project 1"},
        { id: 2, image: "https://picsum.photos/200", title: "Side Project 2"},
        { id: 3, image: "https://picsum.photos/200", title: "Main Project"},
        { id: 4, image: "https://picsum.photos/200", title: "Side Project 3"},
        { id: 5, image: "https://picsum.photos/200", title: "Side Project 4"},
      ];

    return ( 
        <>
           <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
       className="py-12 sm:py-16 bg-gray-100">
      <div className="w-11/12 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group rounded-xl shadow-lg overflow-hidden cursor-pointer ${
                index === 1 // Changed to index 2 for consistency with previous examples
                  ? 'md:col-span-2 md:row-span-2 my-0 md:my-8' // Middle card (big)
                  : 'md:col-span-1' // Side cards (smaller)
              }`}
            >
              {/* Image */}
              <div
                className={`relative w-full ${
                  index === 1
                    ? 'h-40 md:h-[400px] lg:h-[500px]' // Larger height for middle card
                    : 'h-40 md:h-[220px] lg:h-[270px]' // Smaller height for side cards
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <div className="relative z-10">
                        <h3 className={`font-semibold text-white ${
                  index === 1
                    ? 'text-lg lg:text-4xl ' // Larger height for middle card
                    : 'text-base lg:text-xl' // Smaller height for side cards
                }`}>
                        {project.title}
                        </h3>
                    </div>
                    </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Call-to-Action */}
        <div className="text-center mt-10">
          <a
            href="/projects"
            className="inline-block px-6 py-3 text-black border-2 border-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </motion.section>
        </>
    )
}
 
export default HomeProject;