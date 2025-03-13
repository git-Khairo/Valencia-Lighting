import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomeCategory = ({category}) => {
    return ( 
        <>
            <motion.section 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 1 }} 
    viewport={{ once: true }}
     className="bg-white dark:bg-gray-800 h-full py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
            <div className="flex items-center gap-12">
                <h2 className="text-center text-2xl font-genos text-gray-800 lg:text-7xl dark:text-white">Categories</h2>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {category.map((cat, index) => (
                <Link to={`/category/${cat.id}`} key={cat.id}
                    className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 ${index === 1 || index === 2 ? 'md:col-span-2' : 'md:col-span-1'}`}>
                    <img src={cat.image} alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-in-out group-hover:scale-110" />

                    <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">{cat.type}</span>
                </Link>
            ))}
        </div>
    </div>
</motion.section>
        </>
     );
}
 
export default HomeCategory;