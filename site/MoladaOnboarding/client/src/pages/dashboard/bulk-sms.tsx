import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  Upload, 
  CheckCircle2, 
  Send,
  FileText,
  Wallet,
  Plus,
  X,
  Phone
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const senderIds = ["MOLADA", "MyBusiness", "Custom"];
const smsPackages = [
  { units: 100, price: 1500, bonus: 0 },
  { units: 500, price: 7000, bonus: 25 },
  { units: 1000, price: 13000, bonus: 100 },
  { units: 5000, price: 60000, bonus: 750 },
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

export default function BulkSms() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("send");
  const [step, setStep] = useState<"compose" | "preview" | "sending" | "success">("compose");
  const [senderId, setSenderId] = useState("MOLADA");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newNumber, setNewNumber] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [smsBalance, setSmsBalance] = useState(150);

  const messageLength = message.length;
  const smsCount = Math.ceil(messageLength / 160) || 1;
  const totalSms = smsCount * recipients.length;

  const addRecipient = () => {
    if (newNumber && !recipients.includes(newNumber)) {
      setRecipients([...recipients, newNumber]);
      setNewNumber("");
    }
  };

  const removeRecipient = (number: string) => {
    setRecipients(recipients.filter(r => r !== number));
  };

  const handleSend = () => {
    setShowPayment(false);
    setStep("sending");
    setTimeout(() => {
      setSmsBalance(prev => prev - totalSms);
      setStep("success");
    }, 2500);
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
          <h1 className="text-lg sm:text-xl font-display font-bold">Bulk SMS</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="bg-primary/10 p-4 mx-4 mt-4 rounded-2xl border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">SMS Balance</p>
            <p className="text-2xl font-bold text-primary">{smsBalance.toLocaleString()} units</p>
          </div>
          <Button size="sm" onClick={() => setActiveTab("buy")}>
            <Plus className="w-4 h-4 mr-1" />
            Buy Units
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="send">Send SMS</TabsTrigger>
            <TabsTrigger value="buy">Buy Units</TabsTrigger>
          </TabsList>

          <TabsContent value="send">
            <AnimatePresence mode="wait">
              {step === "compose" && (
                <motion.div
                  key="compose"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="mb-2 block">Sender ID</Label>
                    <div className="flex gap-2 flex-wrap">
                      {senderIds.map((id) => (
                        <Button
                          key={id}
                          variant={senderId === id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSenderId(id)}
                          className="rounded-full"
                        >
                          {id}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Recipients</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Enter phone number"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={addRecipient} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipients.map((number) => (
                        <div
                          key={number}
                          className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                        >
                          <Phone className="w-3 h-3" />
                          {number}
                          <button onClick={() => removeRecipient(number)}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        Import CSV
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Contact Groups
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Message</Label>
                      <span className="text-xs text-muted-foreground">
                        {messageLength}/160 ({smsCount} SMS)
                      </span>
                    </div>
                    <Textarea
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="bg-card rounded-xl p-4 border">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recipients</span>
                      <span>{recipients.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>SMS per recipient</span>
                      <span>{smsCount}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total SMS units</span>
                      <span className="text-primary">{totalSms}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12"
                    disabled={!message || recipients.length === 0}
                    onClick={() => setStep("preview")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Preview & Send
                  </Button>
                </motion.div>
              )}

              {step === "preview" && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card rounded-2xl p-6 border">
                    <h3 className="font-bold mb-4">Message Preview</h3>
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">From: {senderId}</p>
                      <p className="text-foreground">{message}</p>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-4 border">
                    <h3 className="font-bold mb-3">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recipients</span>
                        <span>{recipients.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SMS per message</span>
                        <span>{smsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total units required</span>
                        <span>{totalSms}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>Available balance</span>
                        <span className={smsBalance >= totalSms ? "text-green-500" : "text-red-500"}>
                          {smsBalance} units
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("compose")}>
                      Edit
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={() => smsBalance >= totalSms ? handleSend() : setActiveTab("buy")}
                    >
                      {smsBalance >= totalSms ? "Send Now" : "Buy Units"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "sending" && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-[50vh]"
                >
                  <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                  <h3 className="text-xl font-bold mb-2">Sending Messages...</h3>
                  <p className="text-muted-foreground">Delivering to {recipients.length} recipients</p>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Messages Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Successfully delivered to {recipients.length} recipients
                  </p>
                  <div className="bg-card rounded-xl p-4 border mb-6 max-w-xs mx-auto">
                    <div className="flex justify-between text-sm">
                      <span>Units used</span>
                      <span className="font-bold">{totalSms}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Remaining balance</span>
                      <span className="font-bold text-primary">{smsBalance}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => {
                      setStep("compose");
                      setMessage("");
                      setRecipients([]);
                    }}>
                      Send Another
                    </Button>
                    <Button onClick={() => setLocation("/dashboard")}>
                      Done
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="buy">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Buy SMS Units</h3>
              <div className="grid gap-4">
                {smsPackages.map((pkg) => (
                  <button
                    key={pkg.units}
                    onClick={() => setShowPayment(true)}
                    className="bg-card rounded-2xl p-4 border hover:border-primary transition-colors text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">{pkg.units.toLocaleString()} SMS Units</p>
                        {pkg.bonus > 0 && (
                          <p className="text-green-500 text-sm">+{pkg.bonus} bonus units</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-xl">₦{pkg.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          ₦{(pkg.price / pkg.units).toFixed(1)}/sms
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <PaymentModal onConfirm={() => {
          setShowPayment(false);
          setSmsBalance(prev => prev + 500);
        }} />
      </Dialog>
    </div>
  );
}
