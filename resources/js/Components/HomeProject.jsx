import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomeProject = ({projects}) => {
    return ( 
        <>
           <motion.section
       initial={{ opacity: 0, scale: 1.2 }}
       whileInView={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.8 }}
       viewport={{ once: true }}
       className="py-12 sm:py-16 bg-light-background dark:bg-dark-background">
      <div className="w-11/12 mx-auto px-3 sm:px-4 lg:px-6">
      <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
            <div className="flex items-center gap-12">
                <h2 className="text-center text-2xl font-Montserrat text-light-text dark:text-dark-text lg:text-6xl">Projects</h2>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <Link
            to={`/project/${project.id}`}
              key={project.id}
              className={`group rounded-xl shadow-lg overflow-hidden cursor-pointer ${
                index === 1 // Changed to index 1 for consistency with previous examples
                  ? 'md:col-span-2 md:row-span-2 my-0 md:my-8' // Middle card (big)
                  : 'md:col-span-1'} // Side cards (smaller)
                  ${index === 0 ? 'col-span-2' : 'col-span-1'}
              `}
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
                  src={project.images}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <div className="relative z-[3]">
                        <h3 className={`font-SulphurPoint text-white ${
                  index === 1
                    ? 'text-lg lg:text-4xl ' // Larger height for middle card
                    : 'text-base lg:text-xl' // Smaller height for side cards
                }`}>
                        {project.title}
                        </h3>
                    </div>
                    </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional Call-to-Action */}
        <div className="text-center mt-10">
          <a
            href="/projects"
            className="inline-block px-6 py-3 text-light-primary dark:text-dark-primary border-2 font-Jura border-light-primary dark:border-dark-primary rounded-lg hover:bg-light-primary hover:dark:bg-dark-primary hover:dark:text-light-text hover:text-dark-text transition-colors duration-200 ease-in-out"
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