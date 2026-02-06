import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, RotateCcw, CreditCard, Headphones } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const jerseyImages = [
    'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3651378/pexels-photo-3651378.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % jerseyImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % jerseyImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + jerseyImages.length) % jerseyImages.length);

  return (
    <div className="flex flex-col w-full">


      {/* 1. NEW VIDEO HEADER SECTION */}
      <section className="relative w-full h-[600px] flex items-center overflow-hidden pt-20">

        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div className="absolute inset-0 z-10 bg-black/20"></div> {/* Optional overlay for contrast */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
              src="https://www.youtube.com/embed/CO8iWd1IiQ0?autoplay=1&mute=1&controls=0&loop=1&playlist=CO8iWd1IiQ0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3"
              title="Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>

        {/* Angled Pink Gradient Overlay - Left Side */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[55%] bg-gradient-to-r from-orange-500 to-pink-600 z-10 shadow-2xl"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center h-full">
          <div className="w-full md:w-1/2 text-white p-4 md:p-0">
            <h3 className="text-xl md:text-2xl font-medium mb-2 opacity-90 drop-shadow-md">
              The #1 Industrial-Grade <br /> Sublimation Systems
            </h3>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
              Trusted By <br /> Entrepreneurs
            </h1>
            <button className="bg-white/20 hover:bg-white/30 border border-white/50 backdrop-blur-sm text-white text-lg font-semibold py-4 px-10 rounded transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
      </section>


      {/* 2. EXISTING SLIDER SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Slider Section */}
          <div className="relative">
            {/* Navigation Arrows - Outside the card on large screens */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-2 text-blue-900 hover:text-blue-700 transition-colors hidden md:block"
            >
              <ChevronLeft size={40} strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-2 text-blue-900 hover:text-blue-700 transition-colors hidden md:block"
            >
              <ChevronRight size={40} strokeWidth={2.5} />
            </button>

            {/* Card Slider */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
              {jerseyImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl text-white">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-4">
                      Design Your Team's <br /> Ultimate Jersey Today
                    </h2>

                    <div className="mb-4">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                        Limited Time Offer
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl md:text-6xl font-bold">30%</span>
                      <span className="text-2xl md:text-3xl font-light uppercase">OFF</span>
                    </div>

                    <p className="text-lg text-gray-200 mb-8 max-w-lg">
                      Premium professional cricket jerseys. Perfect for your team's victory and comfort on the field.
                    </p>

                    <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full w-fit transition-all text-sm uppercase tracking-wider shadow-lg">
                      Get Yours Today!
                    </button>
                  </div>
                </div>
              ))}

              {/* Dots Pagination */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {jerseyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-400/50 hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>

              {/* Mobile Navigation Arrows (Inside card) */}
              <div className="absolute inset-0 flex justify-between items-center px-2 md:hidden pointer-events-none">
                <button onClick={prevSlide} className="p-2 pointer-events-auto text-white/70 hover:text-white">
                  <ChevronLeft size={30} />
                </button>
                <button onClick={nextSlide} className="p-2 pointer-events-auto text-white/70 hover:text-white">
                  <ChevronRight size={30} />
                </button>
              </div>
            </div>
          </div>

          {/* Features/Trust Banner */}
          <div className="mt-8 bg-blue-900 rounded-xl py-8 px-4 sm:px-8 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Feature 1 */}
              <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-blue-800 pb-4 md:pb-0 last:border-0">
                <Truck size={40} className="text-white flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-bold text-lg uppercase">Free Delivery</h3>
                  <p className="text-blue-200 text-xs uppercase tracking-wide">All over India above Rs.399</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-blue-800 pb-4 md:pb-0 last:border-0">
                <RotateCcw size={40} className="text-white flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-bold text-lg uppercase">7 Days Return</h3>
                  <p className="text-blue-200 text-xs uppercase tracking-wide">If goods have problems</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-blue-800 pb-4 md:pb-0 last:border-0">
                <CreditCard size={40} className="text-white flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-bold text-lg uppercase">Secure Payment</h3>
                  <p className="text-blue-200 text-xs uppercase tracking-wide">100% Secure Payment</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-4">
                <Headphones size={40} className="text-white flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-bold text-lg uppercase">Customer Care</h3>
                  <p className="text-blue-200 text-xs uppercase tracking-wide">10am to 7pm Except Sundays</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Hero;
