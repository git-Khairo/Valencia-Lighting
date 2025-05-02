import { motion } from "framer-motion";
import { FaLightbulb, FaBuilding, FaExclamationTriangle } from "react-icons/fa";
import { MdDesignServices, MdTune } from "react-icons/md";
import { GiStreetLight, GiPartyFlags } from "react-icons/gi";

function ContentSection16() {
    return (
        <section className="px-8 pt-20 bg-light-background dark:bg-dark-background ">
            <div className="mx-auto">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    <div className="flex flex-col gap-6 md:w-1/2">
                        <h2 className="my-2 ml-6 border-b pb-2 border-light-primary dark:border-dark-primary font-Montserrat text-3xl md:text-4xl lg:text-5xl 3xl:text-8xl text-left leading-snug text-light-primary dark:text-dark-primary ">
                            ABOUT US
                        </h2>
                        <div className="font-Jura ml-6">
                            <p className="text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-3xl text-light-text dark:text-dark-text">
                                At Vallencia Lighting, we are an international specialist in architectural lighting solutions, committed to delivering excellence in quality, design, and energy efficiency. With a holistic approach to every project, we combine innovation and technical precision to provide lighting systems that are not only functional but also elevate the visual experience of spaces. Our comprehensive services range from customized lighting design and consultation to seamless project delivery and post-installation support.
                            </p>
                            <div className="block">
                                <p className="text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-3xl text-light-text dark:text-dark-text">
                                    We value long-term partnerships built on trust, transparency, and mutual growth. By thinking from the perspective of both client and supplier, we ensure sustainable, value-driven outcomes that stand the test of time. Whether it’s a private villa, hospital, office, or iconic commercial space, we tailor our solutions to meet the unique demands of each environment—enhancing beauty, safety, and comfort through light.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto h-64 md:h-[500px] md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                        <img src="/storage/aboutUs/image1.jpg" alt="About Us" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialSection16() {
    const items = [
        { title: "Support", text: "Light reveals beauty, guiding our vision and enriching experiences." },
        { title: "Satisfying", text: "Lighting should be <strong>calming and immersive</strong> – blending function with beauty." },
        { title: "Sustainable", text: "We prioritize <strong>energy efficiency, smart design, and long-term solutions</strong>." }
    ];

    return (
        <section className="p-8 font-AverageSans bg-light-background dark:bg-dark-background ">
            <div className="mx-auto">
                <h2 className="my-4 ml-6 font-Montserrat text-3xl md:text-4xl lg:text-5xl 3xl:text-7x text-left leading-snug text-light-primary dark:text-dark-primary ">
                    Our Mission
                </h2>
                <h5 className="mb-6 ml-6 font-SulphurPoint text-sm md:text-lg lg:text-xl xl:text-xl 3xl:text-2xl text-light-text dark:text-dark-text">
                We simplify complex lighting projects by delivering outstanding design, reliable service, and innovative products that create safe, efficient, and inspiring environments.
                </h5>
                <div className="flex flex-col md:flex-row items-center gap-12 ml-6">
                    <div className="w-full h-64 md:h-[500px] md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                        <img src="storage/HomeSlider/image4.jpg" alt="Lighting Innovation" className="w-full h-full rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-6 md:w-1/2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 border-2 border-light-primary dark:border-dark-primary shadow-md rounded-lg dark:bg-dark-background2 hover:scale-[102%] transition-all duration-500 ease-in-out"
                            >
                                <p className="text-lg md:text-lg lg:text-xl font-normal font-Jura text-light-primary dark:text-dark-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                                <h6 className="mt-4 text-lg md:text-xl lg:text-2xl font-Montserrat text-light-primary dark:text-dark-primary">{item.title}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Timeline() {
    const events = [
        { year: "2006", title: "Founded", description: "Started as a lighting solutions provider.", color: "#2d587a" },
        { year: "2017", title: "Expansion", description: "Expanded into commercial lighting.", color: "#4f7b9c" },
        { year: "2019", title: "Innovations", description: "Introduced smart lighting tech.", color: "#729ebf" },
        { year: "2021", title: "Global Reach", description: "Became an international brand.", color: "#85a0b3" },
        { year: "2023", title: "Sustainability", description: "Focused on eco-friendly lighting.", color: "#9aa2a9" },
    ];

    return (
        <div className="p-8 font-AverageSans bg-light-background dark:bg-dark-background ">
            <h2 className="my-4 ml-6 font-Montserrat text-3xl md:text-4xl lg:text-5xl 3xl:text-8xl text-left leading-snug text-light-primary dark:text-dark-primary">
                Our Journey</h2>

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
                            <div className="relative w-14 h-14 border-4 flex items-center justify-center rounded-full shadow-md" style={{ borderColor: event.color }}>
                                <span className="font-SulphurPoint" style={{ color: event.color }}>{event.year}</span>
                            </div>

                            <div className="p-6 rounded-lg shadow-md w-auto border-2 bg-light-background dark:bg-dark-background" style={{ borderColor: event.color }}>
                                <h3 className="text-base font-SulphurPoint" style={{ color: event.color }}>{event.title}</h3>
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
                                    <span className="font-SulphurPoint" style={{ color: event.color }}>{event.year}</span>
                                </div>
                                <div className="w-1 h-10 mx-auto" style={{ backgroundColor: event.color }}></div>

                            </div>

                            {/* Text */}
                            <div className={`text-center mt-4 w-auto md:${index % 2 === 0 ? "mb-8" : "mt-8"}`}>
                                <h3 className="text-lg font-SulphurPoint" style={{ color: event.color }}>{event.title}</h3>
                                <p className="text-[#a3a3a3] text-xs w-28 font-Jura">{event.description}</p>
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
                                    <span className="font-SulphurPoint text-lg" style={{ color: event.color }}>{event.year}</span>
                                </div>
                                <div className="w-1 h-7 mx-auto" style={{ backgroundColor: event.color }}></div>
                            </div>

                            {/* Text */}
                            <div className={`text-center mt-4 w-auto lg:${index % 2 === 0 ? "mb-12" : "mt-12"}`}>
                                <h3 className="text-2xl font-SulphurPoint" style={{ color: event.color }}>{event.title}</h3>
                                <p className="text-[#a3a3a3] text-sm w-40 font-Jura">{event.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );  
}

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
        <section className="px-6 py-12 lg:py-16 bg-light-background dark:bg-dark-background font-AverageSans">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="font-Montserrat text-3xl md:text-4xl lg:text-5xl 3xl:text-7x text-light-primary dark:text-dark-primary mb-8">
                    Our Services
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 md:mb-12">
                    {services.slice(0, 4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 border-2 border-light-primary dark:border-dark-primary bg-light-background dark:bg-dark-background rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                        >
                            <Icon className="text-5xl text-light-primary dark:text-dark-primary mb-3 border-2 border-light-primary dark:border-dark-primary p-3 rounded-full" />
                            <h3 className="text-lg font-SulphurPoint font-semibold text-light-text dark:text-dark-text">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.slice(4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-6 border-2 border-light-primary dark:border-dark-primary bg-light-background dark:bg-dark-background rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ${
                                index === 2 ? "lg:col-span-1 col-span-2" : "col-span-1"
                            }`}
                        >
                            <Icon className="text-5xl text-light-primary dark:text-dark-primary mb-3 border-2 border-light-primary dark:border-dark-primary p-3 rounded-full" />
                            <h3 className="text-lg font-SulphurPoint font-semibold text-light-text dark:text-dark-text">
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