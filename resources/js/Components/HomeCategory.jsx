import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomeCategory = ({ category }) => {
    return (    
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 py-6 px-4"
        >
            <div className="mx-auto  w-full flex flex-col">
                {/* Title */}
                <div className="mb-4">
                    <h2 className="text-2xl font-genos text-gray-800 lg:text-7xl dark:text-white">Categories</h2>
                </div>

                <div className="grid gap-4 mt-4 flex-grow grid-cols-1 md:grid-cols-4 md:grid-rows-2">
                    {category[0] && (
                        <Link
                            to={`/category/${category[0].id}`}
                            className="relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03]
                                       md:row-span-2 md:col-span-1 h-60 md:h-auto"
                        >
                            <img
                                src={category[0].image}
                                alt={category[0].type}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                            <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-all duration-300" />
                            <div className="mb-4 text-center">
                            <h2 className="text-xl font-genos text-gray-800 lg:text-5xl dark:text-white">
                            {category[0].type}
                                </h2>
                         </div>
                        </Link>
                    )}

                    {category[1] && (
                        <Link
                            to={`/category/${category[1].id}`}
                            className="relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03]
                                       md:col-span-2 md:row-span-1 h-60"
                        >
                            <img
                                src={category[1].image}
                                alt={category[1].type}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                            <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-all duration-300" />
                            <div className="mb-4 text-center">
                            <h2 className="text-xl font-genos text-gray-800 lg:text-5xl dark:text-white">
                            {category[1].type}
                                </h2>
                         </div>
                        </Link>
                    )}

                    {category[2] && (
                        <Link
                            to={`/category/${category[2].id}`}
                            className="relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03]
                                       md:col-span-1 md:row-span-1 h-60 md:h-auto"
                        >
                            <img
                                src={category[2].image}
                                alt={category[2].type}
                                className="absolute inset-0 w-full h-[80%] object-cover"
                                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                            <div className=" absolute inset-0 bg-black/10 hover:bg-black/30  transition-all duration-300" />
                            <div className="mt-48 ml-1">
                            <h2 className="text-xl font-genos text-gray-800 lg:text-5xl dark:text-white">
                            {category[2].type}
                                </h2>
                         </div>
                        </Link>
                    )}
                    {category[3] && (
                        <Link
                            to={`/category/${category[3].id}`}
                            className="relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03]
                                       md:col-span-1 md:row-span-1 h-60 md:h-auto"
                        >
                            <img
                                src={category[3].image}
                                alt={category[3].type}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                            <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-all duration-300" />
                            <div className="mb-4 text-center">
                            <h2 className="text-xl font-genos text-gray-800 lg:text-5xl dark:text-white">
                            {category[3].type}
                                </h2>
                         </div>
                        </Link>
                    )}

                {category[4] && (
                        <Link
                            to={`/category/${category[4].id}`}
                            className="relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03]
                                       md:col-span-2 md:row-span-1 h-60"
                        >
                            <img
                                src={category[4].image}
                                alt={category[4].type}
                                className="absolute inset-0 w-[70%] h-full object-cover"
                                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                            />
                            <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-all duration-300" />
                            <div className="mt-48 text-end mr-2">
                            <h2 className="text-xl font-genos text-gray-800 lg:text-5xl dark:text-white">
                            {category[4].type}
                                </h2>
                         </div>
                        </Link>
                    )}
                    
                </div>
            </div>
        </motion.section>
    );
};

export default HomeCategory;    