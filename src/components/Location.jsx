import { motion } from 'framer-motion'

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const mapVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const infoVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Location() {
  return (
    <section id="location" className="bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-14"
        >
          <span className="text-yellow-400 text-xs tracking-[4px] uppercase font-medium">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Our Studio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-2 flex flex-col justify-center gap-8"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-[2px] uppercase mb-1">Address</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  R. Dr. António de Sousa Macedo 39<br />
                  4050-061 Porto, Portugal
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-[2px] uppercase mb-1">Hours</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Mon – Sat: 10:00 – 19:00<br />
                  Sun: By appointment only
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.a
                href="https://maps.app.goo.gl/xqbxSFZzNHtBsF2R8?g_st=ii"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 text-[11px] font-bold tracking-[3px] uppercase rounded-md hover:bg-yellow-300 transition-colors"
              >
                Get Directions
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={mapVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-3 rounded-lg overflow-hidden border border-white/8 h-[350px] md:h-[400px]"
          >
            <iframe
              title="Sunset Tattoo Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.5!2d-8.6291!3d41.1496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246512a0a00a37%3A0xcd538af888f09dbc!2sSUNSETTATTOO.PT!5e0!3m2!1sen!2spt!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
