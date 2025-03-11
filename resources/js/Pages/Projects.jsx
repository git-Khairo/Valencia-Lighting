import { Link } from 'react-router-dom';
import useFetch from '../useFetch';

const Row3 = (data) => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
    {data.projects.map((project) => (
        <Link
        to={`/project/${project.id}`}
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
        </Link>
    ))}
    </div>
    );
}

const Row2 = (data) => {
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {data.projects.map((project) => (
                <Link
                to={`/project/${project.id}`}
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
                </Link>
            ))}
            </div>
    );
}

const Row1 = (data) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {data.projects.map((project) => (
            <Link
            to={`/project/${project.id}`}
            key={project.id}
            className="group relative overflow-hidden rounded-lg bg-white"
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
            </Link>
        ))}
    </div>
    );
}

const Row3Style = ({projects, pointer}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
        {projects.map((project, index) => (
            <Link
            to={`/project/${project.id}`}
            key={project.id}
            className={`group relative overflow-hidden rounded-lg bg-white ${pointer === index ? "lg:col-span-3 sm:col-span-1" : "lg:col-span-2 sm:col-span-1"}`}
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
            </Link>
        ))}
    </div>
    );
}


const Projects = () => {
    const { data, error, loading } = useFetch('/api/projects');

    const initialProjectState = (projects) => {
      const rows = [];
      let remainingProjects = [...projects]; // Create a copy to avoid mutating original
  
      // Initial rows for 8 or more projects
      if (projects.length >= 8) {
        rows.push(<Row3 key="row3-0" projects={remainingProjects.slice(0, 3)} />);
        remainingProjects = remainingProjects.slice(3);
        rows.push(<Row2 key="row2-0" projects={remainingProjects.slice(0, 2)} />);
        remainingProjects = remainingProjects.slice(2);
        rows.push(<Row3Style key="row3style-0" projects={remainingProjects.slice(0, 3)} pointer={0} />);
        remainingProjects = remainingProjects.slice(3);
      }

      return rows;
    }
  
    const dynamicProjectState = (projects) => {
      const rows = [];
      let remainingProjects = [...projects]; 
      let toggle = true;
      let side = 2;
  
      while (remainingProjects.length > 0) {
          if (remainingProjects.length >= 3) {
          if(toggle){
            rows.push(
            <Row3 key={`row3-${rows.length}`} projects={remainingProjects.slice(0, 3)} />
            );
            toggle = false;
          }else{
            rows.push(
            <Row3Style key={`row3-${rows.length}`} projects={remainingProjects.slice(0, 3)} pointer={side} />
            );
            toggle = true;
            side == 2 ? side = 0 : side = 2; 
          }
          remainingProjects = remainingProjects.slice(3);
        } else if (remainingProjects.length === 2) {
          rows.push(
            <Row2 key={`row2-${rows.length}`} projects={remainingProjects.slice(0, 2)} />
          );
          remainingProjects = remainingProjects.slice(2);
        } else if (remainingProjects.length === 1) {
          rows.push(
            <Row1 key={`row1-${rows.length}`} projects={remainingProjects.slice(0, 1)} />
          );
          remainingProjects = remainingProjects.slice(1);
        }
      }
  
      return rows;
    };
  
    return (
      <>
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div className="text-center text-red-500 py-5">
            <p>Error loading sections: {error.message || 'Something went wrong'}</p>
            <button
              className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : data && data.projects ? (
          <div className="min-h-screen pb-8 pt-20 px-4 sm:py-20 sm:px-6 lg:px-8">
            <div className="border-b-2 border-black mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text">
                Our Projects
              </h1>
            </div>
            <div className="space-y-4 sm:space-y-6 w-full">
              {data.projects.length >= 8 ? (
                <>
                {initialProjectState(data.projects)}
                {dynamicProjectState(data.projects.slice(8))}
                </>
              ) : (
                <div>Not enough projects to display</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No sections available</div>
        )}
      </>
    );
  };

export default Projects;