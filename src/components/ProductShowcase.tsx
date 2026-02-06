
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Users, Baby, Shirt, Home } from 'lucide-react';

const categories = [
    { name: 'All', icon: Heart },
    { name: "Men's", icon: User },
    { name: "Women's", icon: Users },
    { name: 'Kids & Youth', icon: Baby },
    { name: 'Plus-size', icon: Shirt },
    { name: 'Home & Living', icon: Home },
];

const row1Images = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', // Replaced broken image
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=500&q=80',
    'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80',
];

const row2Images = [
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80',
    'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=500&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80',
];

// Duplicate items multiple times to ensure we fill the screen for smooth loop
const duplicateItems = <T,>(items: T[], times: number = 4) => {
    return Array(times).fill(items).flat();
};

const MarqueeRow = ({ images, direction = 'left' }: { images: string[]; direction?: 'left' | 'right' }) => {
    return (
        // justify-center ensures that on huge screens or during load, the strip remains centered
        <div className="flex w-full overflow-hidden select-none">
            <motion.div
                className="flex gap-4 shrink-0"
                initial={{ x: direction === 'left' ? '0%' : '-33.33%' }}
                animate={{
                    x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
                }}
                transition={{
                    duration: 40,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {/* We triple the list (and then some) to create a seamless loop. 
            By centering flex, we ensure we are looking at the 'middle' of the massive strip content. 
        */}
                {duplicateItems(images, 6).map((src, idx) => (
                    <div key={idx} className="relative w-40 h-40 md:w-64 md:h-64 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-900 border border-gray-800 group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        <img
                            src={src}
                            alt="Product"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                                // Fallback for broken images
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556906781-9a412961d28c?w=500&q=80';
                            }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const ProductShowcase = () => {
    return (
        <div className="bg-[#111111] text-white py-12 md:py-24 font-sans overflow-x-hidden">
            {/* 
        Refactored Layout: 
        1. Top container (constrained)
        2. Marquee container (full width)
        3. Bottom container (constrained)
      */}

            {/* 1. Header & Categories */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center mb-10 md:mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 md:mb-14 leading-tight">
                    130+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-blue-500">products</span>
                    <br />
                    to unveil your designs.
                </h2>

                <div className="w-full overflow-x-auto pb-4 hide-scrollbar flex justify-start md:justify-center">
                    <div className="flex flex-nowrap md:flex-wrap gap-4 md:gap-8 px-4">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px]">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white transition-colors duration-300 bg-gray-900 md:bg-transparent text-gray-400 group-hover:text-white">
                                    <cat.icon className={`w-5 h-5 md:w-6 md:h-6 ${idx === 0 ? 'text-blue-500' : ''}`} />
                                </div>
                                <span className="text-[10px] md:text-xs text-center text-gray-400 uppercase tracking-wide group-hover:text-white transition-colors whitespace-nowrap">
                                    {cat.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Marquee rows - Full width direct child */}
            <div className="w-full space-y-4 md:space-y-6 mb-12 md:mb-16">
                <MarqueeRow images={row1Images} direction="left" />
                <MarqueeRow images={row2Images} direction="right" />
            </div>

            {/* 3. CTA Button */}
            <div className="max-w-7xl mx-auto px-4 flex justify-center">
                <motion.a
                    href="https://wa.me/917812865788?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20or%20explore%20your%20design%20catalog."
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-100 transition-all inline-block"
                >
                    Place Order / Contact Us
                </motion.a>
            </div>
        </div>
    );
};
