import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Onboarding from "@/pages/onboarding";
import Signup from "@/pages/auth/signup";
import Login from "@/pages/auth/login";
import VerifyEmail from "@/pages/auth/verify-email";
import VerifyPhone from "@/pages/auth/verify-phone";
import Dashboard from "@/pages/dashboard/home";
import Transfer from "@/pages/dashboard/transfer";
import Flights from "@/pages/dashboard/flights";
import BillPayment from "@/pages/dashboard/bill-payment";
import RechargePins from "@/pages/dashboard/recharge-pins";
import BulkSms from "@/pages/dashboard/bulk-sms";
import Rewards from "@/pages/dashboard/rewards";
import Bots from "@/pages/dashboard/bots";
import Support from "@/pages/dashboard/support";
import SocialMedia from "@/pages/dashboard/social-media";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/verify-phone" component={VerifyPhone} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/transfer" component={Transfer} />
      <Route path="/flights" component={Flights} />
      <Route path="/bills" component={BillPayment} />
      <Route path="/pins" component={RechargePins} />
      <Route path="/sms" component={BulkSms} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/bots" component={Bots} />
      <Route path="/support" component={Support} />
      <Route path="/socials" component={SocialMedia} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
