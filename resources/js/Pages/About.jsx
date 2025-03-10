import { motion } from "framer-motion";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { MdTune } from "react-icons/md";
import { GiStreetLight } from "react-icons/gi";
import { GiPartyFlags } from "react-icons/gi";

// Content Section 16 Component


function ContentSection16() {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="p-8 mt-16">
            <div className="mx-auto">
                {/* Title */}
                <h2 className="my-4 font-black text-4xl text-left leading-snug text-blue-gray-900">
                    ABOUT US
                </h2>

                {/* Layout: Text on the left, Image on the right */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                    {/* Text Container */}
                    <div className="flex flex-col gap-6 md:w-1/2">
                        <div className="p-6">
                            <p className="font-normal text-gray-600 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                                As a leading international specialist for architectural lighting, our tools represent quality, innovation,
                                design, efficiency, and reliability. We think and work holistically, ensuring that the products and services
                                required by our internal customers are available from sourcing and serial supply to the end of life cycle.
                            </p>

                            {/* Expandable Text with Smooth Transition */}
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${isExpanded
                                        ? "grid-rows-[1fr] opacity-100 scale-100"
                                        : "grid-rows-[0fr] opacity-0 scale-95"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="font-normal text-gray-600 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                                        Being successful together means setting out on a path and working together to achieve the objectives we
                                        set ourselves. This is why we think not only from our perspective with every project but also from the
                                        perspective of the supplier. We do everything possible to maintain a business relationship based on
                                        partnership that offers both sides sustainable and value-adding perspectives. We stand by what we do, and
                                        you can rely on our promise.
                                    </p>
                                </div>
                            </div>

                            {/* Toggle Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 text-blue-600 font-medium transition-colors duration-200 hover:text-blue-800"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? "Hide" : "Read More"}
                            </button>
                        </div>
                    </div>

                    {/* Image Container */}
                    <div className="w-full h-64 md:h-auto md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://picsum.photos/200" // Replace with actual image URL
                            alt="About Us"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};


// Testimonial Section 16 Component
function TestimonialSection16() {
    return (
        <section className="p-8">
            <div className="mx-auto">
                <h2 className="my-4 font-black text-4xl text-left leading-snug text-blue-gray-900">
                    Mission
                </h2>

                <h5 className="mb-6 ml-6 font-medium text-lg text-blue-gray-700 xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
                    We simplify complex lighting projects through{" "}
                    <strong>exceptional customer experiences</strong> driven by{" "}
                    <strong>innovation, design, and sustainability</strong>.
                </h5>

                <div className="flex flex-col md:flex-row gap-12 ml-6">
                    {/* Image Container */}
                    <div className="w-full  md:w-5/2 lg:w-4/5 shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://picsum.photos/200"
                            alt="Lighting Innovation"
                            className="w-full h-full rounded-lg"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-6 md:w-5/2 lg:w-4/5 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl ">
                        {[
                            { title: "Support", text: "Light reveals beauty, guiding our vision and enriching experiences." },
                            { title: "Satisfying", text: "Lighting should be <strong>calming and immersive</strong> – blending function with beauty." },
                            { title: "Sustainable", text: "We prioritize <strong>energy efficiency, smart design, and long-term solutions</strong>." }
                        ].map((item, index) => (
                            <div key={index} className="p-6 shadow-md rounded-lg bg-white hover:scale-[102%] transition-all duration-500 ease-in-out">
                                <p className="font-normal text-gray-600 text-left " dangerouslySetInnerHTML={{ __html: item.text }} />
                                <h6 className="mt-4 font-bold text-blue-gray-900 xs:text-sm sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl">{item.title}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Timeline Component
function Timeline() {
    const events = [
        { year: "2015", title: "Founded", description: "Started as a lighting solutions provider.", color: "#2d587a" },
        { year: "2017", title: "Expansion", description: "Expanded into commercial lighting.", color: "#4f7b9c" },
        { year: "2019", title: "Innovations", description: "Introduced smart lighting tech.", color: "#729ebf" },
        { year: "2021", title: "Global Reach", description: "Became an international brand.", color: "#85a0b3" },
        { year: "2023", title: "Sustainability", description: "Focused on eco-friendly lighting.", color: "#9aa2a9" },
    ];

    return (
        <div className="p-8">
            <h2 className="my-4 font-black text-4xl text-left leading-snug text-blue-gray-900 ">Our Journey</h2>

            {/* ✅ Small Screen (Vertical Timeline) */}
            <div className="md:hidden relative flex flex-col items-center ">
                <div className="absolute top-0 bottom-0 w-1  bg-gradient-to-b from-[#1c4769] via-[#96c2e3] to-[#a3a3a3]"></div>

                <div className="flex flex-col gap-10 relative ml-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`flex items-center gap-5 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                        >
                            <div className="relative w-14 h-14 bg-white border-4 border-[#1c4769] flex items-center justify-center rounded-full shadow-md">
                                <span className="text-[#1a1400] font-bold">{event.year}</span>
                            </div>

                            <div className=" bg-white p-6 rounded-lg shadow-md w-auto j">
                                <h3 className="text-base font-semibold text-[#1c4769]">{event.title}</h3>
                                {/* <p className="text-[#a3a3a3] text-sm mt-2 hidden">{event.description}</p>   */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ✅ Medium Screens (Horizontal Timeline) */}
            <div className="hidden md:flex lg:hidden relative justify-center mt-20 mb-6 px-8">
                <div className="absolute top-1/2 w-11/12 max-w-4xl h-1.5 bg-gradient-to-r from-[#1c4769] via-[#96c2e3] to-[#a3a3a3] rounded-full"></div>

                <div className="flex w-full max-w-4xl justify-between mx-auto">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center flex-1 min-w-[100px]"
                        >
                            {/* Circle */}
                            <div className="relative">
                                <div className="w-12 h-12 flex border-4 items-center rounded-full justify-center shadow-md" style={{ borderColor: event.color }}>
                                    <span className="font-bold" style={{ color: event.color }}>{event.year}</span>
                                </div>
                                <div className="w-1 h-10 mx-auto" style={{ backgroundColor: event.color }}></div>

                            </div>

                            {/* Text */}
                            <div className={`text-center mt-4 w-auto md:${index % 2 === 0 ? "mb-8" : "mt-8"}`}>
                                <h3 className="text-base font-semibold" style={{ color: event.color }}>{event.title}</h3>
                                <p className="text-[#a3a3a3] text-xs w-28 ">{event.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ✅ Large Screens (Wider Horizontal Timeline) */}
            <div className="hidden lg:flex relative justify-center mt-28 mb-14 px-12">
                <div className="absolute top-1/2 w-11/12 max-w-6xl h-2 bg-gradient-to-r from-[#1c4769] via-[#729ebf] to-[#a3a3a3] rounded-full"></div>

                <div className="flex w-full max-w-6xl justify-between mx-auto">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center flex-1 min-w-[140px]"
                        >
                            {/* Circle */}
                            <div className="relative">
                                <div className="w-14 h-14 flex border-4 items-center rounded-full justify-center shadow-md" style={{ borderColor: event.color }}>
                                    <span className="font-bold" style={{ color: event.color }}>{event.year}</span>
                                </div>
                                <div className="w-1 h-7 mx-auto" style={{ backgroundColor: event.color }}></div>
                            </div>

                            {/* Text */}
                            <div className={`text-center mt-4 w-auto lg:${index % 2 === 0 ? "mb-12" : "mt-12"}`}>
                                <h3 className="text-lg font-semibold " style={{ color: event.color }}>{event.title}</h3>
                                <p className="text-[#a3a3a3] text-sm w-40  ">{event.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}



// Services Section




const services = [
    { icon: FaLightbulb, title: "Indoor Lighting Solution" },
    { icon: FaBuilding, title: "Façade Lighting" },
    { icon: FaExclamationTriangle, title: "Emergency Lighting" },
    { icon: MdDesignServices, title: "Lighting Design Services" },
    { icon: MdTune, title: "Customize Lighting" },
    { icon: GiStreetLight, title: "Landscape Lighting" },
    { icon: GiPartyFlags, title: "Festival Lighting Design" },
];

const Services = () => {
    return (
        <section className="px-6 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
                    Our Services
                </h2>

                {/* First Row */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {services.slice(0, 4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform 
                    transform hover:scale-105 duration-300"
                        >
                            <Icon className="text-5xl text-blue-600 dark:text-blue-400 mb-3 border-2 border-blue-600 p-3 rounded-full" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Second Row - Visually Separated */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.slice(4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform 
                    transform hover:scale-105 duration-300
                    ${index === 2 ? "lg:col-span-1 col-span-3 w-full" : ""}  /* Last card takes full width */

                `}
                        >
                            <Icon className="text-5xl text-blue-600 dark:text-blue-400 mb-3 border-2 border-blue-600 p-3 rounded-full" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};








const About = () => {
    return (
        <div>
            <ContentSection16 />
            <TestimonialSection16 />
            <Timeline />
            <Services />
        </div>
    );
};

export default About;