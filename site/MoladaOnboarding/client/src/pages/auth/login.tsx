import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Fingerprint, ScanFace, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // Mock login success
    // alert("Logged in successfully!");
    setLocation("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle variant="outline" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-[-50px] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logoImage} alt="Molada Pay" className="h-16 mx-auto mb-6 drop-shadow-sm" />
            <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Enter your details to access your account.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} className="bg-background/50 h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          className="bg-background/50 h-12 pr-10" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <div className="flex justify-end mt-2">
                       <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                        Forgot Password?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 space-y-4">
                <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/25">
                  LOGIN
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <div className="relative flex items-center justify-center py-2">
                   <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/60"></div>
                   </div>
                   <span className="relative bg-card px-2 text-xs text-muted-foreground uppercase">Or continue with</span>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all text-foreground"
                  onClick={() => alert("Biometric authentication triggered")}
                >
                  <Fingerprint className="w-5 h-5 mr-2 text-primary" />
                  <ScanFace className="w-5 h-5 mr-2 text-primary" />
                  Use Biometric / Face ID
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary font-bold hover:underline">
                    Sign Up
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