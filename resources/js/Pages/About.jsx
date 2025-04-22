import { motion } from "framer-motion";
import { FaLightbulb, FaBuilding, FaExclamationTriangle } from "react-icons/fa";
import { MdDesignServices, MdTune } from "react-icons/md";
import { GiStreetLight, GiPartyFlags } from "react-icons/gi";

function ContentSection16() {
    return (
        <section className="p-8 mt-16 font-AverageSans bg-light-background dark:bg-dark-background ">
            <div className="mx-auto">
                <h2 className="my-4 ml-6 font-Agdasima font-semibold text-3xl md:text-4xl lg:text-5xl 3xl:text-8xl text-left leading-snug text-light-primary dark:text-dark-primary ">
                    ABOUT US
                </h2>
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 ">
                    <div className="flex flex-col gap-6 md:w-1/2">
                        <div className="p-6">
                            <p className="font-serif text-sm md:text-lg lg:text-xl xl:text-2xl 3xl:text-4xl text-light-text2 dark:text-dark-secondary">
                                As a leading international specialist for architectural lighting, our tools represent quality, innovation,
                                design, efficiency, and reliability. We think and work holistically, ensuring that the products and services
                                required by our internal customers are available from sourcing and serial supply to the end of life cycle.
                            </p>
                            <div className="grid transition-all duration-500 ease-in-out md:hidden grid-rows-[1fr] opacity-100 scale-100">
                                <div className="overflow-hidden">
                                    <p className="font-serif text-sm md:text-lg lg:text-xl xl:text-2xl  3xl:text-4xl text-light-text2 dark:text-dark-secondary">
                                        Being successful together means setting out on a path and working together to achieve the objectives we
                                        set ourselves. This is why we think not only from our perspective with every project but also from the
                                        perspective of the supplier. We do everything possible to maintain a business relationship based on
                                        partnership that offers both sides sustainable and value-adding perspectives.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <p className="font-serif text-sm md:text-lg lg:text-xl xl:text-2xl 3xl:text-4xl text-light-text2 dark:text-dark-secondary">
                                    Being successful together means setting out on a path and working together to achieve the objectives we
                                    set ourselves. This is why we think not only from our perspective with every project but also from the
                                    perspective of the supplier. We do everything possible to maintain a business relationship based on
                                    partnership that offers both sides sustainable and value-adding perspectives.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-64 md:h-auto md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                        <img src="https://picsum.photos/200" alt="About Us" className="w-full h-full object-cover rounded-lg" />
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
                <h2 className="my-4 font-black font-Agdasima text-3xl md:text-4xl lg:text-5xl 3xl:text-7x text-left leading-snug text-light-primary dark:text-dark-accent ">
                    Mission
                </h2>
                <h5 className="mb-6 ml-6 font-serif text-sm md:text-lg lg:text-xl xl:text-xl 3xl:text-2xl text-light-text dark:text-dark-text">
                    We simplify complex lighting projects through <strong>exceptional customer experiences</strong> driven by <strong>innovation, design, and sustainability</strong>.
                </h5>
                <div className="flex flex-col md:flex-row items-center gap-12 ml-6">
                    <div className="w-full md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                        <img src="https://picsum.photos/200" alt="Lighting Innovation" className="w-full h-full rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-6 md:w-1/2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 border border-light-accent dark:border-dark-accent shadow-md rounded-lg bg-white dark:bg-gray-900 hover:scale-[102%] transition-all duration-500 ease-in-out"
                            >
                                <p className="text-lg md:text-xl lg:text-2xl font-normal font-Agdasima text-light-primary dark:text-dark-primary" dangerouslySetInnerHTML={{ __html: item.text }} />
                                <h6 className="mt-4 text-lg md:text-xl lg:text-2xl font-bold font-Agdasima text-light-primary dark:text-dark-primary">{item.title}</h6>
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
        { year: "2015", title: "Founded", description: "Started as a lighting solutions provider.", color: "#2d587a" },
        { year: "2017", title: "Expansion", description: "Expanded into commercial lighting.", color: "#4f7b9c" },
        { year: "2019", title: "Innovations", description: "Introduced smart lighting tech.", color: "#729ebf" },
        { year: "2021", title: "Global Reach", description: "Became an international brand.", color: "#85a0b3" },
        { year: "2023", title: "Sustainability", description: "Focused on eco-friendly lighting.", color: "#9aa2a9" },
    ];

    return (
        <div className="p-8 bg-light-background dark:bg-dark-background ">
            <h2 className="my-4 font-Agdasima font-black text-3xl md:text-4xl lg:text-5xl 3xl:text-7xl text-left leading-snug text-light-primary dark:text-dark-accent">
                Our Journey
            </h2>
            <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center flex-1"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 shadow-md mb-2"
                             style={{ borderColor: event.color }}>
                            <span className="font-bold" style={{ color: event.color }}>{event.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold font-Agdasima" style={{ color: event.color }}>{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.description}</p>
                    </motion.div>
                ))}
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
                <h2 className="font-Agdasima text-3xl md:text-4xl lg:text-5xl 3xl:text-7x font-extrabold text-light-primary dark:text-dark-primary  mb-8">
                    Our Services
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {services.slice(0, 4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                        >
                            <Icon className="text-5xl text-light-primary dark:text-dark-primary mb-3 border-2 border-light-primary dark:border-dark-primary p-3 rounded-full" />
                            <h3 className="text-lg font-Agdasima font-semibold text-light-text dark:text-dark-text">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.slice(4).map(({ icon: Icon, title }, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ${
                                index === 2 ? "lg:col-span-1 col-span-3 w-full" : ""
                            }`}
                        >
                            <Icon className="text-5xl text-light-primary dark:text-dark-primary mb-3 border-2 border-light-primary dark:border-dark-primary p-3 rounded-full" />
                            <h3 className="text-lg font-Agdasima font-semibold text-light-text dark:text-dark-text">
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