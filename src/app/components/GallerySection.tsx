import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  {
    url: "/images/21.jpg",
    alt: "Невеста в белом платье"
  },
  {
    url: "/images/4.jpg",
    alt: "Жених и невеста"
  },
  {
    url: "/images/22.jpg",
    alt: "Пара на природе"
  },
  {
    url: "/images/23.jpg",
    alt: "Поцелуй молодоженов"
  },
  {
    url: "/images/3.jpg",
    alt: "Романтический момент"
  },
  {
    url: "/images/24.jpg",
    alt: "Танец пары"
  }
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif mb-4">Наши Моменты</h2>
            <p className="text-muted-foreground">Немного из нашей истории любви</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Закрыть"
          >
            <X className="w-8 h-8" />
          </button>

          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={photos[selectedImage].url}
            alt={photos[selectedImage].alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                aria-label={`Перейти к фото ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          {selectedImage > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors text-4xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          )}
          {selectedImage < photos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors text-4xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
              aria-label="Следующее фото"
            >
              ›
            </button>
          )}
        </motion.div>
      )}
    </>
  );
}
