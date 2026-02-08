import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { ChevronDown, ChevronRight, ShoppingBag, Filter, ChevronLeft } from 'lucide-react';

// --- Mock Data Generation ---

type Product = {
    id: number;
    title: string;
    sku: string;
    price: string;
    image: string;
    badge?: string;
};

// Helper: Generate mock products
const generateProducts = (category: 'Cricket' | 'Football', count: number): Product[] => {
    const images = ['/1.png', '/2.png', '/3.jpg', '/4.jpg', '/5.png', '/6.jpg'];
    const titles = [
        'Pro Performance Jersey', 'Elite Training Kit', 'Match Day Uniform',
        'Fan Edition Tee', 'Club Merchandise', 'Sublimated Sportswear',
        'Tournament Gear', 'Practice Vest', 'Team Warmup Jacket', 'Custom Player Kit'
    ];

    return Array.from({ length: count }, (_, i) => {
        const imgIndex = i % images.length;
        const titleIndex = i % titles.length;
        const price = 499 + Math.floor(Math.random() * 1500); // Random price between 499 and 1999

        return {
            id: category === 'Cricket' ? i + 1 : i + 1001,
            title: `${category} ${titles[titleIndex]} ${Math.floor(i / 10) + 1}`,
            sku: `${category.substring(0, 3).toUpperCase()}-${1000 + i}`,
            price: `₹${price}`,
            image: images[imgIndex],
            badge: i % 15 === 0 ? 'New' : (i % 23 === 0 ? 'Sale' : undefined)
        };
    });
};

const cricketProducts = generateProducts('Cricket', 100);
const footballProducts = generateProducts('Football', 100);

const sidebarCategories = [
    { name: 'New Products', items: [] },
    { name: 'Special Offers', items: ['Bundle Deals', 'Clearance'] },
    { name: "Men's", items: ['Jerseys', 'Shorts', 'Training Kits'] },
    { name: "Women's", items: ['Jerseys', 'Activewear'] },
    { name: 'Kids & Youth', items: ['School Kits', 'Summer Camps'] },
    { name: 'Accessories', items: ['Caps', 'Socks', 'Bags'] },
];

// --- Components ---

const Sidebar = () => {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ "Men's": true });
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleCategory = (name: string) => {
        setOpenCategories(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
            <div className="bg-gray-50 rounded-lg md:bg-transparent md:p-0 sticky top-40 overflow-hidden">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex items-center justify-between p-4 md:hidden font-bold text-lg bg-gray-100"
                >
                    <span className="flex items-center gap-2"><Filter size={20} /> Filters</span>
                    {isMobileOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>

                <div className={`p-4 md:p-0 ${isMobileOpen ? 'block' : 'hidden md:block'}`}>
                    <h3 className="font-bold text-lg mb-4 hidden md:flex items-center gap-2">
                        <Filter size={20} /> Filters
                    </h3>
                    <ul className="space-y-1">
                        {sidebarCategories.map((cat) => (
                            <li key={cat.name} className="border-b border-gray-100 last:border-0">
                                <button
                                    onClick={() => toggleCategory(cat.name)}
                                    className="w-full flex items-center justify-between py-2 md:py-3 text-left hover:text-blue-600 transition-colors group"
                                >
                                    <span className={`font-medium text-sm md:text-base ${openCategories[cat.name] ? 'text-blue-600' : 'text-gray-700'}`}>
                                        {cat.name}
                                    </span>
                                    {cat.items.length > 0 && (
                                        openCategories[cat.name] ?
                                            <ChevronDown size={16} className="text-gray-400 group-hover:text-blue-600" /> :
                                            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
                                    )}
                                </button>

                                {/* Submenu */}
                                {cat.items.length > 0 && openCategories[cat.name] && (
                                    <ul className="pl-4 pb-2 space-y-1 md:space-y-2 animate-fadeIn">
                                        {cat.items.map((item) => (
                                            <li key={item}>
                                                <a href="#" className="text-xs md:text-sm text-gray-500 hover:text-blue-500 block py-1">
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-100 flex flex-col">
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {product.badge && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-yellow-400 text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded text-black uppercase tracking-wide z-10">
                        {product.badge}
                    </span>
                )}
                <button className="hidden md:block absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white z-10">
                    <ShoppingBag size={18} />
                </button>
            </div>

            <div className="p-2 md:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] text-xs md:text-base leading-tight">
                    {product.title}
                </h3>
                <div className="text-[10px] md:text-xs text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">
                    {product.sku}
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <button className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wide">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

const GalleryPage = () => {
    const [activeTab, setActiveTab] = useState<'cricket' | 'football'>('cricket');
    const [isScrolled, setIsScrolled] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const allProducts = activeTab === 'cricket' ? cricketProducts : footballProducts;

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to top of grid
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset pagination when tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navigation />

            {/* Video Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                        src="https://www.youtube.com/embed/CO8iWd1IiQ0?autoplay=1&mute=1&controls=0&loop=1&playlist=CO8iWd1IiQ0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                        title="Background Process Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                </div>
                <div className="relative z-20 text-center px-4 animate-fadeIn">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-wide">
                        OUR GALLERY
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl font-light">
                        Explore Our Premium Collections
                    </p>
                </div>
            </div>

            <main className="flex-grow py-8 md:py-12 bg-white container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Tabs & Sort Header */}
                <div className={`sticky top-20 z-30 bg-white/95 backdrop-blur-sm py-4 mb-8 border-b transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        {/* Tab Switcher */}
                        <div className="bg-gray-100 p-1 rounded-lg inline-flex relative w-full md:w-auto">
                            <div
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-white shadow-sm transition-all duration-300 ease-out`}
                                style={{
                                    left: activeTab === 'cricket' ? '4px' : 'calc(50%)'
                                }}
                            />
                            <button
                                onClick={() => setActiveTab('cricket')}
                                className={`relative z-10 flex-1 px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-md
                                ${activeTab === 'cricket' ? 'text-navy-dark' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                CRICKET
                            </button>
                            <button
                                onClick={() => setActiveTab('football')}
                                className={`relative z-10 flex-1 px-6 py-2 text-sm font-bold transition-colors duration-300 rounded-md
                                ${activeTab === 'football' ? 'text-navy-dark' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                FOOTBALL
                            </button>
                        </div>

                        <div className="text-gray-500 text-sm hidden md:block">
                            Showing <span className="font-bold text-gray-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, allProducts.length)}</span> of <span className="font-bold text-gray-900">{allProducts.length}</span> products
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Left Sidebar */}
                    <Sidebar />

                    {/* Product Grid & Pagination */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 md:hidden">
                            <h2 className="text-xl font-bold text-navy-dark">Product Catalog</h2>
                            <span className="text-sm text-gray-500">{allProducts.length} Items</span>
                        </div>

                        {currentProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                                    {currentProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg border ${currentPage === 1 ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => {
                                        // Simple pagination logic: Show first, last, and current surrounding
                                        const page = i + 1;
                                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => paginate(page)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-colors border ${currentPage === page
                                                        ? 'bg-navy-dark text-white border-navy-dark'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                                            return <span key={page} className="text-gray-400">...</span>;
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg border ${currentPage === totalPages ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No products found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppIcon />
        </div>
    );
};

export default GalleryPage;
