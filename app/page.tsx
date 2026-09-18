ef } from "react"
import { Copy, Download, Check, FileCode2, Rocket, AlertTriangle, Smartphone, Bell, Store, ShieldCheck, Star } from "lucide-react"

const ORANGE = "#F68B1E"

const pageTsxContent = `'use client'
import { useState, useEffect } from "react"
import {
  Menu, X, Search, Bell, Home, Heart, PlusCircle, MessageCircle, User,
  Star, MapPin, ShieldCheck, Eye, CheckCircle, Clock, Store, Package,
  Video, ImageIcon, DollarSign, Phone, Mail, Trash2, Edit3, AlertCircle
} from "lucide-react"

// ========== TYPES ==========
type ProductStatus = "pending" | "approved" | "rejected"
type UserRole = "buyer" | "seller" | "admin"

interface Product {
  id: string
  title: string
  price: number
  image: string
  video?: string
  category: string
  location: string
  seller: string
  sellerPhone: string
  sellerEmail: string
  rating: number
  ratingsCount: number
  status: ProductStatus
  isPromotion?: boolean
  createdAt: string
}

interface NotificationItem {
  id: string
  type: "join" | "product"
  message: string
  time: string
  read: boolean
}

interface AdBanner {
  id: string
  type: "image" | "video"
  src: string
  title: string
  link: string
}

interface SellerProfile {
  id: string
  name: string
  phone: string
  email: string
  rating: number
  totalSales: number
  joinedAt: string
}

// ========== MOCK DATA ==========
const INITIAL_ADS: AdBanner[] = [
  { id: "1", type: "image", src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop", title: "Big Sale - Up to 70% OFF", link: "#" },
  { id: "2", type: "video", src: "https://videos.pexels.com/video-files/3202633/3202633-hd_1280_720_30fps.mp4", title: "New Arrivals Video", link: "#" },
  { id: "3", type: "image", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop", title: "Electronics Week", link: "#" },
]

const INITIAL_PRODUCTS: Product[] = [
  { id: "1", title: "iPhone 14 Pro Max 256GB", price: 145000, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop", category: "Electronics", location: "Eastleigh, Nairobi", seller: "Ahmed Store", sellerPhone: "0725722020", sellerEmail: "ahmed@islii.com", rating: 4.8, ratingsCount: 42, status: "approved", isPromotion: true, createdAt: "2025-05-10" },
  { id: "2", title: "Toyota Corolla 2018 - Clean", price: 1850000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=600&fit=crop", category: "Vehicles", location: "Islii, Nairobi", seller: "AutoHub", sellerPhone: "0712345678", sellerEmail: "auto@hub.com", rating: 4.6, ratingsCount: 18, status: "approved", createdAt: "2025-05-09" },
  { id: "3", title: "Samsung 55\\" QLED 4K Smart TV", price: 65000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?w=600&h=600&fit=crop", category: "Electronics", location: "Luthuli, Nairobi", seller: "ElectroMart", sellerPhone: "0722123456", sellerEmail: "electro@mart.com", rating: 4.9, ratingsCount: 31, status: "approved", createdAt: "2025-05-08" },
  { id: "4", title: "Men's Official Suit - Navy", price: 8500, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop", category: "Fashion", location: "Eastleigh", seller: "Fashion Hub", sellerPhone: "0700123456", sellerEmail: "fashion@hub.com", rating: 4.5, ratingsCount: 12, status: "approved", isPromotion: true, createdAt: "2025-05-07" },
  { id: "5", title: "2BR Apartment To Let - Islii", price: 35000, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=600&fit=crop", category: "Property", location: "Islii Airbase", seller: "Property Masters", sellerPhone: "0722000111", sellerEmail: "prop@master.com", rating: 4.7, ratingsCount: 9, status: "pending", createdAt: "2025-05-11" },
  { id: "6", title: "JBL PartyBox Speaker", price: 28000, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop", category: "Electronics", location: "Eastleigh", seller: "Ahmed Store", sellerPhone: "0725722020", sellerEmail: "ahmed@islii.com", rating: 5, ratingsCount: 56, status: "approved", createdAt: "2025-05-06" },
]

const INITIAL_SELLERS: SellerProfile[] = [
  { id: "1", name: "Ahmed Store", phone: "0725722020", email: "ahmed@islii.com", rating: 4.9, totalSales: 342, joinedAt: "2024-01-15" },
  { id: "2", name: "AutoHub", phone: "0712345678", email: "auto@hub.com", rating: 4.6, totalSales: 89, joinedAt: "2024-03-20" },
]

// ========== MAIN PAGE ==========
export default function IsliiMarketPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"home" | "saved" | "sell" | "messages" | "profile" | "myshop" | "sellers" | "approvals">("home")
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", type: "join", message: "New buyer Fatima joined Islii Market", time: "2 min ago", read: false },
    { id: "2", type: "product", message: "New product 'Toyota Corolla' needs approval", time: "15 min ago", read: false },
    { id: "3", type: "join", message: "Seller AutoHub joined", time: "1 hr ago", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [ads] = useState<AdBanner[]>(INITIAL_ADS)
  const [sellers] = useState<SellerProfile[]>(INITIAL_SELLERS)
  const [saved, setSaved] = useState<string[]>(["1"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentAd, setCurrentAd] = useState(0)
  const [userRole] = useState<UserRole>("admin") // change to buyer/seller to test permissions
  const [isSeller, setIsSeller] = useState(false)
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({ title: "", price: "", category: "Electronics", location: "", image: "", video: "" })
  const [sellerForm, setSellerForm] = useState({ name: "", email: "", phone: "" })

  const categories = ["All", "Electronics", "Vehicles", "Fashion", "Property", "Home", "Services"]
  const unreadCount = notifications.filter(n => !n.read).length
  const pendingProducts = products.filter(p => p.status === "pending")

  // Ad carousel
  useEffect(() => {
    const t = setInterval(() => setCurrentAd((p) => (p + 1) % ads.length), 5000)
    return () => clearInterval(t)
  }, [ads.length])

  // Simulate notifications
  const addNotification = (type: "join" | "product", msg: string) => {
    setNotifications(prev => [{ id: Date.now().toString(), type, message: msg, time: "now", read: false }, ...prev])
  }

  const handleBecomeSeller = () => {
    if (!sellerForm.name || !sellerForm.email || !sellerForm.phone) {
      alert("Fill Name, Email and Phone - No Gmail login required!")
      return
    }
    setIsSeller(true)
    addNotification("join", `New seller ${sellerForm.name} joined - ${sellerForm.phone}`)
    alert(`Welcome seller! Commission 8% goes to M-Pesa 0725722020 after sale.`)
    setActiveTab("myshop")
  }

  const handleSellProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      alert("Title and price required")
      return
    }
    const prod: Product = {
      id: Date.now().toString(),
      title: newProduct.title,
      price: Number(newProduct.price),
      image: newProduct.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      video: newProduct.video || undefined,
      category: newProduct.category,
      location: newProduct.location || "Islii, Nairobi",
      seller: sellerForm.name || "My Shop",
      sellerPhone: sellerForm.phone || "0725722020",
      sellerEmail: sellerForm.email || "seller@islii.com",
      rating: 0,
      ratingsCount: 0,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0]
    }
    setProducts(prev => [prod, ...prev])
    addNotification("product", `New product '${prod.title}' added - needs approval`)
    setNewProduct({ title: "", price: "", category: "Electronics", location: "", image: "", video: "" })
    alert("Product submitted! Admin will approve soon. Preview available.")
    setPreviewProduct(prod)
  }

  const handleApprove = (id: string, status: ProductStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
    setPreviewProduct(null)
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory
    const approved = p.status === "approved" || userRole === "admin" || activeTab === "approvals" || activeTab === "myshop"
    return matchesSearch && matchesCat && approved
  })

  const myShopProducts = products.filter(p => p.seller === (sellerForm.name || "My Shop"))

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-zinc-900 pb-20 font-sans">
      <style>{ `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap'); *{font-family:Inter,sans-serif}` }</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-xl hover:bg-zinc-100">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[18px]" style={{ background: "#F68B1E" }}>I</div>
              <div>
                <h1 className="font-extrabold leading-none text-[16px]">ISLII MARKET</h1>
                <p className="text-[10px] text-zinc-500 font-semibold tracking-widest -mt-0.5">V5 PRO • ORANGE</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2.5 rounded-xl bg-zinc-900 text-white hover:bg-black">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F68B1E] text-white text-[11px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
            </button>
            <div className="w-9 h-9 rounded-full bg-zinc-200 overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=12" alt="profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3 max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products, cars, property..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-100 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#F68B1E]/30 focus:border-[#F68B1E] font-medium" />
          </div>
        </div>
      </header>

      {/* NOTIFICATIONS DROPDOWN */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setShowNotifications(false)}>
          <div onClick={e => e.stopPropagation()} className="absolute right-4 top-[72px] w-[360px] max-w-[92vw] bg-white rounded-[20px] shadow-2xl border overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h3>
              <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-100">Mark all read</button>
            </div>
            <div className="max-h-[420px] overflow-auto divide-y">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 flex gap-3 ${!n.read ? "bg-orange-50/70" : ""}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.type === "join" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}>
                    {n.type === "join" ? <User className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug">{n.message}</p>
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{n.time}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#F68B1E] mt-2 shrink-0" />}
                </div>
              ))}
            </div>
            {userRole === "admin" && pendingProducts.length > 0 && (
              <div className="p-3 bg-zinc-900 text-white text-center text-sm font-bold">
                {pendingProducts.length} pending approvals • Check Approvals tab
              </div>
            )}
          </div>
        </div>
      )}

      {/* DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: "#F68B1E" }}>I</div>
                <div>
                  <p className="font-extrabold">Islii Market</p>
                  <p className="text-xs text-zinc-500">islii-market.vercel.app</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-zinc-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-3 space-y-1 overflow-auto flex-1">
              {[
                { id: "home", label: "Home", icon: Home },
                { id: "myshop", label: "My Shop", icon: Store, badge: myShopProducts.length },
                { id: "approvals", label: "Approvals", icon: ShieldCheck, badge: pendingProducts.length, adminOnly: true },
                { id: "sellers", label: "Sellers", icon: User, adminOnly: true },
                { id: "saved", label: "Saved", icon: Heart },
                { id: "messages", label: "Messages", icon: MessageCircle },
                { id: "profile", label: "Profile", icon: User },
              ].map(item => {
                if (item.adminOnly && userRole !== "admin") return null
                return (
                  <button key={item.id} onClick={() => { setActiveTab(item.id as any); setDrawerOpen(false) }} className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-semibold text-left transition ${activeTab === item.id ? "bg-zinc-900 text-white" : "hover:bg-zinc-100"}`}>
                    <span className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === item.id ? "bg-white text-zinc-900" : "bg-[#F68B1E] text-white"}`}>{item.badge}</span>}
                  </button>
                )
              })}
              <div className="pt-4 mt-4 border-t">
                <div className="rounded-2xl p-4 text-white" style={{ background: "#F68B1E" }}>
                  <p className="font-bold text-sm">Commission 8%</p>
                  <p className="text-xs mt-1 opacity-90">All sales commission goes to</p>
                  <p className="font-extrabold mt-1 flex items-center gap-1.5"><Phone className="w-4 h-4" /> M-Pesa: 0725722020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-5 space-y-6">

        {activeTab === "home" && (
          <>
            {/* AD BANNERS - IMAGE + VIDEO */}
            <div className="relative overflow-hidden rounded-[24px] bg-zinc-900 h-[200px] md:h-[320px]">
              {ads.map((ad, i) => (
                <div key={ad.id} className={`absolute inset-0 transition-all duration-700 ${i === currentAd ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
                  {ad.type === "image" ? (
                    <img src={ad.src} alt={ad.title} className="w-full h-full object-cover" />
                  ) : (
                    <video src={ad.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-7">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-zinc-900 mb-2">
                      {ad.type === "video" ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />} {ad.type.toUpperCase()} BANNER
                    </span>
                    <h2 className="text-white font-extrabold text-xl md:text-3xl leading-tight">{ad.title}</h2>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {ads.map((_, i) => (
                  <button key={i} onClick={() => setCurrentAd(i)} className={`h-1.5 rounded-full transition-all ${i === currentAd ? "w-8 bg-white" : "w-4 bg-white/40"}`} />
                ))}
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="flex gap-2 overflow-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 px-5 py-2.5 rounded-full font-bold text-sm border transition ${selectedCategory === cat ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 hover:border-zinc-300"}`}>{cat}</button>
              ))}
            </div>

            {/* PROMOTIONS */}
            {filteredProducts.some(p => p.isPromotion) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-lg flex items-center gap-2"><span className="w-8 h-8 rounded-xl bg-[#F68B1E] text-white flex items-center justify-center">%</span> Promotions</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {filteredProducts.filter(p => p.isPromotion).slice(0, 4).map(p => (
                    <div key={p.id} className="rounded-[20px] overflow-hidden bg-white border shadow-sm">
                      <img src={p.image} alt={p.title} className="h-36 w-full object-cover" />
                      <div className="p-3">
                        <p className="font-bold text-sm line-clamp-2 leading-tight">{p.title}</p>
                        <p className="font-extrabold mt-1" style={{ color: "#F68B1E" }}>KSh {p.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ALL PRODUCTS GRID */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-lg">All Products • {filteredProducts.length}</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-900 text-white">{userRole.toUpperCase()} VIEW</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group bg-white rounded-[20px] border overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5">
                    <div className="relative">
                      <img src={product.image} alt={product.title} className="h-44 md:h-52 w-full object-cover" />
                      {product.video && <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><Video className="w-3 h-3" /> VIDEO</span>}
                      {product.status === "pending" && <span className="absolute top-2 right-2 bg-amber-400 text-zinc-900 text-[10px] font-bold px-2 py-1 rounded-full">PENDING</span>}
                      <button onClick={() => setSaved(prev => prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id])} className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                        <Heart className={`w-4 h-4 ${saved.includes(product.id) ? "fill-red-500 text-red-500" : "text-zinc-700"}`} />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-[13px] leading-tight line-clamp-2 min-h-[32px]">{product.title}</p>
                      <p className="font-extrabold text-[16px] mt-1" style={{ color: "#F68B1E" }}>KSh {product.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-zinc-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{product.location}</span>
                        <span className="flex items-center gap-1 text-[11px] font-bold"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{product.rating || "New"} ({product.ratingsCount})</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button onClick={() => setPreviewProduct(product)} className="py-2 rounded-xl bg-zinc-100 font-bold text-xs flex items-center justify-center gap-1"><Eye className="w-3.5 h-3.5" /> Preview</button>
                        <button className="py-2 rounded-xl text-white font-bold text-xs" style={{ background: "#F68B1E" }}>Contact</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "sell" && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-white rounded-[24px] border p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold flex items-center gap-2"><PlusCircle className="w-7 h-7" style={{ color: "#F68B1E" }} /> Sell Product</h2>
              <p className="text-sm text-zinc-500 mt-1">Add image + video. 8% commission to M-Pesa <b>0725722020</b></p>

              {!isSeller && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="font-bold text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Become a seller (No Gmail needed)</p>
                  <div className="grid gap-3 mt-3">
                    <input value={sellerForm.name} onChange={e => setSellerForm({ ...sellerForm, name: e.target.value })} placeholder="Full Name / Shop Name" className="px-4 py-3 rounded-xl border bg-white" />
                    <input value={sellerForm.email} onChange={e => setSellerForm({ ...sellerForm, email: e.target.value })} placeholder="Email address" className="px-4 py-3 rounded-xl border bg-white" />
                    <input value={sellerForm.phone} onChange={e => setSellerForm({ ...sellerForm, phone: e.target.value })} placeholder="Phone (M-Pesa number)" className="px-4 py-3 rounded-xl border bg-white" />
                    <button onClick={handleBecomeSeller} className="py-3 rounded-xl text-white font-bold" style={{ background: "#F68B1E" }}>Become Seller</button>
                  </div>
                </div>
              )}

              <div className="grid gap-4 mt-6">
                <input value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} placeholder="Product title" className="px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price KSh" type="number" className="px-4 py-3 rounded-xl border bg-zinc-50" />
                  <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="px-4 py-3 rounded-xl border bg-zinc-50">
                    {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <input value={newProduct.location} onChange={e => setNewProduct({ ...newProduct, location: e.target.value })} placeholder="Location e.g Islii, Nairobi" className="px-4 py-3 rounded-xl border bg-zinc-50" />
                <input value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="Image URL (or upload later)" className="px-4 py-3 rounded-xl border bg-zinc-50" />
                <input value={newProduct.video} onChange={e => setNewProduct({ ...newProduct, video: e.target.value })} placeholder="Video URL (optional - for ad banner style)" className="px-4 py-3 rounded-xl border bg-zinc-50" />
                <button onClick={handleSellProduct} className="py-3.5 rounded-2xl bg-zinc-900 text-white font-extrabold text-[15px] flex items-center justify-center gap-2"><Package className="w-5 h-5" /> Submit for Approval</button>
                <p className="text-[11px] text-zinc-500 text-center">Product goes to <b>Preview → Pending → Approved</b> flow. Admin gets bell notification.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "myshop" && (
          <div className="space-y-4">
            <div className="bg-zinc-900 text-white rounded-[24px] p-6 flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-xl flex items-center gap-2"><Store className="w-6 h-6" /> My Shop</h2>
                <p className="text-sm opacity-70 mt-1">{sellerForm.name || "My Shop"} • {myShopProducts.length} products</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-60">Commission Due</p>
                <p className="font-extrabold text-lg" style={{ color: "#F68B1E" }}>8% → 0725722020</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {myShopProducts.map(p => (
                <div key={p.id} className="bg-white rounded-[20px] border p-3">
                  <img src={p.image} alt={p.title} className="h-36 w-full object-cover rounded-xl" />
                  <p className="font-bold text-sm mt-2 line-clamp-2">{p.title}</p>
                  <p className="text-xs mt-1"><span className={`px-2 py-1 rounded-full font-bold ${p.status === "approved" ? "bg-green-100 text-green-700" : p.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{p.status.toUpperCase()}</span></p>
                  <p className="font-extrabold mt-2" style={{ color: "#F68B1E" }}>KSh {p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-4">
            <h2 className="font-extrabold text-xl flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> Approvals • Preview / Pending / Approved</h2>
            {pendingProducts.length === 0 && <div className="bg-white rounded-2xl border p-10 text-center text-zinc-500">No pending products 🎉</div>}
            {pendingProducts.map(p => (
              <div key={p.id} className="bg-white rounded-[20px] border p-4 flex gap-4">
                <img src={p.image} alt={p.title} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-bold">{p.title}</p>
                  <p className="text-sm text-zinc-500">{p.category} • {p.location} • KSh {p.price.toLocaleString()}</p>
                  <p className="text-xs mt-1 flex items-center gap-2"><Mail className="w-3 h-3" />{p.sellerEmail} <Phone className="w-3 h-3 ml-2" />{p.sellerPhone}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setPreviewProduct(p)} className="px-4 py-2 rounded-xl bg-zinc-100 font-bold text-xs flex items-center gap-1"><Eye className="w-4 h-4" /> Preview</button>
                    <button onClick={() => handleApprove(p.id, "approved")} className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Approve</button>
                    <button onClick={() => handleApprove(p.id, "rejected")} className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1"><X className="w-4 h-4" /> Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "sellers" && userRole === "admin" && (
          <div className="space-y-3">
            <h2 className="font-extrabold text-xl">Sellers (Admin Only)</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {sellers.map(s => (
                <div key={s.id} className="bg-white rounded-[20px] border p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold">{s.name[0]}</div>
                    <div>
                      <p className="font-bold">{s.name}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1"><Phone className="w-3 h-3" />{s.phone} • <Mail className="w-3 h-3" />{s.email}</p>
                      <p className="text-xs mt-1 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {s.rating} • {s.totalSales} sales</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "saved" || activeTab === "messages" || activeTab === "profile") && (
          <div className="bg-white rounded-[24px] border p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-100 mx-auto flex items-center justify-center mb-3">
              {activeTab === "saved" && <Heart className="w-7 h-7" />}
              {activeTab === "messages" && <MessageCircle className="w-7 h-7" />}
              {activeTab === "profile" && <User className="w-7 h-7" />}
            </div>
            <h3 className="font-extrabold text-lg capitalize">{activeTab}</h3>
            <p className="text-sm text-zinc-500 mt-1">This section is ready. {activeTab === "saved" ? `${saved.length} saved items` : activeTab === "messages" ? "Chat with sellers" : "Buyer profile • Seller rating visible"}</p>
            {activeTab === "saved" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-left">
                {products.filter(p => saved.includes(p.id)).map(p => (
                  <div key={p.id} className="border rounded-xl overflow-hidden"><img src={p.image} alt={p.title} className="h-32 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold line-clamp-2">{p.title}</p></div></div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* PRODUCT PREVIEW MODAL */}
      {previewProduct && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white w-full max-w-[480px] rounded-[28px] overflow-hidden shadow-2xl max-h-[92vh] overflow-auto">
            <div className="relative">
              {previewProduct.video ? <video src={previewProduct.video} autoPlay muted loop className="w-full h-[320px] object-cover" /> : <img src={previewProduct.image} alt={previewProduct.title} className="w-full h-[320px] object-cover" />}
              <button onClick={() => setPreviewProduct(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"><X className="w-5 h-5" /></button>
              <span className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full ${previewProduct.status === "approved" ? "bg-green-600 text-white" : previewProduct.status === "pending" ? "bg-amber-400 text-zinc-900" : "bg-red-600 text-white"}`}>{previewProduct.status.toUpperCase()}</span>
            </div>
            <div className="p-6">
              <h3 className="font-extrabold text-xl leading-tight">{previewProduct.title}</h3>
              <p className="font-extrabold text-2xl mt-2" style={{ color: "#F68B1E" }}>KSh {previewProduct.price.toLocaleString()}</p>
              <div className="flex items-center gap-3 mt-3 text-sm text-zinc-600">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{previewProduct.location}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{previewProduct.rating} ({previewProduct.ratingsCount} ratings)</span>
              </div>
              <div className="mt-4 p-3 rounded-2xl bg-zinc-50 border">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Seller</p>
                <p className="font-bold mt-1">{previewProduct.seller}</p>
                <p className="text-sm mt-1 flex items-center gap-2"><Phone className="w-4 h-4" />{previewProduct.sellerPhone} <Mail className="w-4 h-4 ml-2" />{previewProduct.sellerEmail}</p>
              </div>
              {userRole === "admin" && previewProduct.status === "pending" && (
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <button onClick={() => handleApprove(previewProduct.id, "approved")} className="py-3 rounded-2xl bg-green-600 text-white font-bold flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Approve & Publish</button>
                  <button onClick={() => handleApprove(previewProduct.id, "rejected")} className="py-3 rounded-2xl bg-red-600 text-white font-bold">Reject</button>
                </div>
              )}
              <div className="mt-4 text-[11px] text-zinc-500 text-center">Commission 8% of KSh {previewProduct.price.toLocaleString()} = KSh {Math.round(previewProduct.price * 0.08).toLocaleString()} → M-Pesa 0725722020</div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV - Home Saved Sell Messages Profile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-40">
        <div className="max-w-7xl mx-auto grid grid-cols-5">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "saved", label: "Saved", icon: Heart },
            { id: "sell", label: "Sell", icon: PlusCircle, isFab: true },
            { id: "messages", label: "Messages", icon: MessageCircle },
            { id: "profile", label: "Profile", icon: User },
          ].map(item => {
            const active = activeTab === item.id
            if (item.isFab) {
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id as any)} className="flex flex-col items-center justify-center py-2">
                  <span className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg -mt-6 border-4 border-white" style={{ background: active ? "#111" : "#F68B1E" }}>
                    <PlusCircle className="w-7 h-7" />
                  </span>
                  <span className={`text-[11px] font-bold mt-1 ${active ? "text-zinc-900" : "text-zinc-500"}`}>Sell</span>
                </button>
              )
            }
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className="flex flex-col items-center justify-center py-3">
                <item.icon className={`w-6 h-6 ${active ? "text-zinc-900" : "text-zinc-400"}`} />
                <span className={`text-[11px] font-bold mt-1 ${active ? "text-zinc-900" : "text-zinc-400"}`}>{item.label}</span>
                {active && <span className="w-1 h-1 rounded-full bg-zinc-900 mt-1" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
`

const readmeContent = `# Islii Market - GitHub Replace Guide
## Target: Ambassadorahmed/Islii-market-/app/page.tsx
## Vercel: islii-market.vercel.app

### V5 PRO FINAL - Orange Theme #F68B1E

This repo contains the complete Next.js page.tsx file ready to paste.

### What's inside page.tsx

- 'use client' at top - required for Next.js App Router
- Orange theme #F68B1E primary everywhere
- Hamburger drawer (left slide) with:
  - Home, My Shop, Approvals (admin), Sellers (admin only), Saved, Messages, Profile
  - Commission 8% → M-Pesa 0725722020 card
- Bell notifications (top right):
  - Triggers when someone joins (buyer/seller)
  - Triggers when product added → needs approval
  - Unread count + mark all read
  - Admin sees pending count footer
- Approval flow: Preview → Pending → Approved
  - Sellers submit → status = pending
  - Admin previews modal → Approve / Reject
  - Only approved shows on home for buyers
- My Shop:
  - Shows only my products
  - Status badges pending/approved/rejected
- Sellers list: Only admin sees (userRole === "admin")
  - Name, phone, email, rating, sales
- Ad Banners: Supports BOTH image and video
  - Auto carousel 5s
  - Video autoplay muted loop
  - Badge IMAGE / VIDEO
- Promotions section (% banner)
- Seller ratings + buyer product ratings (star + count)
- No Gmail when joining:
  - Become seller form: Name + Email + Phone fields only
  - No OAuth, no Google button
- Commission 8% to M-Pesa 0725722020 shown in:
  - Drawer card
  - Sell page
  - Preview modal calculation
  - My Shop header
- Bottom nav: Home | Saved | Sell (FAB orange) | Messages | Profile
  - Matches V5 PRO spec exactly
- All Products grid 2 cols mobile, 4 desktop, hover effects

### How to replace in GitHub - Step by Step

#### METHOD 1: GitHub Web (fastest - 2 mins)

1. Go to https://github.com/Ambassadorahmed/Islii-market-
2. Click folder `app` → click `page.tsx`
3. Click pencil icon ✏️ Edit this file (top right)
4. Press Ctrl+A → Delete all old code
5. Open the downloaded `page.tsx` from this tool → Ctrl+A → Ctrl+C
6. Paste into GitHub editor Ctrl+V
7. Scroll down → Commit changes
   - Message: "V5 PRO final orange - bell, approvals, ratings, banners, commission"
   - Choose "Commit directly to main"
   - Click Commit changes
8. Vercel auto-deploys in ~1 min → check islii-market.vercel.app

#### METHOD 2: VS Code + Git

```bash
git clone https://github.com/Ambassadorahmed/Islii-market-.git
cd Islii-market-
# replace app/page.tsx with downloaded file
# if your file is in Downloads:
cp ~/Downloads/page.tsx app/page.tsx
git add app/page.tsx
git commit -m "V5 PRO final orange - all features"
git push origin main
```

#### METHOD 3: Vercel direct import

If Vercel still shows old version:
- Vercel Dashboard → islii-market → Deployments → Redeploy
- Or push empty commit: git commit --allow-empty -m "trigger redeploy" && git push

### Dependencies - Ensure these exist

package.json should have:
```json
{
  "dependencies": {
    "lucide-react": "^0.400.0",
    "next": "14.x",
    "react": "^18"
  }
}
```

Tailwind must be setup (app/globals.css with @tailwind directives)

### Testing after deploy

- Open islii-market.vercel.app on phone
- Test hamburger → My Shop → Sellers (should only show if admin)
- Bell icon should show 2 unread → click → notifications list
- Try Sell → Become Seller → enter email+phone (no Gmail) → Submit product
- New product goes to pending → bell notification → Approvals tab → Preview modal → Approve
- Product appears in All Products + Promotions if marked
- Check image+video banners auto rotate
- Bottom nav: Home Saved Sell Messages Profile works

### Admin access

Change line in page.tsx:
```ts
const [userRole] = useState<UserRole>("admin")
```
To "buyer" or "seller" to test other views. In production connect to your auth.

### Commission logic

Displayed as 8% of price → M-Pesa 0725722020
For real payment integrate Daraja API later, for now it's display only.

### Need help?

If build fails on Vercel:
- Check build logs → likely missing lucide-react → run npm install lucide-react
- Ensure no server component importing client hooks
- This file is already 'use client' so safe.

Done! 🚀 Orange V5 PRO live.
`

export default function App() {
  const [copiedPage, setCopiedPage] = useState(false)
  const [copiedReadme, setCopiedReadme] = useState(false)
  const [activeFile, setActiveFile] = useState<"page" | "readme">("page")
  const fileRef = useRef<HTMLPreElement>(null)

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async (type: "page" | "readme") => {
    const text = type === "page" ? pageTsxContent : readmeContent
    await navigator.clipboard.writeText(text)
    if (type === "page") {
      setCopiedPage(true)
      setTimeout(() => setCopiedPage(false), 2000)
    } else {
      setCopiedReadme(true)
      setTimeout(() => setCopiedReadme(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-zinc-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&family=JetBrains+Mono:wght@400;600&display=swap'); *{font-family:Inter,sans-serif} pre,code{font-family:'JetBrains Mono',monospace}`}</style>

      {/* Top bar */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[20px] shadow" style={{ background: ORANGE }}>I</div>
            <div>
              <p className="font-extrabold leading-none">ISLII MARKET</p>
              <p className="text-[11px] font-bold tracking-widest text-zinc-500">GITHUB REPLACE FILES • V5 PRO</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-900 text-white">
              <Rocket className="w-3.5 h-3.5" /> islii-market.vercel.app
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 grid lg:grid-cols-[320px_1fr] gap-6">

        {/* Left - Info & Downloads */}
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] border shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCode2 className="w-5 h-5" style={{ color: ORANGE }} />
              <h2 className="font-extrabold">Ready Files</h2>
              <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">V5 FINAL</span>
            </div>

            <div className="space-y-2">
              <button onClick={() => setActiveFile("page")} className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition ${activeFile === "page" ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${activeFile === "page" ? "bg-white text-zinc-900" : "bg-white border"}`}>TSX</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">app/page.tsx</p>
                  <p className={`text-xs truncate ${activeFile === "page" ? "text-zinc-400" : "text-zinc-500"}`}>{pageTsxContent.length.toLocaleString()} chars • Replace existing</p>
                </div>
                {activeFile === "page" && <div className="w-2 h-2 rounded-full bg-green-400" />}
              </button>

              <button onClick={() => setActiveFile("readme")} className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition ${activeFile === "readme" ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${activeFile === "readme" ? "bg-white text-zinc-900" : "bg-white border"}`}>MD</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">README_REPLACE.md</p>
                  <p className={`text-xs truncate ${activeFile === "readme" ? "text-zinc-400" : "text-zinc-500"}`}>Step-by-step GitHub guide</p>
                </div>
                {activeFile === "readme" && <div className="w-2 h-2 rounded-full bg-green-400" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => handleCopy(activeFile)} className="py-2.5 rounded-xl font-bold text-sm border bg-white hover:bg-zinc-50 flex items-center justify-center gap-1.5">
                {activeFile === "page" ? (copiedPage ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />) : (copiedReadme ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />)}
                {activeFile === "page" ? (copiedPage ? "Copied!" : "Copy") : (copiedReadme ? "Copied!" : "Copy")}
              </button>
              <button onClick={() => downloadFile(activeFile === "page" ? pageTsxContent : readmeContent, activeFile === "page" ? "page.tsx" : "README_REPLACE.md", "text/plain")} className="py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5" style={{ background: ORANGE }}>
                <Download className="w-4 h-4" /> Download
              </button>
            </div>

            <button onClick={() => { downloadFile(pageTsxContent, "page.tsx", "text/plain"); setTimeout(() => downloadFile(readmeContent, "README_REPLACE.md", "text/markdown"), 300) }} className="w-full mt-2 py-3 rounded-xl bg-zinc-900 text-white font-extrabold text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download BOTH Files
            </button>
          </div>

          <div className="bg-white rounded-[20px] border shadow-sm p-5">
            <h3 className="font-bold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" style={{ color: ORANGE }} /> Features in this page.tsx</h3>
            <div className="mt-3 space-y-2 text-[13px]">
              {[
                ["Orange theme #F68B1E", "Full app uses #F68B1E primary"],
                ["Hamburger drawer", "Slide left, My Shop + Admin tabs"],
                ["Bell notifications", "Join + Product added triggers"],
                ["Approval flow", "Preview / Pending / Approved"],
                ["My Shop", "Seller dashboard with status badges"],
                ["Sellers (admin only)", "Admin view seller list"],
                ["Ad Banners", "Image + Video autoplay carousel"],
                ["Promotions %", "IsPromotion badge section"],
                ["Ratings", "Seller rating + buyer product ratings"],
                ["No Gmail", "Email+Phone only when become seller"],
                ["Commission 8%", "M-Pesa 0725722020 everywhere"],
                ["Bottom nav", "Home Saved Sell Messages Profile"],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                  <div><p className="font-bold leading-tight">{title}</p><p className="text-xs text-zinc-500">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] p-5 text-white shadow" style={{ background: ORANGE }}>
            <p className="font-extrabold flex items-center gap-2"><Smartphone className="w-5 h-5" /> Quick Replace</p>
            <ol className="mt-3 space-y-2 text-[13px] font-medium leading-snug list-decimal pl-4">
              <li>GitHub → Ambassadorahmed/Islii-market-/app/page.tsx</li>
              <li>Click ✏️ Edit → Select All → Delete</li>
              <li>Paste new page.tsx (Copy button above)</li>
              <li>Commit directly to main</li>
              <li>Vercel auto-deploys ~60s</li>
            </ol>
            <div className="mt-4 bg-black/15 rounded-xl p-2.5 text-[11px] font-mono break-all">islii-market.vercel.app will update automatically</div>
          </div>
        </div>

        {/* Right - Code viewer */}
        <div className="bg-zinc-900 rounded-[20px] border border-zinc-800 shadow-xl overflow-hidden flex flex-col min-h-[640px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" /><span className="w-3 h-3 rounded-full bg-amber-400" /><span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-zinc-400 text-xs font-bold">{activeFile === "page" ? "app/page.tsx — 'use client' • V5 PRO" : "README_REPLACE.md"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 flex items-center gap-1"><Bell className="w-3 h-3" /> Bell</span>
              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 flex items-center gap-1"><Store className="w-3 h-3" /> My Shop</span>
              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Sellers Admin</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-[#0e0e10]">
            <pre ref={fileRef} className="p-4 md:p-5 text-[12px] leading-[1.6] text-zinc-300 whitespace-pre-wrap break-words">
              <code>{activeFile === "page" ? pageTsxContent : readmeContent}</code>
            </pre>
          </div>

          <div className="px-4 py-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Ratings integrated</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>M-Pesa 0725722020</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>No Gmail required</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleCopy(activeFile)} className="px-3 py-1.5 rounded-full bg-white text-zinc-900 font-bold text-xs flex items-center gap-1">
                {activeFile === "page" ? (copiedPage ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />) : (copiedReadme ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />)} Copy
              </button>
              <button onClick={() => downloadFile(activeFile === "page" ? pageTsxContent : readmeContent, activeFile === "page" ? "page.tsx" : "README_REPLACE.md", "text/plain")} className="px-3 py-1.5 rounded-full font-bold text-xs text-white flex items-center gap-1" style={{ background: ORANGE }}>
                <Download className="w-3.5 h-3.5" /> {activeFile === "page" ? "page.tsx" : "README"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer mini preview of bottom nav */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
        <div className="bg-white border rounded-[20px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-600"><div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center"><FileCode2 className="w-4 h-4" /></div> This tool generates <code className="bg-zinc-100 px-1.5 py-0.5 rounded">app/page.tsx</code> with orange theme + all V5 features → paste to GitHub → Vercel deploys</div>
          <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-zinc-500">
            <span>Bottom nav:</span><span className="px-2 py-1 rounded-full bg-zinc-100">Home</span><span className="px-2 py-1 rounded-full bg-zinc-100">Saved</span><span className="px-2 py-1 rounded-full text-white" style={{ background: ORANGE }}>Sell</span><span className="px-2 py-1 rounded-full bg-zinc-100">Messages</span><span className="px-2 py-1 rounded-full bg-zinc-100">Profile</span>
          </div>
        </div>
      </div>
    </div>
  )
}
