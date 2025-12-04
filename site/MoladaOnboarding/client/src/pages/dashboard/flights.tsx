import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Plane, 
  Calendar, 
  Users, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Download,
  MapPin,
  ArrowRight,
  Ticket
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import flightHeroImage from "@assets/generated_images/flight_booking_hero.png";

// --- Sub-components ---

const PurchaseOrderDialog = () => (
  <DialogContent className="sm:max-w-md bg-white dark:bg-card">
    <DialogHeader>
      <DialogTitle className="font-display text-xl text-center">Set Purchase Order</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label>Automate Payment Date</Label>
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
      <p className="text-xs text-muted-foreground">
        The ticket will be automatically purchased on the selected date/time if funds are available.
      </p>
    </div>
    <DialogFooter>
      <Button className="w-full">Confirm Schedule</Button>
    </DialogFooter>
  </DialogContent>
);

const PaymentOptionsDialog = ({ onConfirm }: { onConfirm: () => void }) => (
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
         <div className="flex items-center justify-between space-x-2 border p-4 rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="request" id="request" />
            <Label htmlFor="request" className="cursor-pointer font-medium">Request from Friend</Label>
          </div>
           <Users className="h-4 w-4 text-muted-foreground" />
        </div>
      </RadioGroup>
    </div>
    <DialogFooter>
      <Button className="w-full" onClick={onConfirm}>Proceed to Pay</Button>
    </DialogFooter>
  </DialogContent>
);

const SuccessStep = () => (
  <div className="flex flex-col items-center justify-center h-full py-8 animate-in fade-in zoom-in duration-500 text-center">
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
      <CheckCircle2 size={48} />
    </div>
    <h2 className="text-3xl font-display font-bold text-foreground mb-2">Booking Confirmed!</h2>
    <p className="text-muted-foreground mb-8 max-w-xs">
      Your flight has been successfully booked.
    </p>
    
    <div className="bg-secondary/30 p-6 rounded-2xl w-full max-w-sm mb-8 text-left border border-border/50">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Ticket className="w-4 h-4 text-primary" /> Ticket Delivery
      </h3>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Available in App (Virtual Ticket)
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Sent to Email
        </li>
      </ul>
    </div>

    <div className="w-full space-y-3">
      <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20">
        View Ticket
      </Button>
      <Button variant="outline" className="w-full h-12">
        Back to Dashboard
      </Button>
    </div>
  </div>
);

export default function Flights() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"form" | "success">("form");
  const [tripType, setTripType] = useState("one-way");
  const [destType, setDestType] = useState("local");

  const handleBook = () => {
    // Simulate processing
    setTimeout(() => {
      setStep("success");
    }, 1500);
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
          <h1 className="text-xl font-display font-bold">Book Flight</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-md mx-auto w-full pb-24">
        
        {step === "form" && (
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-6 relative">
               <img src={flightHeroImage} alt="Flights" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <p className="text-white font-medium text-sm">Explore the world with Molada</p>
               </div>
            </div>

            {/* Trip Type Selection */}
            <div className="space-y-3">
              <Label>Trip Type</Label>
              <Tabs defaultValue="one-way" value={tripType} onValueChange={setTripType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Destination Type Selection */}
            <div className="space-y-3">
              <Label>Destination Type</Label>
              <Tabs defaultValue="local" value={destType} onValueChange={setDestType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Flight Details Form */}
            <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 text-primary">
                <Plane className="w-4 h-4" /> Flight Details
              </h3>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">From</Label>
                  <div className="relative">
                    <Input placeholder="City or Airport" className="pl-9" />
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">To</Label>
                   <div className="relative">
                    <Input placeholder="City or Airport" className="pl-9" />
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Date</Label>
                  <div className="relative">
                    <Input type="date" className="pl-9" />
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Passengers</Label>
                  <div className="relative">
                    <Input type="number" min="1" defaultValue="1" className="pl-9" />
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

               <div className="space-y-2 pt-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Class</Label>
                  <Select defaultValue="economy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business Class</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/25">
                    PAY NOW
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <PaymentOptionsDialog onConfirm={handleBook} />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full h-14 text-base border-primary/20 text-primary hover:bg-primary/5">
                    <Clock className="ml-2 w-4 h-4 mr-2" />
                    SET PURCHASE ORDER
                  </Button>
                </DialogTrigger>
                <PurchaseOrderDialog />
              </Dialog>
            </div>
          </div>
        )}

        {step === "success" && <SuccessStep />}

      </div>
    </div>
  );
}