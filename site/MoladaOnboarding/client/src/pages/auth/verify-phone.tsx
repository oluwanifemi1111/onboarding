import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Smartphone, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ThemeToggle } from "@/components/theme-toggle";

export default function VerifyPhone() {
  const [, setLocation] = useLocation();
  const phone = "+234 80 XXX XXXX"; // Mock phone number
  
  const [value, setValue] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleComplete = (code: string) => {
    console.log("Phone Verification Code:", code);
    // Mock success
    setIsSuccess(true);
    setTimeout(() => {
      // Redirect to login or dashboard
      setLocation("/login");
    }, 2000);
  };

  const handleResend = () => {
    setIsResendDisabled(true);
    setCountdown(30);
    console.log("Resending SMS...");
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Verification Complete!</h2>
          <p className="text-muted-foreground">Your account has been successfully created.</p>
          <p className="text-sm text-primary mt-4 animate-pulse">Redirecting to Login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
       {/* Theme Toggle */}
       <div className="absolute top-4 right-4 z-20">
         <ThemeToggle variant="outline" />
       </div>
       
       {/* Background Elements */}
       <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 text-center">
          
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Smartphone size={32} />
          </div>

          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Verify Phone Number</h1>
          <p className="text-muted-foreground mb-1">
            We sent an SMS code to
          </p>
          <p className="font-medium text-foreground mb-8">{phone}</p>

          <div className="flex justify-center mb-8">
            <InputOTP maxLength={6} value={value} onChange={setValue} onComplete={handleComplete}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-10 sm:w-12 border-primary/20" />
                <InputOTPSlot index={1} className="h-12 w-10 sm:w-12 border-primary/20" />
                <InputOTPSlot index={2} className="h-12 w-10 sm:w-12 border-primary/20" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="h-12 w-10 sm:w-12 border-primary/20" />
                <InputOTPSlot index={4} className="h-12 w-10 sm:w-12 border-primary/20" />
                <InputOTPSlot index={5} className="h-12 w-10 sm:w-12 border-primary/20" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2 text-sm">
               <button 
                onClick={() => window.history.back()}
                className="text-primary hover:underline font-medium"
              >
                Edit number
              </button>
              
              <button 
                onClick={handleResend}
                disabled={isResendDisabled}
                className="text-muted-foreground hover:text-foreground disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isResendDisabled ? `Resend code in ${countdown}s` : "Didn't get code?"}
                {!isResendDisabled && <RefreshCw size={14} />}
              </button>
            </div>
          </div>

          {value.length === 6 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Button 
                className="w-full h-12 text-lg shadow-lg shadow-primary/25"
                onClick={() => handleComplete(value)}
              >
                VERIFY
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}