import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const artists = [
  {
    name: 'Gugu',
    specialty: 'Oriental| Realism| Full Color',
    image: 'https://res.cloudinary.com/dcane5hbu/image/upload/f_auto,q_auto,w_1000/v1773939167/gugu_mvbsxg.jpg',
    phone: '+351913382577',
    instagram: '@reinoso.aguss',
    instagramUrl: 'https://instagram.com/reinoso.aguss',
  },
  {
    name: 'Florencia',
    specialty: 'Fine line| Blackwork| Botanico',
    image: 'https://res.cloudinary.com/dcane5hbu/image/upload/f_auto,q_auto,w_1000/v1773935373/IMG_5956_nimjk4.heic',
    phone: '+351929082338',
    instagram: '@florencia_tattoo',
    instagramUrl: 'https://instagram.com/florencia_tattoo',
  },
]

export default function Artists() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="artists" className="bg-[#0a0a0a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[11px] tracking-[3px] uppercase text-white/40 mb-3">
              The Team
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase italic tracking-wide">
              Our Artists
            </h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            href="#artistas"
            className="hidden md:block text-[11px] tracking-[3px] uppercase text-white/50 hover:text-white transition-colors"
          >
            View All →
          </motion.a>
        </motion.div>

        {/* Artists grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="group relative overflow-hidden cursor-pointer"
              onClick={() => setSelected(i)}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Style tags - top right */}
              <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-1.5">
                {artist.specialty.split('|').map((style) => (
                  <span
                    key={style.trim()}
                    className="px-2.5 py-1 text-[9px] tracking-[1.5px] uppercase font-medium bg-black/50 backdrop-blur-sm border border-white/15 rounded-full text-white/70"
                  >
                    {style.trim()}
                  </span>
                ))}
              </div>
              {/* Info - bottom */}
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                  {artist.name}
                </h3>
                <span className="text-[10px] tracking-[3px] uppercase text-white/70 group-hover:text-white transition-colors">
                  View Profile →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artist Profile Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Artist image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={artists[selected].image}
                  alt={artists[selected].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent" />
              </div>

              {/* Artist info */}
              <div className="p-6 -mt-16 relative">
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-3">
                  {artists[selected].name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {artists[selected].specialty.split('|').map((style) => (
                    <span
                      key={style.trim()}
                      className="px-3 py-1 text-[10px] tracking-[1.5px] uppercase font-medium bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400/80"
                    >
                      {style.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  {/* Phone */}
                  <a
                    href={`https://wa.me/${artists[selected].phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[2px] uppercase text-white/40 mb-0.5">Phone</p>
                      <p className="text-sm text-white/80">{artists[selected].phone}</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={artists[selected].instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[2px] uppercase text-white/40 mb-0.5">Instagram</p>
                      <p className="text-sm text-white/80">{artists[selected].instagram}</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
