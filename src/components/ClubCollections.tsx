import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ClubCollections = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const clubs = [
        { name: 'AC MILAN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/200px-Logo_of_AC_Milan.svg.png' },
        { name: 'AJAX', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/200px-Ajax_Amsterdam.svg.png' },
        { name: 'ALGERIA', logo: 'Afa_gold_logo24.svg.png' },
        { name: 'AL HILAL', logo: 'Al_Hilal_SFC_Logo.svg.png' },
        { name: 'AL NASSR', logo: 'al_nassr_fc.png' },
        { name: 'ARGENTINA', logo: 'Logo_of_Algeria_national_football_team_(SVG_version).svg.png' },
        { name: 'ARSENAL', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/200px-Arsenal_FC.svg.png' },
        { name: 'BARCELONA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/200px-FC_Barcelona_%28crest%29.svg.png' },
    ];

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl uppercase tracking-wide">
                            <span className="text-gray-400 font-bold">FOOTBALL CLUB</span>{' '}
                            <span className="text-black font-bold">COLLECTIONS</span>
                        </h2>
                    </div>
                    <button className="hidden md:block px-6 py-1.5 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
                        View All
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="relative group">

                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-[60%] -translate-x-4 md:-translate-x-12 z-10 p-2 text-blue-600 hover:text-blue-800 transition-colors bg-white/80 rounded-full shadow-lg md:shadow-none md:bg-transparent"
                        >
                            <ChevronLeft size={40} />
                        </button>
                    )}

                    {/* Slider */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-1"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {clubs.map((club, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-[160px] md:w-[200px] flex flex-col items-center"
                            >
                                <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={club.logo}
                                        alt={`${club.name} logo`}
                                        className="w-full h-auto object-contain max-h-[140px]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/200x200?text=${club.name.substring(0, 2)}`;
                                        }}
                                    />
                                </div>
                                <h3 className="text-blue-500 font-bold uppercase text-sm md:text-base text-center">
                                    {club.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-[60%] translate-x-4 md:translate-x-12 z-10 p-2 text-blue-600 hover:text-blue-800 transition-colors bg-white/80 rounded-full shadow-lg md:shadow-none md:bg-transparent"
                        >
                            <ChevronRight size={40} />
                        </button>
                    )}

                </div>

                {/* Pagination Dots (Visual Only for now as scroll is continuous) */}
                <div className="flex gap-2 mt-4 ml-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                </div>

            </div>
        </section>
    );
};

export default ClubCollections;
