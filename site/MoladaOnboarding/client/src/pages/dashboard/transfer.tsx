import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  QrCode, 
  Globe, 
  User, 
  Calendar, 
  Clock, 
  Repeat, 
  CheckCircle2, 
  Share2, 
  Download, 
  AlertCircle,
  Copy
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import successIcon from "@assets/generated_images/success_checkmark_icon.png";

// --- Sub-components ---

const TransferOrderDialog = () => (
  <DialogContent className="sm:max-w-md bg-white dark:bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Set Transfer Order</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <div className="relative">
            <Input type="date" className="pl-10" />
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <div className="relative">
            <Input type="time" className="pl-10" />
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Frequency</Label>
        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <option>One-time</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Every 1st of the month</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Stop Condition</Label>
        <Input placeholder="e.g., Until July 2026" />
      </div>
    </div>
    <DialogFooter>
      <Button className="w-full">Confirm Schedule</Button>
    </DialogFooter>
  </DialogContent>
);

const PaymentMethodDialog = ({ onConfirm }: { onConfirm: () => void }) => (
  <DialogContent className="sm:max-w-md bg-white dark:bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Select Payment Method</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <RadioGroup defaultValue="fiat" className="grid gap-3">
        <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fiat" id="fiat" />
            <Label htmlFor="fiat" className="cursor-pointer font-medium">Fiat Balance</Label>
          </div>
          <span className="text-sm font-bold text-primary">₦ 245,000.00</span>
        </div>
        <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="crypto" id="crypto" />
            <Label htmlFor="crypto" className="cursor-pointer font-medium">Crypto Wallet</Label>
          </div>
          <span className="text-sm font-bold text-muted-foreground">0.045 BTC</span>
        </div>
      </RadioGroup>
    </div>
    <DialogFooter>
      <Button className="w-full" onClick={onConfirm}>Proceed to Verify</Button>
    </DialogFooter>
  </DialogContent>
);

const VerificationStep = ({ onVerify }: { onVerify: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full py-8 space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-display font-bold">Verify Payment</h2>
      <p className="text-muted-foreground">Confirm your identity to proceed</p>
    </div>

    <div className="w-full max-w-xs space-y-4">
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-12 h-12 rounded-xl border-2 border-primary/20 flex items-center justify-center text-2xl font-bold bg-white dark:bg-card shadow-sm">
            •
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full h-12 border-primary/20 hover:bg-primary/5 text-primary"
        onClick={onVerify}
      >
        Use Biometric / Face ID
      </Button>
    </div>
  </div>
);

const ProcessingStep = () => (
  <div className="flex flex-col items-center justify-center h-full py-20">
    <div className="relative">
      <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse"></div>
      <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-primary">MOLADA</span>
      </div>
    </div>
    <h3 className="mt-8 text-xl font-display font-semibold animate-pulse">Processing Transaction...</h3>
  </div>
);

const SuccessStep = ({ onShowReceipt }: { onShowReceipt: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full py-8 animate-in fade-in zoom-in duration-500">
    <div className="w-32 h-32 mb-6 relative">
      <img src={successIcon} alt="Success" className="w-full h-full object-contain" />
    </div>
    <h2 className="text-3xl font-display font-bold text-green-600 mb-2">SUCCESSFUL</h2>
    <p className="text-muted-foreground mb-8">Transfer completed successfully</p>
    
    <div className="w-full space-y-3">
      <Button onClick={onShowReceipt} className="w-full h-12 text-lg shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700">
        View Receipt
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button variant="outline" className="h-12">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  </div>
);

const ReceiptView = () => (
  <Card className="w-full bg-white dark:bg-card overflow-hidden border-none shadow-xl">
    <div className="bg-primary p-6 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
      <h3 className="font-display font-bold text-lg relative z-10">TRANSACTION RECEIPT</h3>
      <div className="mt-2 text-3xl font-bold relative z-10">₦ 90,000.00</div>
      <div className="mt-1 text-white/80 text-sm relative z-10">Successful</div>
    </div>
    <CardContent className="p-6 space-y-4 text-sm relative">
      {/* Receipt Cutout Effect */}
      <div className="absolute top-0 left-0 w-full h-4 -mt-2 bg-background" style={{clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)"}}></div>

      <div className="space-y-4 pt-2">
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Date & Time</span>
          <span className="font-medium text-right">Nov 28, 2025, 3:45 PM</span>
        </div>
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Type</span>
          <span className="font-medium text-right">Local Transfer</span>
        </div>
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Sender</span>
          <span className="font-medium text-right">8065***1</span>
        </div>
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Recipient</span>
          <span className="font-medium text-right">John Doe</span>
        </div>
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Remark</span>
          <span className="font-medium text-right max-w-[150px] truncate">Partial funding for MOLADA Pay</span>
        </div>
        <div className="flex justify-between py-2 border-b border-dashed border-border">
          <span className="text-muted-foreground">Transaction No.</span>
          <span className="font-medium text-right">267293</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Session ID</span>
          <span className="font-medium text-right">3773592</span>
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button variant="outline" className="flex-1 border-primary/20 text-primary hover:bg-primary/5">
          <Download className="mr-2 h-4 w-4" /> Save
        </Button>
        <Button variant="ghost" className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive">
          <AlertCircle className="mr-2 h-4 w-4" /> Report
        </Button>
      </div>
    </CardContent>
  </Card>
);

// --- Main Component ---

export default function Transfer() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"form" | "verify" | "processing" | "success" | "receipt">("form");
  const [activeTab, setActiveTab] = useState("local");

  const handlePayNow = () => {
    setStep("verify");
  };

  const handleVerify = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2500);
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
          <h1 className="text-xl font-display font-bold">Fiat Transfer</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-md mx-auto w-full pb-24">
        
        {step === "form" && (
          <Tabs defaultValue="local" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="local" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Local</TabsTrigger>
              <TabsTrigger value="international" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Global</TabsTrigger>
              <TabsTrigger value="qr" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">QR / Link</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* LOCAL TRANSFER */}
                <TabsContent value="local" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Account / Phone Number</Label>
                      <div className="relative">
                        <Input placeholder="Enter number" defaultValue="8065979210" className="h-12 pl-10" />
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-green-600 font-medium flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> John Doe (MOLADA User)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Amount (NGN)</Label>
                      <div className="relative">
                        <Input type="number" placeholder="0.00" defaultValue="90000" className="h-12 pl-10 text-lg font-semibold" />
                        <span className="absolute left-3 top-3.5 font-bold text-muted-foreground">₦</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min: ₦100 / Max: ₦350,000</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Note <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                      <Input placeholder="What's this for?" defaultValue="Partial funding for MOLADA Pay" className="h-12" />
                    </div>
                  </div>
                </TabsContent>

                {/* INTERNATIONAL TRANSFER */}
                <TabsContent value="international" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Recipient Email</Label>
                      <div className="relative">
                        <Input type="email" placeholder="name@example.com" defaultValue="support@moladapay.com" className="h-12 pl-10" />
                        <Globe className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Amount (NGN)</Label>
                      <div className="relative">
                        <Input type="number" placeholder="0.00" defaultValue="90000" className="h-12 pl-10 text-lg font-semibold" />
                        <span className="absolute left-3 top-3.5 font-bold text-muted-foreground">₦</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min: ₦2,000 / Max: ₦500,000</p>
                    </div>
                  </div>
                </TabsContent>

                {/* QR / LINK TRANSFER */}
                <TabsContent value="qr" className="space-y-6 mt-0">
                  <div className="bg-white dark:bg-card border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-secondary/20 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Scan or Generate Code</h3>
                      <p className="text-sm text-muted-foreground mt-1">Tap to scan QR code or generate a payment link</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or paste link</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Paste payment link here" className="h-12" />
                    <Button size="icon" variant="outline" className="h-12 w-12 shrink-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-12 space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/25">
                    PAY NOW
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <PaymentMethodDialog onConfirm={handlePayNow} />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full h-14 text-base border-primary/20 text-primary hover:bg-primary/5">
                    <Repeat className="ml-2 w-4 h-4 mr-2" />
                    SET TRANSFER ORDER
                  </Button>
                </DialogTrigger>
                <TransferOrderDialog />
              </Dialog>
            </div>
          </Tabs>
        )}

        {step === "verify" && <VerificationStep onVerify={handleVerify} />}
        {step === "processing" && <ProcessingStep />}
        {step === "success" && <SuccessStep onShowReceipt={() => setStep("receipt")} />}
        {step === "receipt" && <ReceiptView />}

      </div>
    </div>
  );
}