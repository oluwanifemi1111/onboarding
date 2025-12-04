import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Phone, Mail, MessageCircle, Globe, HelpCircle, Share2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImage from "@assets/generated_images/molada_pay_logo.png";
import africaMapImage from "@assets/generated_images/africa_map_network.png";
import appInterfaceImage from "@assets/generated_images/app_interface_collage.png";
import securityImage from "@assets/generated_images/ai_and_security_icons.png";

const slides = [
  {
    id: 1,
    title: "Pan-African Reach",
    description: "Experience instant, seamless, and borderless payments across Africa.",
    image: africaMapImage,
    color: "from-purple-900/20 to-indigo-900/20"
  },
  {
    id: 2,
    title: "Smart Transactions",
    description: "Smarter ways to pay bills, transfer funds, exchange crypto, and manage your finances — all in one app.",
    image: appInterfaceImage,
    color: "from-violet-900/20 to-purple-900/20"
  },
  {
    id: 3,
    title: "AI, Security, Compliance",
    description: "AI-powered, secure, and regulation-ready. MOLADA puts control back in your hands.",
    image: securityImage,
    color: "from-indigo-900/20 to-violet-900/20"
  }
];

const SocialLink = ({ name, color, icon }: { name: string, color: string, icon?: string }) => (
  <motion.a
    href="#"
    whileHover={{ scale: 1.05, x: 5 }}
    className={`flex items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group`}
  >
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center mr-3 text-white text-xs font-bold shadow-lg`}>
      {icon || name[0]}
    </div>
    <span className="text-white/90 font-medium text-sm">{name}</span>
  </motion.a>
);

export default function Onboarding() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection >= 0 && currentSlide + newDirection < slides.length) {
      setDirection(newDirection);
      setCurrentSlide(currentSlide + newDirection);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (showSplash) {
    return (
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div 
            className="w-32 h-32 mb-6 rounded-2xl bg-white shadow-2xl flex items-center justify-center p-4"
            animate={{ 
              y: [0, -10, 0],
              boxShadow: ["0 20px 50px -12px rgba(124, 58, 237, 0.25)", "0 25px 60px -12px rgba(124, 58, 237, 0.4)", "0 20px 50px -12px rgba(124, 58, 237, 0.25)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={logoImage} alt="Molada Pay" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-display font-bold text-primary tracking-tight text-center"
          >
            MOLADA PAY
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mt-2 text-sm tracking-widest uppercase font-medium"
          >
            Technologies
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pt-8 pb-32 w-full max-w-md mx-auto relative z-10 h-full">
        
        {/* Top Bar */}
        <div className="w-full flex justify-between items-center h-16">
          <div className="w-10" />
          <motion.img 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            src={logoImage} 
            alt="Molada" 
            className="h-10 w-auto drop-shadow-sm" 
          />
          <ThemeToggle variant="ghost" className="hover:bg-secondary" />
        </div>

        {/* Slides Carousel */}
        <div className="w-full flex-1 relative flex flex-col items-center justify-center min-h-[450px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex flex-col items-center justify-start text-center pt-4"
            >
              {/* Image Container */}
              <motion.div 
                className="relative w-full aspect-square max-h-[320px] mb-8 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color}`} />
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                {/* Glass Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50" />
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 px-2"
              >
                <h2 className="text-3xl font-display font-bold text-foreground leading-tight tracking-tight">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Area */}
        <div className="w-full space-y-8 mt-auto pt-4">
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/20"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
        <div className="w-full flex justify-end items-center gap-4">
           {currentSlide < slides.length - 1 && (
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = "/signup"}
              className="text-muted-foreground hover:text-primary font-medium hover:bg-transparent"
            >
              Skip
            </Button>
          )}
          <Button
            size="lg"
            onClick={() => {
              if (currentSlide === slides.length - 1) {
                window.location.href = "/signup";
              } else {
                paginate(1);
              }
            }}
            className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : (
              <>
                Next
                <ChevronRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
        </div>
      </div>

      {/* Persistent Footer Links */}
      <div className="w-full bg-white/80 dark:bg-black/40 backdrop-blur-xl border-t border-border p-6 absolute bottom-0 z-20">
        <div className="max-w-md mx-auto flex justify-between items-center text-xs sm:text-sm font-medium">
          <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Globe className="w-4 h-4" />
            <span>Check website</span>
          </a>

          <div className="h-4 w-px bg-border mx-2" />

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>Contact Support</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-center mb-2">Contact Us</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-center text-muted-foreground mb-4">Reach out to us via any of the following:</p>
                
                <a href="tel:+234XXXXXXXX" className="flex items-center p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Call Us</div>
                    <div className="font-semibold text-foreground">+234 XXX XXX XXXX</div>
                  </div>
                </a>
                
                <a href="mailto:support@moladapay.com" className="flex items-center p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Email Us</div>
                    <div className="font-semibold text-foreground">support@moladapay.com</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors border border-green-500/20 group">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-green-600/70 dark:text-green-400/70 uppercase tracking-wider">Chat</div>
                    <div className="font-semibold text-green-700 dark:text-green-300">WhatsApp Support</div>
                  </div>
                </a>
              </div>
            </DialogContent>
          </Dialog>

          <div className="h-4 w-px bg-border mx-2" />

          <Dialog>
            <DialogTrigger asChild>
               <button className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
                 <Share2 className="w-4 h-4" />
                 <span>Follow Us</span>
               </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#0f0529] border-white/10 text-white overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-purple-600/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-3xl" />
              </div>
              
              <DialogHeader className="relative z-10">
                <DialogTitle className="font-display text-2xl text-center text-white">Know us better</DialogTitle>
              </DialogHeader>
              <div className="py-4 relative z-10">
                <p className="text-center text-white/60 mb-6 text-sm">Follow us on social media for updates, promos, and tips.</p>
                <div className="grid grid-cols-2 gap-3">
                  <SocialLink name="TikTok" color="bg-black border border-white/20" icon="T" />
                  <SocialLink name="Instagram" color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" icon="I" />
                  <SocialLink name="Facebook" color="bg-blue-600" icon="F" />
                  <SocialLink name="Twitter" color="bg-black" icon="X" />
                  <SocialLink name="Telegram" color="bg-sky-500" icon="T" />
                  <SocialLink name="WhatsApp" color="bg-green-500" icon="W" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}