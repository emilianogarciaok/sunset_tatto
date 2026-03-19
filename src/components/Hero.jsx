import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1651216829774-2fe92d410292?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
    subtitle: 'Fine line| Blackwork| Color',
    title: 'SUNSET TATTOO',
  },
  {
    image: 'https://images.unsplash.com/photo-1759247943688-5d47a84dd615?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
              exit: {},
            }}
            className="flex flex-col items-center"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
              }}
              className="text-sm tracking-[3px] uppercase mb-4 font-light"
            >
              {slide.subtitle}
            </motion.p>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
                exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-none mb-6 tracking-wide"
            >
              {slide.title}
            </motion.h1>
            <motion.a
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                exit: { opacity: 0, transition: { duration: 0.2 } },
              }}
              href="#artistas"
              className="border border-white px-8 py-6 text-[11px] font-medium tracking-[3px] uppercase hover:bg-white hover:text-black transition-colors"
            >
              View Artists
            </motion.a>
          </motion.div>
        </AnimatePresence>
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
