import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый цвет на случай ошибки загрузки */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      
      {/* Background Image */}
      <img
        src="/images/11.png"
        alt="Полина и Семён"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          objectPosition: 'center 30%'
        }}
        onLoad={() => {
          console.log("Изображение загружено успешно");
          setImageLoaded(true);
        }}
        onError={(e) => {
          console.error("Ошибка загрузки изображения:", e);
          setImageError(true);
        }}
      />
      
      {/* Затемнение поверх изображения */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Если изображение не загрузилось, показываем сообщение */}
      {imageError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-20">
          Изображение не загружено. Проверьте путь: /images/sema.jpg
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="mb-6 tracking-[0.3em] opacity-90">МЫ ЖЕНИМСЯ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="mb-4 flex items-center justify-center gap-6">
            <span 
              className="text-6xl md:text-8xl tracking-wide"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              Полина
            </span>
          </h1>
          <h1 className="mb-4 flex items-center justify-center gap-6">
            <Heart className="w-12 h-12 md:w-16 md:h-16 fill-white" /> 
          </h1>
          <h1 className="mb-4 flex items-center justify-center gap-6">
            <span 
              className="text-6xl md:text-8xl tracking-wide"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              Семён
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="text-3xl md:text-4xl mb-4">31 · 07 · 2026</div>
          <p className="text-xl opacity-90">Приглашаем вас разделить с нами этот особенный день</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors rounded-full"
          >
            Подтвердить присутствие
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}