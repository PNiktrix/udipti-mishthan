// ============================================================
// config.js — Site-wide configuration for Udipti Mishthan
// ============================================================

const CONFIG = {
  siteName: "Udipti Mishthan",
  tagline: "Sabke Mann ko bhaye, muh mai jaate hi ghul jaaye",
  taglineEnglish: "Melts in the Mouth, Lives in the Heart",
  logo: "data/images/logo.png",
  whatsappNumber: "918655167770",
  phone1: "8655167770",
  phone2: "9321666984",
  email: "udiptimisthan@gmail.com",
  address: "Sathyam Chawl, P. L. Lokhande Marg, Chembur, Mumbai",
  instagram: "https://www.instagram.com/udipti_misthan",
  facebook: "https://www.facebook.com/UdiptiMishthan",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.5!2d72.9!3d19.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ2hlbWJ1ciwgTXVtYmFp!5e0!3m2!1sen!2sin!4v1",
  openingHours: {
    weekdays: "9:00 AM – 9:00 PM",
    weekends: "8:00 AM – 10:00 PM"
  },
  orderLeadTime: "1–2 days advance order required",
  currency: "₹",
  categories: [
    { id: "all", label: "All Sweets", icon: "🍬" },
    { id: "ladoo", label: "Ladoo", icon: "🟡" },
    { id: "modak", label: "Modak", icon: "🫓" },
    { id: "peda", label: "Peda", icon: "🟤" },
    { id: "halwa", label: "Halwa", icon: "🥕" },
    { id: "snacks", label: "Snacks", icon: "🥐" },
    { id: "other-sweets", label: "Other Sweets", icon: "🍮" }
  ],
  specialCategories: [
    { id: "sugar-free", label: "Sugar-Free", icon: "🌿", filter: "sugar-free" },
    { id: "jaggery", label: "Jaggery Sweets", icon: "🍯", filter: "with-jaggery" },
    { id: "dry-fruit", label: "Dry Fruit", icon: "🥜", filter: "dry-fruit" },
    { id: "healthy", label: "Healthy Sweets", icon: "💚", filter: "healthy" },
    { id: "gift-boxes", label: "Gift Boxes", icon: "🎁", filter: "gift" }
  ],
  festivals: [
    {
      id: "diwali",
      name: "Diwali Specials",
      icon: "🪔",
      description: "Celebrate the festival of lights with our handcrafted Diwali mithai boxes",
      color: "#E8A000"
    },
    {
      id: "ganesh-chaturthi",
      name: "Ganesh Chaturthi",
      icon: "🐘",
      description: "Offer Bappa's favourite modaks and traditional prasad sweets",
      color: "#C0392B"
    },
    {
      id: "raksha-bandhan",
      name: "Raksha Bandhan",
      icon: "🎀",
      description: "Sweet gifts for your beloved siblings on this special occasion",
      color: "#8E44AD"
    },
    {
      id: "holi",
      name: "Holi Specials",
      icon: "🎨",
      description: "Colourful celebrations deserve the sweetest mithai — pure & festive",
      color: "#27AE60"
    }
  ],
  giftBoxes: [
    {
      id: "gb1",
      name: "Classic Mithai Box",
      description: "Assorted 6 types of ladoos beautifully packaged",
      price: 600,
      image: "data/images/gift-box-1.jpg"
    },
    {
      id: "gb2",
      name: "Premium Gift Hamper",
      description: "Assorted sweets including modak, peda, ladoo in premium box",
      price: 1200,
      image: "data/images/gift-box-2.jpg"
    },
    {
      id: "gb3",
      name: "Corporate Sweet Box",
      description: "Elegant corporate gifting solution with 10 variety sweets",
      price: 2000,
      image: "data/images/gift-box-3.jpg"
    }
  ],
  customOptions: {
    "with-sugar": { label: "With Sugar", icon: "🍚" },
    "sugar-free": { label: "Sugar Free", icon: "🚫" },
    "with-jaggery": { label: "With Jaggery", icon: "🍯" },
    "low-sugar": { label: "Low Sugar", icon: "📉" },
    "vegan": { label: "Vegan", icon: "🌱" }
  }
};

window.CONFIG = CONFIG;
