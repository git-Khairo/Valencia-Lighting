const Projects = () => {
    const projects = [
        {
          id: 1,
          title: "Neon City Plaza",
          image: "https://picsum.photos/200",
          description: "LED illumination for urban square",
        },
        {
          id: 2,
          title: "Cyber Tower",
          image: "https://picsum.photos/200",
          description: "Futuristic office lighting",
        },
        {
          id: 3,
          title: "Quantum Arena",
          image: "https://picsum.photos/200",
          description: "Sports complex illumination",
        },
        {
          id: 4,
          title: "Luminous Bridge",
          image: "https://picsum.photos/200",
          description: "Architectural bridge lighting",
        },
        {
        id: 5,
        title: "Quantum Arena",
        image: "https://picsum.photos/200",
        description: "Sports complex illumination",
        },
        {
        id: 6,
        title: "Luminous Bridge",
        image: "https://picsum.photos/200",
        description: "Architectural bridge lighting",
        },
        {
        id: 7,
        title: "Quantum Arena",
        image: "https://picsum.photos/200",
        description: "Sports complex illumination",
        },
        {
        id: 8,
        title: "Luminous Bridge",
        image: "https://picsum.photos/200",
        description: "Architectural bridge lighting",
        }
      ];


    return ( 
        <>
          <div className="min-h-screen py-8 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-clip-text">
            Our Projects
        </h1>
        <div className="space-y-4 sm:space-y-6 w-full">

            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {projects.slice(0, 3).map((project) => (
                <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg bg-white"
                >
                <div className="relative w-full">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 sm:h-96 md:h-[425px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <div className="relative z-10">
                        <h3 className="text-lg sm:text-3xl font-semibold text-white cursor-pointer">
                        {project.title}
                        </h3>
                        <p className="text-gray-200 text-xs sm:text-sm mt-1 sm:mt-2">
                        {project.description}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Row 2: 2 cards */}
            {projects.length > 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {projects.slice(3, 5).map((project) => (
                <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-lg bg-white"
                >
                    <div className="relative w-full">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-80 sm:h-96 md:h-[425px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                        <div className="relative z-10">
                        <h3 className="text-lg sm:text-3xl font-semibold text-white cursor-pointer">
                            {project.title}
                        </h3>
                        <p className="text-gray-200 text-xs sm:text-sm mt-1 sm:mt-2 cursor-pointer">
                            {project.description}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}

            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
            {projects.slice(5, 8).map((project) => (
                <div
                key={project.id}
                className={`group relative overflow-hidden rounded-lg bg-white ${project.id === 6? "lg:col-span-3 sm:col-span-1" : "lg:col-span-2 sm:col-span-1"}`}
                >
                <div className="relative w-full">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 sm:h-96 md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <div className="relative z-10">
                        <h3 className="text-lg sm:text-3xl font-semibold text-white cursor-pointer">
                        {project.title}
                        </h3>
                        <p className="text-gray-200 text-xs sm:text-sm mt-1 sm:mt-2">
                        {project.description}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
        </>
     );
}
 
export default Projects;