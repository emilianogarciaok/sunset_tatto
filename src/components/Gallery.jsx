import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const VISIBLE_COUNT = 8

// Cloudinary: insert transformation before /upload/ to serve optimized thumbnails
function thumb(url, size = 400) {
  return url.replace('/upload/', `/upload/w_${size},h_${size},c_fill,f_auto,q_auto/`)
}

function fullSize(url) {
  return url.replace('/upload/', '/upload/f_auto,q_auto/')
}

const artistMeta = {
  Gugu: {
    subtitle: 'Oriental · Realism · Full Color',
    avatar: 'https://ilkpzxkwhjwvollmxurg.supabase.co/storage/v1/object/public/proyectos/GUGU%20TATTO/gugu.jpg',
  },
  Florencia: {
    subtitle: 'Fine Line · Blackwork · Color',
    avatar: 'https://res.cloudinary.com/dcane5hbu/image/upload/f_auto,q_auto,w_1000/v1773935373/IMG_5956_nimjk4.heic',
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

function ArtistCarousel({ artistName, images, allStyles, index }) {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [lbDirection, setLbDirection] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  const meta = artistMeta[artistName] || { subtitle: '', avatar: '' }

  const filteredImages = activeFilter === 'All'
    ? images
    : images.filter((img) => img.estilo === activeFilter)

  const totalPages = Math.ceil(filteredImages.length / VISIBLE_COUNT)
  const safePage = Math.min(page, Math.max(totalPages - 1, 0))
  const startIndex = safePage * VISIBLE_COUNT
  const visibleImages = filteredImages.slice(startIndex, startIndex + VISIBLE_COUNT)

  // Reset page when filter changes
  useEffect(() => {
    setPage(0)
    setDirection(0)
  }, [activeFilter])

  // Preload adjacent pages (thumbnails only)
  useEffect(() => {
    const preloadPage = (p) => {
      const start = p * VISIBLE_COUNT
      filteredImages.slice(start, start + VISIBLE_COUNT).forEach((img) => {
        const link = new window.Image()
        link.src = thumb(img.imagen_url)
      })
    }
    if (safePage < totalPages - 1) preloadPage(safePage + 1)
    if (safePage > 0) preloadPage(safePage - 1)
  }, [safePage, totalPages, filteredImages])

  const goToPage = (newPage, dir) => {
    setDirection(dir)
    setPage(newPage)
  }

  const prevPage = () => goToPage(safePage > 0 ? safePage - 1 : totalPages - 1, -1)
  const nextPage = () => goToPage(safePage < totalPages - 1 ? safePage + 1 : 0, 1)

  // Lightbox
  const lbNavigate = useCallback((newIndex, dir) => {
    setLbDirection(dir)
    setLightbox(newIndex)
  }, [])

  const lbPrev = useCallback(() => {
    if (lightbox === null) return
    lbNavigate(lightbox > 0 ? lightbox - 1 : filteredImages.length - 1, -1)
  }, [lightbox, lbNavigate, filteredImages.length])

  const lbNext = useCallback(() => {
    if (lightbox === null) return
    lbNavigate(lightbox < filteredImages.length - 1 ? lightbox + 1 : 0, 1)
  }, [lightbox, lbNavigate, filteredImages.length])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') lbPrev()
      if (e.key === 'ArrowRight') lbNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, lbPrev, lbNext])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Artist header + filters row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/30">
            <img
              src={meta.avatar}
              alt={artistName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider">{artistName}</h3>
            <p className="text-[10px] tracking-[2px] uppercase text-white/30">
              {images.length} works
            </p>
          </div>
        </div>

        {/* Style filters */}
        {allStyles.length > 1 && (
          <div className="flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-3 py-1.5 text-[9px] tracking-[1.5px] uppercase font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === 'All'
                  ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-400'
                  : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
              }`}
            >
              All
            </button>
            {allStyles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveFilter(style)}
                className={`px-3 py-1.5 text-[9px] tracking-[1.5px] uppercase font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                  activeFilter === style
                    ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-400'
                    : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Carousel */}
      <div className="w-full">
        {filteredImages.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-white/30 text-sm">
            No works in this category yet
          </div>
        ) : (
          <>
            <div className="relative">
              {/* Prev */}
              {totalPages > 1 && (
                <button
                  onClick={prevPage}
                  className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}

              {/* Grid */}
              <div className="overflow-hidden rounded-lg">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`${activeFilter}-${safePage}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-1.5"
                  >
                    {visibleImages.map((img) => (
                      <div
                        key={img.imagen_url}
                        className="aspect-square overflow-hidden group cursor-pointer relative rounded-sm"
                        onClick={() => { setLbDirection(1); setLightbox(filteredImages.indexOf(img)) }}
                      >
                        <img
                          src={thumb(img.imagen_url)}
                          alt={`${artistName} - ${img.estilo}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next */}
              {totalPages > 1 && (
                <button
                  onClick={nextPage}
                  className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i, i > safePage ? 1 : -1)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === safePage
                        ? 'w-6 h-1.5 bg-yellow-400'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
                <span className="text-[10px] tracking-[2px] uppercase text-white/30 ml-3">
                  {safePage + 1} / {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filteredImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <span className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">
                {artistName}'s Gallery
                {activeFilter !== 'All' && ` · ${activeFilter}`}
              </span>
              <span className="text-[11px] tracking-[2px] uppercase text-white/60">
                {lightbox + 1} / {filteredImages.length}
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4">
              <button
                onClick={lbPrev}
                className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <AnimatePresence initial={false} custom={lbDirection} mode="wait">
                <motion.img
                  key={lightbox}
                  custom={lbDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  src={fullSize(filteredImages[lightbox].imagen_url)}
                  alt={`${artistName} - ${filteredImages[lightbox].estilo}`}
                  className="max-h-[75vh] max-w-[80vw] object-contain rounded-lg select-none"
                  draggable={false}
                />
              </AnimatePresence>

              <button
                onClick={lbNext}
                className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="shrink-0 px-4 py-4">
              <div className="flex gap-2 overflow-x-auto justify-center scrollbar-hide">
                {filteredImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => lbNavigate(i, i > lightbox ? 1 : -1)}
                    className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      i === lightbox
                        ? 'border-yellow-400 opacity-100'
                        : 'border-transparent opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={thumb(img.imagen_url, 80)}
                      alt={`${artistName} - ${img.estilo}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Gallery() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      const { data: rows, error } = await supabase
        .from('sunset_tatto')
        .select('imagen_url, artista, estilo')

      if (error) {
        console.error('Error fetching gallery:', error)
        setLoading(false)
        return
      }

      // Group by artist
      const grouped = {}
      rows.forEach((row) => {
        const artist = row.artista
        if (!grouped[artist]) grouped[artist] = []
        grouped[artist].push(row)
      })

      setData(grouped)
      setLoading(false)
    }

    fetchGallery()
  }, [])

  const artistNames = Object.keys(data)

  return (
    <section id="portfolio" className="bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-xs tracking-[4px] uppercase font-medium">
            Explore Our
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Art Showcase
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto mt-4 leading-relaxed">
            Every piece reflects dedication, precision, and a unique connection between the artist and the human canvas.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        )}

        {/* Artist carousels */}
        {!loading && (
          <div className="flex flex-col gap-20">
            {artistNames.map((artistName, i) => {
              const images = data[artistName]
              const styles = [...new Set(images.map((img) => img.estilo))].sort()
              return (
                <ArtistCarousel
                  key={artistName}
                  artistName={artistName}
                  images={images}
                  allStyles={styles}
                  index={i}
                />
              )
            })}
          </div>
        )}

        {!loading && artistNames.length === 0 && (
          <p className="text-center text-white/30 py-20">No works uploaded yet</p>
        )}
      </div>
    </section>
  )
}
