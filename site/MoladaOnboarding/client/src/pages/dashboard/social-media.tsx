import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  CheckCircle2,
  ExternalLink,
  Users,
  MessageCircle,
  Gift,
  ChevronRight,
  QrCode
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";

const socialLinks = [
  { 
    id: "twitter", 
    name: "Twitter / X", 
    handle: "@MoladaPay", 
    followers: "125K",
    color: "bg-black dark:bg-white dark:text-black",
    url: "https://twitter.com/MoladaPay"
  },
  { 
    id: "instagram", 
    name: "Instagram", 
    handle: "@moladapay", 
    followers: "89K",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
    url: "https://instagram.com/moladapay"
  },
  { 
    id: "facebook", 
    name: "Facebook", 
    handle: "MOLADA Pay", 
    followers: "67K",
    color: "bg-blue-600",
    url: "https://facebook.com/moladapay"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    handle: "MOLADA Pay", 
    followers: "15K",
    color: "bg-blue-700",
    url: "https://linkedin.com/company/moladapay"
  },
  { 
    id: "telegram", 
    name: "Telegram", 
    handle: "@MoladaPayOfficial", 
    followers: "45K",
    color: "bg-sky-500",
    url: "https://t.me/moladapay"
  },
  { 
    id: "discord", 
    name: "Discord", 
    handle: "MOLADA Community", 
    followers: "32K",
    color: "bg-indigo-500",
    url: "https://discord.gg/moladapay"
  },
];

const communityStats = [
  { label: "Total Followers", value: "373K", icon: Users },
  { label: "Monthly Posts", value: "120+", icon: MessageCircle },
  { label: "Giveaways", value: "Weekly", icon: Gift },
];

export default function SocialMedia() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const referralCode = "MOLADA-JD2024";
  const referralLink = `https://molada.pay/ref/${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative overflow-hidden">
      <div className="p-4 sm:p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLocation("/dashboard")}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-display font-bold">Social & Community</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 border text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-bold text-lg">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-8 h-8" />
            <div>
              <h2 className="font-bold text-lg">Refer & Earn</h2>
              <p className="text-white/80 text-sm">Earn ₦500 for every friend who joins!</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 mb-4">
            <p className="text-xs text-white/80 mb-1">Your referral code</p>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold">{referralCode}</span>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={copyLink}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-white text-primary hover:bg-white/90"
              onClick={copyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setShowQR(true)}
            >
              <QrCode className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>
          <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-4 border flex items-center justify-between hover:border-primary transition-colors group block"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {social.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{social.name}</p>
                    <p className="text-sm text-muted-foreground">{social.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-primary">{social.followers}</p>
                    <p className="text-xs text-muted-foreground">followers</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border">
          <h3 className="font-bold mb-2">Join Our Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get updates on new features, promotions, and exclusive offers
          </p>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-xs bg-card">
          <DialogHeader>
            <DialogTitle className="text-center">Scan to Join</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to join MOLADA Pay with your referral code applied
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
