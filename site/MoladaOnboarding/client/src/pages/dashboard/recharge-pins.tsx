import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CreditCard, 
  Phone, 
  Copy, 
  CheckCircle2, 
  Share2, 
  Download,
  Wallet,
  ChevronRight
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";

const networks = [
  { id: "mtn", name: "MTN", color: "bg-yellow-500", denominations: [100, 200, 500, 1000, 2000, 5000] },
  { id: "airtel", name: "Airtel", color: "bg-red-500", denominations: [100, 200, 500, 1000, 2000, 5000] },
  { id: "glo", name: "Glo", color: "bg-green-500", denominations: [100, 200, 500, 1000, 2000, 5000] },
  { id: "9mobile", name: "9Mobile", color: "bg-emerald-600", denominations: [100, 200, 500, 1000, 2000, 5000] },
];

const PaymentModal = ({ onConfirm }: { onConfirm: () => void }) => (
  <DialogContent className="sm:max-w-md bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Select Payment Method</DialogTitle>
    </DialogHeader>
    <div className="grid gap-3 py-4">
      {[
        { id: "fiat", label: "Fiat Balance", value: "₦ 245,000.00", icon: Wallet },
        { id: "crypto", label: "Crypto Wallet", value: "0.045 BTC", icon: CheckCircle2 },
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

export default function RechargePins() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"select" | "quantity" | "processing" | "success">("select");
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [generatedPins, setGeneratedPins] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const network = networks.find(n => n.id === selectedNetwork);
  const total = (selectedDenomination || 0) * quantity;

  const handlePurchase = () => {
    setShowPayment(false);
    setStep("processing");
    setTimeout(() => {
      const pins = Array.from({ length: quantity }, () => 
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("")
      );
      setGeneratedPins(pins);
      setStep("success");
    }, 2000);
  };

  const copyPin = (pin: string, index: number) => {
    navigator.clipboard.writeText(pin);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative overflow-hidden">
      <div className="p-4 sm:p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-20 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => step === "select" ? setLocation("/dashboard") : setStep("select")}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-display font-bold">Recharge Pins</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-base font-semibold mb-3 block">Select Network</Label>
                <div className="grid grid-cols-2 gap-3">
                  {networks.map((net) => (
                    <button
                      key={net.id}
                      onClick={() => setSelectedNetwork(net.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedNetwork === net.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-12 h-12 ${net.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm`}>
                        {net.name[0]}
                      </div>
                      <span className="font-medium text-sm">{net.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedNetwork && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Label className="text-base font-semibold mb-3 block">Select Denomination</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {network?.denominations.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedDenomination(amount);
                          setStep("quantity");
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedDenomination === amount 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="font-bold text-lg">₦{amount.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === "quantity" && (
            <motion.div
              key="quantity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-6 border">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${network?.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {network?.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{network?.name} Recharge Pin</h3>
                    <p className="text-muted-foreground">₦{selectedDenomination?.toLocaleString()} denomination</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Quantity</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-full"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center text-lg font-bold w-20"
                        min={1}
                        max={20}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(20, quantity + 1))}
                        className="rounded-full"
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Maximum 20 pins per transaction</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Unit Price</span>
                      <span>₦{selectedDenomination?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Quantity</span>
                      <span>x {quantity}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-12 text-lg font-semibold"
                onClick={() => setShowPayment(true)}
              >
                Purchase Pins
              </Button>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-[60vh]"
            >
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-bold mb-2">Generating Pins...</h3>
              <p className="text-muted-foreground">Please wait while we generate your recharge pins</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Pins Generated!</h2>
                <p className="text-muted-foreground">{quantity} x ₦{selectedDenomination?.toLocaleString()} {network?.name} pins</p>
              </div>

              <div className="space-y-3">
                {generatedPins.map((pin, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-4 border flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pin {index + 1}</p>
                      <p className="font-mono text-lg font-bold tracking-wider">
                        {pin.replace(/(.{4})/g, "$1 ").trim()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyPin(pin, index)}
                      className="rounded-full"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => {}}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => {}}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <Button
                className="w-full"
                onClick={() => setLocation("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <PaymentModal onConfirm={handlePurchase} />
      </Dialog>
    </div>
  );
}
