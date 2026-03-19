import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: 'https://res.cloudinary.com/dcane5hbu/image/upload/f_auto,q_auto:good,w_2000/v1773945783/hero_rfx6qm.jpg',
    subtitle: 'Oriental| Realism| Full Color',
    title: 'SUNSET TATTOO',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))

  const slide = slides[current]

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background image with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="flex flex-col items-center max-w-2xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-xs tracking-[4px] uppercase mb-3 font-light text-white/90"
          >
            Welcome to
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none mb-2 tracking-wide"
          >
            Sunset Tattoo
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-sm md:text-base tracking-[3px] uppercase mb-6 font-light text-white/80"
          >
            Estúdio PT.
          </motion.p>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8 } },
            }}
            className="w-16 h-px bg-white/30 mb-6"
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 font-light"
          >
            We are a space dedicated to creating fine, custom tattoos in Portugal. We believe that precision and delicacy are the keys to a timeless piece. At our studio, every line tells a story, and every design is a unique collaboration between artist and client.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 font-light"
          >
            We invite you to immerse yourself in an environment designed for calm. Come enjoy our views and a moment dedicated exclusively to you, in a space where comfort and art meet.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-white/75 text-xs md:text-sm leading-relaxed italic mb-5 font-light"
          >
            Let Flor or Agus transform your vision into reality while you enjoy the Sunset experience.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6 } },
            }}
            className="text-white/85 text-xs tracking-[2px] mb-8 font-light"
          >
            Your next tattoo starts here. ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Left arrow */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        whileHover={{ scale: 1.2 }}
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Right arrow */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        whileHover={{ scale: 1.2 }}
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative w-2.5 h-2.5 rounded-full cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className={`block w-full h-full rounded-full transition-all duration-500 ${
              i === current ? 'bg-white scale-100' : 'bg-white/30 scale-75'
            }`} />
          </button>
        ))}
      </div>
    </section>
  )
}
