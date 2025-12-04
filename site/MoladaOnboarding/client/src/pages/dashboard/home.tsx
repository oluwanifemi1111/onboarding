import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  ArrowLeftRight,
  Wifi,
  Smartphone,
  Tv,
  Zap,
  CreditCard,
  GraduationCap,
  MessageSquareText,
  Plane,
  Trophy,
  Banknote,
  RefreshCcw,
  Gift,
  Bot,
  HeadphonesIcon,
  Share2,
  Bell,
  Menu,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Phone,
  Wallet,
  CheckCircle2
} from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

// Import generated icons
import fiatIcon from "@assets/generated_images/fiat_transfer_icon.png";
import dataIcon from "@assets/generated_images/buy_data_icon.png";
import airtimeIcon from "@assets/generated_images/airtime_icon.png";
import cableIcon from "@assets/generated_images/cable_tv_icon.png";
import electricityIcon from "@assets/generated_images/electricity_icon.png";
import rechargeIcon from "@assets/generated_images/recharge_card_pins_icon.png";
import educationIcon from "@assets/generated_images/education_icon.png";
import smsIcon from "@assets/generated_images/bulk_sms_icon.png";
import flightIcon from "@assets/generated_images/flight_tickets_icon.png";
import bettingIcon from "@assets/generated_images/betting_wallets_icon.png";

// Fallback icons for ones we didn't generate specific 3D assets for yet, 
// using Lucide icons with consistent styling wrapper
const IconWrapper = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <div className={`w-full h-full flex items-center justify-center rounded-2xl ${color} text-white shadow-inner`}>
    {children}
  </div>
);

// Sample transaction history data (three mock transactions per request)
const recentTransactions = [
  {
    id: 1,
    type: "credit",
    title: "Received from David",
    description: "Ref: David",
    amount: "+₦50,000",
    date: "Today",
    status: "completed",
    icon: ArrowDownLeft,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    id: 2,
    type: "credit",
    title: "Received from Forchard",
    description: "+¢10 (N14,000)",
    amount: "+¢10 (N14,000)",
    date: "Today",
    status: "completed",
    icon: ArrowDownLeft,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    id: 3,
    type: "debit",
    title: "Bought 30GB data",
    description: "To 08065925000",
    amount: "-₦7,000",
    date: "Today",
    status: "completed",
    icon: Tv,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  }
];

const quickActions = [
  { id: 1, title: "Fiat Transfer", icon: <img src={fiatIcon} alt="Fiat Transfer" className="w-full h-full object-contain drop-shadow-md" />, route: "/transfer" },
  { id: 2, title: "Buy Data", icon: <img src={dataIcon} alt="Buy Data" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=data" },
  { id: 3, title: "Airtime", icon: <img src={airtimeIcon} alt="Airtime" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=airtime" },
  { id: 4, title: "Cable TV", icon: <img src={cableIcon} alt="Cable TV" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=cable" },
  { id: 5, title: "Electricity", icon: <img src={electricityIcon} alt="Electricity" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=electricity" },
  { id: 6, title: "Recharge Pins", icon: <img src={rechargeIcon} alt="Recharge Pins" className="w-full h-full object-contain drop-shadow-md" />, route: "/pins" },
  { id: 7, title: "Education", icon: <img src={educationIcon} alt="Education" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=education" },
  { id: 8, title: "Bulk SMS", icon: <img src={smsIcon} alt="Bulk SMS" className="w-full h-full object-contain drop-shadow-md" />, route: "/sms" },
  { id: 9, title: "Flight Tickets", icon: <img src={flightIcon} alt="Flight Tickets" className="w-full h-full object-contain drop-shadow-md" />, route: "/flights" },
  { id: 10, title: "Betting Wallets", icon: <img src={bettingIcon} alt="Betting Wallets" className="w-full h-full object-contain drop-shadow-md" />, route: "/bills?type=betting" },
  
  // Using Lucide icons for the rest with custom styling
  { id: 11, title: "Bill Loans", icon: <IconWrapper color="bg-amber-500"><Banknote size={24} /></IconWrapper>, route: "/bills?type=loans" },
  { id: 12, title: "Airtime to Cash", icon: <IconWrapper color="bg-emerald-500"><RefreshCcw size={24} /></IconWrapper>, route: "/bills?type=airtime-cash" },
  { id: 13, title: "Rewards", icon: <IconWrapper color="bg-pink-500"><Gift size={24} /></IconWrapper>, route: "/rewards" },
  { id: 14, title: "Bots", icon: <IconWrapper color="bg-indigo-500"><Bot size={24} /></IconWrapper>, route: "/bots" },
  { id: 15, title: "Support", icon: <IconWrapper color="bg-blue-500"><HeadphonesIcon size={24} /></IconWrapper>, route: "/support" },
  { id: 16, title: "Social Media", icon: <IconWrapper color="bg-violet-500"><Share2 size={24} /></IconWrapper>, route: "/socials" },
];

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary rounded-b-[3rem] shadow-2xl z-0" />
      
      {/* Header (mobile-focused) */}
      <div className="relative z-10 p-4 pb-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-primary-foreground text-primary font-bold">JD</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <p className="text-xs opacity-80">Welcome back,</p>
              <h2 className="text-lg font-display font-bold">John Doe <span className="ml-2 inline-flex items-center px-2 py-0.5 text-[10px] rounded-md bg-white/20">KYC</span></h2>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle variant="ghost" className="text-white hover:bg-white/10" iconClassName="w-5 h-5" />
            <Link href="/notifications">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 rounded-full" title="Notifications">
                <Bell className="w-6 h-6" />
              </Button>
            </Link>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 rounded-full" onClick={() => setSupportOpen(v => !v)} title="Support">
              <HeadphonesIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white shadow-lg mb-8"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Total Balance</span>
            <div className="bg-white/20 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <span>NGN</span>
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">₦ 245,000.00</h1>
          <div className="flex gap-3">
            <Button className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl h-10 text-sm">
              Fund
            </Button>
            <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl h-10 text-sm" onClick={() => setWithdrawOpen(v => !v)}>
              Withdraw
            </Button>
          </div>

          {/* Fund & Withdraw quick options inside same box */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <h4 className="text-xs text-muted-foreground mb-2">Fund</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 bg-primary text-white rounded-md text-xs">Bank transfer</button>
                <button className="px-3 py-2 bg-primary/80 text-white rounded-md text-xs">USSD</button>
                <button className="px-3 py-2 bg-primary/70 text-white rounded-md text-xs">Cards</button>
                <button className="px-3 py-2 bg-white/10 text-white rounded-md text-xs">Request / QR</button>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <h4 className="text-xs text-muted-foreground mb-2">Withdraw</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-xs">Linked bank</button>
                <button className="px-3 py-2 bg-rose-600 text-white rounded-md text-xs">Crypto</button>
                <button className="px-3 py-2 bg-amber-600 text-white rounded-md text-xs">Gift card</button>
                <button className="px-3 py-2 bg-white/10 text-white rounded-md text-xs">Send user / QR</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Grid */}
      <div className="flex-1 bg-background rounded-t-[2.5rem] -mt-6 relative z-10 px-6 pt-8 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-bold text-foreground">Quick Tools</h3>
          <button className="text-primary text-sm font-medium hover:underline">Edit</button>
        </div>

        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          {quickActions.map((action, index) => (
            <Link key={action.id} href={action.route}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 p-0 rounded-2xl bg-card shadow-sm border border-border/50 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-md">
                  <div className="w-10 h-10 sm:w-11 sm:h-11">
                    {action.icon}
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-center text-muted-foreground leading-tight max-w-[60px]">
                  {action.title}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Transaction History Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Recent Transactions</h3>
            <button className="text-primary text-sm font-medium hover:underline">See All</button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full ${transaction.iconBg} flex items-center justify-center ${transaction.iconColor}`}>
                  <transaction.icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground truncate">{transaction.title}</h4>
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{transaction.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Did you know slider */}
        <div className="mt-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-3">Did you know?</h3>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {[
              'Get instant bonus by sharing your referral link',
              'Make payment from your WhatsApp or Telegram',
              'Send Fiat money to 15 countries',
              'Buy data and airtime for your friends online',
              'Custom receipts',
              'More features coming soon beyond your expectations'
            ].map((item, i) => (
              <div key={i} className="min-w-[220px] bg-card rounded-2xl p-4 border border-border/50">
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support input (demo state) */}
      {supportOpen && (
        <div className="fixed left-4 right-4 bottom-20 bg-card p-4 rounded-2xl border border-border/50 shadow-lg z-50">
          <div className="flex items-center gap-3 mb-2">
            <HeadphonesIcon className="w-5 h-5 text-muted-foreground" />
            <h4 className="font-semibold">Support</h4>
            <button className="ml-auto text-sm text-primary" onClick={() => setSupportOpen(false)}>Close</button>
          </div>
          <input className="w-full p-3 rounded-lg bg-background border border-border/50 text-foreground mb-3" placeholder="Describe your issue or question" />
          <div className="flex gap-2">
            <Button className="flex-1">Send</Button>
            <Button variant="outline" className="flex-1">Attach</Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/90 border-t border-border/50 z-40 p-2">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
          <button className="flex flex-col items-center text-sm text-primary">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">H</div>
            <span className="mt-1 text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center text-sm text-muted-foreground">
            <div className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center">F</div>
            <span className="mt-1 text-xs">Finance</span>
          </button>
          <button className="flex flex-col items-center text-sm text-muted-foreground">
            <div className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center">R</div>
            <span className="mt-1 text-xs">Rewards</span>
          </button>
          <button className="flex flex-col items-center text-sm text-muted-foreground">
            <div className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center">M</div>
            <span className="mt-1 text-xs">Me</span>
          </button>
        </div>
      </nav>
    </div>
  );
}