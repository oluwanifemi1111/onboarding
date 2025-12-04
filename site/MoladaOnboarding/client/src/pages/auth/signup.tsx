import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImage from "@assets/generated_images/molada_pay_logo.png";

const signupSchema = z.object({
  surname: z.string().min(2, "Surname is required"),
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be max 16 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain symbol"),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      surname: "",
      firstName: "",
      middleName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    // In a real app, this would call an API
    console.log(values);
    // Navigate to email verification, passing the email in state if needed (mocking navigation)
    setLocation(`/verify-email?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle variant="outline" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logoImage} alt="Molada Pay" className="h-12 mx-auto mb-4 drop-shadow-sm" />
            <h1 className="text-2xl font-display font-bold text-foreground">Create Your Account</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
              Ensure your details match official documents for future verification.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Ray" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+234..." {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="bg-background/50 pr-10" 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        8-16 chars, uppercase, lowercase, number & symbol
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reconfirm Password</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="bg-background/50 pr-10" 
                          />
                           <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="MOLADA123" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/25">
                  SIGN UP
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-xs text-muted-foreground text-center leading-relaxed">
                To use services like fiat transfers, betting funding, or crypto exchange, KYC verification will be required.
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </div>

            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}