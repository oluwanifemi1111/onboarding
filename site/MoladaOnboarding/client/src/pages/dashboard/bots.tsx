import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Bot, 
  Zap, 
  Settings, 
  Play, 
  Pause,
  TrendingUp,
  Clock,
  DollarSign,
  AlertCircle,
  Plus,
  ChevronRight,
  Activity,
  BarChart3
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";

const activeBots = [
  {
    id: 1,
    name: "Savings Automator",
    description: "Automatically saves 10% of every transfer received",
    status: "active",
    icon: DollarSign,
    color: "bg-green-500",
    stats: { saved: 45000, transactions: 23 }
  },
  {
    id: 2,
    name: "Bill Reminder",
    description: "Reminds you 3 days before bill due dates",
    status: "active",
    icon: Clock,
    color: "bg-blue-500",
    stats: { reminders: 12, paid: 8 }
  },
  {
    id: 3,
    name: "Round-Up Bot",
    description: "Rounds up transactions and saves the difference",
    status: "paused",
    icon: TrendingUp,
    color: "bg-purple-500",
    stats: { saved: 3200, transactions: 45 }
  },
];

const availableBots = [
  {
    id: 4,
    name: "Expense Tracker",
    description: "Categorizes and tracks all your expenses automatically",
    icon: BarChart3,
    color: "bg-orange-500",
    premium: false
  },
  {
    id: 5,
    name: "Smart Budgeter",
    description: "AI-powered budget suggestions based on spending patterns",
    icon: Activity,
    color: "bg-pink-500",
    premium: true
  },
  {
    id: 6,
    name: "Investment Advisor",
    description: "Get AI recommendations for crypto and stock investments",
    icon: TrendingUp,
    color: "bg-indigo-500",
    premium: true
  },
];

const botActivity = [
  { time: "2 mins ago", action: "Savings Bot saved ₦500 from transfer", type: "save" },
  { time: "1 hour ago", action: "Bill Reminder: Electricity bill due in 3 days", type: "reminder" },
  { time: "3 hours ago", action: "Round-Up saved ₦45 from ₦1,955 transaction", type: "save" },
  { time: "Yesterday", action: "Weekly expense report generated", type: "report" },
];

export default function Bots() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("my-bots");
  const [botStates, setBotStates] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false
  });

  const toggleBot = (id: number) => {
    setBotStates(prev => ({ ...prev, [id]: !prev[id] }));
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
          <h1 className="text-lg sm:text-xl font-display font-bold">AI Bots</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 mx-4 mt-4 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="w-8 h-8" />
          <div>
            <h2 className="font-bold text-lg">Smart Automation</h2>
            <p className="text-white/80 text-sm">Let AI manage your finances</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs">Active Bots</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">₦48k</p>
            <p className="text-xs">Total Saved</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">68</p>
            <p className="text-xs">Actions</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="my-bots">My Bots</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="my-bots" className="space-y-4">
            {activeBots.map((bot, index) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${bot.color} rounded-xl flex items-center justify-center text-white`}>
                      <bot.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{bot.name}</h3>
                      <p className="text-xs text-muted-foreground">{bot.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={botStates[bot.id]}
                    onCheckedChange={() => toggleBot(bot.id)}
                  />
                </div>
                <div className="flex gap-4 text-sm">
                  {bot.stats.saved !== undefined && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      ₦{bot.stats.saved.toLocaleString()} saved
                    </div>
                  )}
                  {bot.stats.transactions !== undefined && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Activity className="w-3 h-3" />
                      {bot.stats.transactions} transactions
                    </div>
                  )}
                  {bot.stats.reminders !== undefined && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {bot.stats.reminders} reminders
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="discover" className="space-y-4">
            <p className="text-muted-foreground text-sm mb-4">
              Discover new bots to automate your financial tasks
            </p>
            {availableBots.map((bot, index) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${bot.color} rounded-xl flex items-center justify-center text-white`}>
                    <bot.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{bot.name}</h3>
                      {bot.premium && (
                        <span className="bg-yellow-500/20 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{bot.description}</p>
                  </div>
                </div>
                <Button size="sm" variant={bot.premium ? "outline" : "default"}>
                  <Plus className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <h3 className="font-bold mb-4">Recent Bot Activity</h3>
            <div className="space-y-3">
              {botActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 border flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === "save" ? "bg-green-500/20 text-green-500" :
                    activity.type === "reminder" ? "bg-blue-500/20 text-blue-500" :
                    "bg-purple-500/20 text-purple-500"
                  }`}>
                    {activity.type === "save" ? <DollarSign className="w-4 h-4" /> :
                     activity.type === "reminder" ? <Clock className="w-4 h-4" /> :
                     <BarChart3 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
