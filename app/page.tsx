'use client'
import { useState } from "react"
import {
  Search, ShoppingCart, Menu, X, Share2, Phone, MessageCircle, MapPin, ChevronDown
} from "lucide-react"

// ========== TYPES ==========
interface Product {
  id: string
  title: string
  price: number
  oldPrice?: number
  earnings?: number
  image: string
  category: string
  location: string
  building: string
  discount?: string
  sellerPhone: string
  whatsappNumber: string
}

interface Banner {
  id: string
  image: string
  title: string
}

// ========== MOCK DATA MATCHING BASE44 ==========
const BANNERS: Banner[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&h=400&fit=crop",
    title: "Islii Market — Khamrah Collection • YARA Collection",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
    title: "Best Seller in Eastleigh",
  },
]

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "ALagzi Women's Classic Fashion Sports Shoes -...",
    price: 999,
    earnings: 959,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&h=600&fit=crop",
    category: "Women's Shoes",
    building: "Abaya center islii",
    location: "First Avenue",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
  {
    id: "2",
    title: "4Pairs Invisible Cotton Socks - Bold Collection",
    price: 290,
    earnings: 278,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop",
    category: "Fashion",
    building: "Abaya center islii",
    location: "Garissa Lodge",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
  {
    id: "3",
    title: "Cosmo Tea Tree Oil Shampoo 1000ml - Anti...",
    price: 1015,
    oldPrice: 1450,
    earnings: 974,
    discount: "-30% OFF",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
    category: "Beauty",
    building: "Abaya center islii",
    location: "BBS Mall",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
  {
    id: "4",
    title: "Cosmo Face Mask 500ml - 5 Flavors - Whitening x1",
    price: 251,
    oldPrice: 359,
    earnings: 241,
    discount: "-30% OFF",
    image: "https://images.unsplash.com/photo-1567928254714-27200676a619?w=600&h=600&fit=crop",
    category: "Beauty",
    building: "Eastleigh Best seller",
    location: "Garissa Lodge",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
  {
    id: "5",
    title: "Pisiduo Sports Quick Dry Sleeveless T-Shirt Men -...",
    price: 890,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    category: "Men's Fashion",
    building: "Garissa Lodge",
    location: "Eastleigh",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
  {
    id: "6",
    title: "Banagat 3-Piece Official Suit",
    price: 6459,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
    category: "Men's Fashion",
    building: "BBS Mall",
    location: "Eastleigh",
    sellerPhone: "0725722020",
    whatsappNumber: "254725722020",
  },
]

export default function IsliiMarketPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(2)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const categories = ["All", "Men's Shoes & Sneakers", "Women's Shoes", "Beauty", "Fashion"]

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 pb-16 font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); *{font-family:'Inter',sans-serif}`}</style>

      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 bg-[#F68B1E] text-white shadow-md">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-[#F68B1E] font-black rounded-lg flex items-center justify-center text-lg">
              I
            </div>
            <div>
              <h1 className="font-extrabold text-base leading-tight">Islii Market</h1>
              <p className="text-[11px] opacity-90 leading-none">Eastleigh's Jumia 🇰🇪🇸🇴</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-1.5">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#F68B1E] font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="px-4 pb-3">
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-inner">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none"
            />
            <button className="bg-[#F68B1E] p-2.5 text-white hover:bg-[#e07a12] transition">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div className="bg-[#E57A0F] border-t border-orange-400/30 py-2 px-4 space-y-2 text-sm font-semibold animate-in slide-in-from-top-2">
            <a href="#sell" className="block py-1.5 hover:opacity-80">Sell</a>
            <a href="#myshop" className="block py-1.5 hover:opacity-80">My Shop</a>
            <a href="#admin" className="block py-1.5 hover:opacity-80">Admin</a>
            <a href="#terms" className="block py-1.5 hover:opacity-80">Seller Terms</a>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto p-3 space-y-4">

        {/* BANNER CAROUSEL HEADER */}
        <div className="rounded-xl overflow-hidden bg-zinc-900 text-white shadow-sm relative">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=300&fit=crop"
            alt="Islii Market Promo"
            className="w-full h-36 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
            <h2 className="text-sm font-bold leading-tight">
              Islii Market — Khamrah Collection • YARA Collection
            </h2>
            <p className="text-[10px] text-amber-300 font-medium">Best Seller in Eastleigh</p>
            <div className="mt-2 bg-[#F68B1E] text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block self-start">
              Order on WhatsApp: 0725723383
            </div>
          </div>
        </div>

        {/* OFFER HIGHLIGHT CARDS */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-3 rounded-xl shadow-sm relative overflow-hidden">
            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">30% OFF</span>
            <h3 className="font-bold text-xs mt-2 leading-tight">Welcome to Islii market</h3>
            <p className="text-[9px] text-amber-100 mt-1">Ends in 1d 0h 16m 34s • Code: Welcome30</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-orange-800 text-white p-3 rounded-xl shadow-sm relative overflow-hidden">
            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">30% OFF</span>
            <h3 className="font-bold text-xs mt-2 leading-tight">Only Eastleigh Best Seller</h3>
            <p className="text-[9px] text-amber-100 mt-1">Ends in 11d 0h 16m 34s</p>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-amber-50 border-orange-500 text-orange-600"
                  : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FILTER DROPDOWNS */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-zinc-200 text-zinc-700 text-xs font-medium py-2 px-3 rounded-lg appearance-none focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white border border-zinc-200 text-zinc-700 text-xs font-medium py-2 px-3 rounded-lg appearance-none focus:outline-none"
            >
              <option value="All Locations">All Locations</option>
              <option value="Garissa Lodge">Garissa Lodge</option>
              <option value="BBS Mall">BBS Mall</option>
              <option value="First Avenue">First Avenue</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* PRODUCTS SECTION TITLE */}
        <div className="pt-1">
          <h2 className="text-base font-extrabold text-zinc-900">All Products</h2>
        </div>

        {/* PRODUCT GRID (2-COLUMN BASE44 STYLE) */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-zinc-200/80 overflow-hidden shadow-sm flex flex-col justify-between relative"
            >
              {/* Image & Badges */}
              <div className="relative bg-zinc-50">
                {product.discount && (
                  <span className="absolute top-1.5 left-1.5 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded z-10">
                    {product.discount}
                  </span>
                )}
                <button className="absolute top-1.5 right-1.5 bg-white/90 p-1 rounded-full shadow text-zinc-600 hover:text-black z-10">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-36 object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-800 line-clamp-2 leading-snug">
                    {product.title}
                  </h3>

                  {/* Pricing */}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-extrabold text-sm text-[#F68B1E]">
                      KSH {product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        KSH {product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Earnings Badge */}
                  {product.earnings && (
                    <p className="text-[10px] font-medium text-emerald-600 mt-0.5">
                      You earn KSH {product.earnings.toLocaleString()}
                    </p>
                  )}

                  {/* Store Details */}
                  <div className="mt-1.5 text-[10px] text-zinc-500 space-y-0.5">
                    <p className="flex items-center gap-1 font-medium text-zinc-600">
                      🏢 {product.building}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-orange-500" /> {product.location}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-1 pt-1 border-t border-zinc-100">
                  <a
                    href={`https://wa.me/${product.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] py-1.5 rounded flex items-center justify-center"
                  >
                    <MessageCircle className="w-3 h-3" />
                  </a>
                  <a
                    href={`tel:${product.sellerPhone}`}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] py-1.5 rounded flex items-center justify-center gap-0.5"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    Call
                  </a>
                  <button
                    onClick={() => setCartCount((c) => c + 1)}
                    className="border border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-[10px] py-1.5 rounded flex items-center justify-center gap-0.5"
                  >
                    <ShoppingCart className="w-2.5 h-2.5" />
                    Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
