import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const navigate = useNavigate();

  const galleryItems = [
    {
      id: 1,
      title: 'Custom T-Shirt Design',
      image: '/1.png',
      alt: 'Custom T-Shirt Design'
    },
    {
      id: 2,
      title: 'Hoodie Print Sample',
      image: '/2.png',
      alt: 'Hoodie Print Sample'
    },
    {
      id: 3,
      title: 'Direct to Film Print',
      image: '/3.jpg',
      alt: 'Direct to Film Print'
    },
    {
      id: 4,
      title: 'Fashion Apparel',
      image: '/4.jpg',
      alt: 'Fashion Apparel'
    },
    {
      id: 5,
      title: 'Custom Design Work',
      image: '/5.png',
      alt: 'Custom Design Work'
    },
    {
      id: 6,
      title: 'Print Quality Sample',
      image: '/6.jpg',
      alt: 'Print Quality Sample'
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy-dark mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Explore our collection of stunning fashion prints and custom designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(index)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl h-64 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-bold tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/gallery')}
            className="inline-flex items-center px-8 py-3 bg-[#EE4444] text-white rounded-full font-semibold hover:bg-[#DD3333] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View More
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <img
              src={galleryItems[selectedImage].image}
              alt={galleryItems[selectedImage].alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-xl font-medium tracking-wide">
              {galleryItems[selectedImage].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
