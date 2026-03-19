import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const headlineVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Cta() {
  return (
    <section id="booking" className="relative bg-[#0a0a0a] text-white py-32 px-6 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-linear-to-b from-yellow-400/1 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.02)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="relative max-w-3xl mx-auto text-center"
      >
        {/* Decorative line */}
        <motion.div
          variants={itemVariants}
          className="w-12 h-px bg-yellow-400/60 mx-auto mb-8"
        />

        <motion.p
          variants={itemVariants}
          className="text-yellow-400 text-xs tracking-[4px] uppercase font-medium mb-6"
        >
          Ready for your next tattoo?
        </motion.p>

        <motion.h2
          variants={headlineVariants}
          className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-2"
        >
          Book Your
        </motion.h2>
        <motion.h2
          variants={headlineVariants}
          className="text-4xl md:text-6xl font-bold uppercase italic tracking-wide mb-8 text-yellow-400"
        >
          Appointment
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm text-white/50 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Every tattoo is a unique process. Consult with our world-class artists and create something that defines you forever. Experience the pinnacle of luxury artistry.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="bg-yellow-400 text-black px-8 py-3.5 text-[11px] font-bold tracking-[3px] uppercase rounded-md hover:bg-yellow-300 transition-colors"
          >
            Book Now
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="border border-white/30 px-8 py-3.5 text-[11px] font-bold tracking-[3px] uppercase rounded-md hover:bg-white hover:text-black transition-colors"
          >
            View Portfolio
          </motion.a>
        </motion.div>

        {/* Decorative line bottom */}
        <motion.div
          variants={itemVariants}
          className="w-12 h-px bg-yellow-400/30 mx-auto mt-12"
        />
      </motion.div>
    </section>
  )
}
