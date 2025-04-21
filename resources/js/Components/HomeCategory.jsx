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
            <div className="mx-auto w-11/12 flex flex-col">
                {/* Title */}
                <div className="mb-4">
                    <h2 className="text-2xl font-genos text-gray-800 lg:text-7xl dark:text-white">Categories</h2>
                </div>

                <div className="grid gap-4 mt-4 flex-grow grid-cols-1 md:grid-cols-4 md:grid-rows-2">
                    {category.map((cat, i) => {
                        const layout = [
                            "md:row-span-2 md:col-span-1 h-90 md:h-auto",       // category[0]
                            "md:col-span-2 md:row-span-1 h-60",                 // category[1]
                            "md:col-span-1 md:row-span-1 h-60 md:h-auto",       // category[2]
                            "md:col-span-1 md:row-span-1 h-60 md:h-auto",       // category[3]
                            "md:col-span-2 md:row-span-1 h-60",                 // category[4]
                        ];

                        return (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.id}`}
                                className={`relative rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.03] ${layout[i] || ""}`}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.type}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-all duration-300" />
                                <div className="absolute bottom-4 left-4 z-10 px-2 py-1 rounded">
                                <h2 className="text-xl font-genos text-white lg:text-4xl">{cat.type}</h2>
                             </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};

export default HomeCategory;
