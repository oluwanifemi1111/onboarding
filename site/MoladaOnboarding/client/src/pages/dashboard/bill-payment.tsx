import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  Phone, 
  Globe, 
  Wifi, 
  Tv, 
  Zap, 
  GraduationCap, 
  Trophy, 
  Banknote, 
  Clock, 
  Users, 
  CheckCircle2, 
  Download, 
  Share2, 
  Contact, 
  ChevronRight,
  AlertCircle,
  Wallet
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";

// --- Sub-components ---

const PaymentModal = ({ onConfirm }: { onConfirm: () => void }) => (
  <DialogContent className="sm:max-w-md bg-white dark:bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Select Payment Method</DialogTitle>
    </DialogHeader>
    <div className="grid gap-3 py-4">
      {[
        { id: "fiat", label: "Fiat Balance", value: "₦ 245,000.00", icon: Wallet },
        { id: "crypto", label: "Crypto Wallet", value: "0.045 BTC", icon: CheckCircle2 }, // Using generic icon for crypto
        { id: "loan", label: "Bill Loan", value: "Eligible: ₦7,000", icon: Banknote },
        { id: "request", label: "Request Link", value: "Share to pay", icon: Share2 },
      ].map((option) => (
        <button 
          key={option.id}
          onClick={onConfirm}
          className="flex items-center justify-between p-4 rounded-xl border hover:bg-secondary/50 transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <option.icon size={18} />
            </div>
            <span className="font-medium">{option.label}</span>
          </div>
          <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">{option.value}</span>
        </button>
      ))}
    </div>
  </DialogContent>
);

const SuccessStep = ({ title = "Transaction Successful" }) => (
  <div className="flex flex-col items-center justify-center h-full py-8 animate-in fade-in zoom-in duration-500 text-center">
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
      <CheckCircle2 size={48} />
    </div>
    <h2 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground mb-8 max-w-xs">
      Your transaction has been processed successfully.
    </p>
    
    <div className="w-full space-y-3">
      <Button className="w-full h-12 text-lg shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700">
        Download Receipt
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button variant="ghost" className="h-12 text-destructive">
          <AlertCircle className="mr-2 h-4 w-4" /> Report
        </Button>
      </div>
    </div>
  </div>
);

const SetPayOrderDialog = () => (
  <DialogContent className="sm:max-w-md bg-white dark:bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Set Pay Order</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label>Frequency</Label>
        <Select>
          <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input type="time" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Stop Condition</Label>
        <Input placeholder="e.g. Until Dec 2025" />
      </div>
    </div>
    <DialogFooter>
      <Button className="w-full">Confirm Schedule</Button>
    </DialogFooter>
  </DialogContent>
);

// --- Main Components for Each Category ---

const DataBundle = () => {
  const [tab, setTab] = useState("local");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="local" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="local">Local Data</TabsTrigger>
          <TabsTrigger value="international">International Data</TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-5">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Input placeholder="Enter 10-digit number" className="pl-10 h-12" />
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Button size="icon" variant="ghost" className="absolute right-2 top-2 h-8 w-8 text-primary">
                <Contact className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Provider</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mtn">MTN</SelectItem>
                <SelectItem value="airtel">Airtel</SelectItem>
                <SelectItem value="glo">Glo</SelectItem>
                <SelectItem value="9mobile">9Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Choose Bundle</Label>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-9">
                <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="text-xs">Yearly</TabsTrigger>
              </TabsList>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border rounded-xl p-3 hover:border-primary cursor-pointer hover:bg-primary/5 transition-colors">
                    <div className="text-lg font-bold text-primary">1.5 GB</div>
                    <div className="text-xs text-muted-foreground">30 Days</div>
                    <div className="font-medium mt-1">₦ 1,200</div>
                  </div>
                ))}
              </div>
            </Tabs>
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="autorenew" className="flex flex-col gap-1">
              <span>Auto-renew</span>
              <span className="font-normal text-xs text-muted-foreground">Renew when expired</span>
            </Label>
            <Switch id="autorenew" />
          </div>
        </TabsContent>

        <TabsContent value="international" className="space-y-5">
           <div className="p-8 text-center border-2 border-dashed rounded-2xl bg-secondary/20">
             <Globe className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
             <h3 className="font-semibold">International Data</h3>
             <p className="text-sm text-muted-foreground">Connect globally with our international data plans.</p>
           </div>
           {/* Duplicate structure of local but with country selector */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Airtime = () => (
  <div className="space-y-5">
     <div className="space-y-2">
      <Label>Phone Number</Label>
      <div className="relative">
        <Input placeholder="Enter phone number" className="pl-10 h-12" />
        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        <Button size="icon" variant="ghost" className="absolute right-2 top-2 h-8 w-8 text-primary">
          <Contact className="h-5 w-5" />
        </Button>
      </div>
    </div>

    <div className="space-y-2">
      <Label>Network</Label>
      <div className="grid grid-cols-4 gap-3">
        {["MTN", "Airtel", "Glo", "9Mobile"].map((net) => (
          <div key={net} className="aspect-square rounded-xl border flex items-center justify-center font-bold text-xs hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
            {net}
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label>Amount</Label>
      <div className="relative">
        <Input type="number" placeholder="0.00" className="pl-10 h-12 text-lg font-semibold" />
        <span className="absolute left-3 top-3.5 text-muted-foreground font-bold">₦</span>
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
        {[100, 200, 500, 1000, 2000].map((amt) => (
          <Button key={amt} variant="outline" size="sm" className="rounded-full text-xs h-8 shrink-0">
            ₦{amt}
          </Button>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-between py-2">
      <Label htmlFor="save-ben" className="cursor-pointer">Save Beneficiary</Label>
      <Switch id="save-ben" />
    </div>
  </div>
);

const CableTV = () => (
  <div className="space-y-5">
    <div className="space-y-2">
      <Label>Provider</Label>
      <div className="grid grid-cols-2 gap-3">
        {["DSTV", "GOTV", "Startimes", "Showmax"].map((prov) => (
          <div key={prov} className="h-14 rounded-xl border flex items-center justify-center font-bold hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
            {prov}
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label>Package</Label>
      <Select>
        <SelectTrigger className="h-12"><SelectValue placeholder="Select Package" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="compact">Compact Plus</SelectItem>
          <SelectItem value="yanga">Yanga</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Smart Card Number / IUC</Label>
      <Input placeholder="Enter ID Number" className="h-12" />
    </div>

    <div className="p-4 bg-secondary/30 rounded-xl flex justify-between items-center">
      <span className="text-sm text-muted-foreground">Amount to Pay</span>
      <span className="text-xl font-bold text-primary">₦ 0.00</span>
    </div>
  </div>
);

const Electricity = () => (
  <div className="space-y-5">
     <div className="space-y-2">
      <Label>Meter Type</Label>
      <div className="flex p-1 bg-secondary/50 rounded-xl">
        <button className="flex-1 py-2 rounded-lg bg-white shadow-sm text-sm font-medium text-primary">Prepaid</button>
        <button className="flex-1 py-2 rounded-lg text-sm font-medium text-muted-foreground">Postpaid</button>
      </div>
    </div>

    <div className="space-y-2">
      <Label>Distribution Company</Label>
      <Select defaultValue="forchard">
        <SelectTrigger className="h-12"><SelectValue placeholder="Select Disco" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="forchard">Forchard Pay (Demo)</SelectItem>
          <SelectItem value="ikeja">Ikeja Electric</SelectItem>
          <SelectItem value="eko">Eko Electric</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Meter Number</Label>
      <Input placeholder="Enter Meter Number" className="h-12" />
    </div>

    <div className="space-y-2">
      <Label>Amount</Label>
      <div className="relative">
        <Input type="number" placeholder="0.00" className="pl-10 h-12 text-lg font-semibold" />
        <span className="absolute left-3 top-3.5 text-muted-foreground font-bold">₦</span>
      </div>
    </div>
  </div>
);

const Education = () => (
  <div className="space-y-6 text-center py-8">
    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
      <GraduationCap size={40} />
    </div>
    <h3 className="text-xl font-bold">Exam PINs & Sponsorships</h3>
    <p className="text-muted-foreground mb-6">
      Purchase WAEC/JAMB PINs or apply for educational sponsorships directly.
    </p>
    
    <div className="grid gap-4">
      <Button variant="outline" className="h-14 justify-between px-6" disabled>
        <span>Buy WAEC PIN</span>
        <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">Coming Soon</span>
      </Button>
      <Button variant="outline" className="h-14 justify-between px-6" disabled>
        <span>Buy JAMB PIN</span>
        <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">Coming Soon</span>
      </Button>
      
      <div className="mt-4 p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20">
        <h4 className="font-bold text-primary mb-2">Need Sponsorship?</h4>
        <p className="text-sm text-muted-foreground mb-4">Browse available educational grants and sponsorships.</p>
        <Button className="w-full shadow-lg shadow-primary/20">Apply Now</Button>
      </div>
    </div>
  </div>
);

const Betting = () => (
  <div className="space-y-5">
    <div className="space-y-2">
      <Label>Platform</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-14 rounded-xl border flex items-center justify-center font-bold hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">SportyBet</div>
        <div className="h-14 rounded-xl border flex items-center justify-center font-bold hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">1xBet</div>
      </div>
    </div>

    <div className="space-y-2">
      <Label>User ID</Label>
      <Input placeholder="Enter User ID" className="h-12" />
    </div>

    <div className="space-y-2">
      <Label>Amount</Label>
      <div className="relative">
        <Input type="number" placeholder="0.00" className="pl-10 h-12 text-lg font-semibold" />
        <span className="absolute left-3 top-3.5 text-muted-foreground font-bold">₦</span>
      </div>
    </div>

    {/* Demo Fail Simulation */}
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Limit Warning</h4>
        <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">
          You’ve reached your 20% monthly bet funding limit.
        </p>
      </div>
    </div>
  </div>
);

const BillLoans = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-primary to-purple-700 text-white p-6 rounded-2xl shadow-lg">
      <p className="text-white/80 text-sm mb-1">You're eligible to borrow</p>
      <h2 className="text-4xl font-display font-bold">₦ 7,000.00</h2>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between text-sm font-medium">
        <span>How much do you need?</span>
        <span className="text-primary">₦ 3,500</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>₦ 500</span>
        <span>₦ 7,000</span>
      </div>
    </div>

    <div className="p-4 border rounded-xl space-y-2">
      <h4 className="font-semibold text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-orange-500" /> Loan Restrictions
      </h4>
      <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
        <li>No airtime-to-cash while bill loan is active</li>
        <li>No funding others' airtime</li>
        <li>Long-term unpaid loans = Withdrawal Suspension</li>
      </ul>
    </div>

    <Button variant="outline" className="w-full border-primary/20 text-primary">
      View Bill Loan Requirements
    </Button>
  </div>
);

const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full py-12 text-center opacity-60">
    <Clock className="w-16 h-16 mb-4 text-muted-foreground" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">Coming soon</p>
  </div>
);


export default function BillPayment() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState<"form" | "success">("form");
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get("type") || "data";

  // Map type to Component & Title
  const renderContent = () => {
    switch(type) {
      case "data": return { component: <DataBundle />, title: "Buy Data", icon: Wifi };
      case "airtime": return { component: <Airtime />, title: "Buy Airtime", icon: Phone };
      case "cable": return { component: <CableTV />, title: "Cable TV", icon: Tv };
      case "electricity": return { component: <Electricity />, title: "Electricity", icon: Zap };
      case "education": return { component: <Education />, title: "Education", icon: GraduationCap };
      case "betting": return { component: <Betting />, title: "Betting Wallet", icon: Trophy };
      case "loans": return { component: <BillLoans />, title: "Bill Loans", icon: Banknote };
      case "cac": return { component: <ComingSoon title="CAC Registration" />, title: "CAC Registration", icon: Users };
      case "airtime-cash": return { component: <ComingSoon title="Airtime to Cash" />, title: "Airtime to Cash", icon: Banknote };
      default: return { component: <DataBundle />, title: "Bill Payment", icon: Wifi };
    }
  };

  const { component, title, icon: Icon } = renderContent();

  const handlePayment = () => {
    // Simulate processing
    setTimeout(() => {
      setStep("success");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => step === "form" ? setLocation("/dashboard") : setStep("form")}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-display font-bold flex items-center gap-2">
            {title}
          </h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-md mx-auto w-full pb-24">
        
        {step === "form" && (
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              {component}
            </div>

            {/* Action Buttons - Only show for active forms */}
            {type !== "education" && type !== "cac" && type !== "airtime-cash" && (
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/25">
                      PAY NOW
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <PaymentModal onConfirm={handlePayment} />
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-14 text-base border-primary/20 text-primary hover:bg-primary/5">
                      <Clock className="ml-2 w-4 h-4 mr-2" />
                      SET PAY ORDER
                    </Button>
                  </DialogTrigger>
                  <SetPayOrderDialog />
                </Dialog>
              </div>
            )}
          </div>
        )}

        {step === "success" && <SuccessStep />}

      </div>
    </div>
  );
}