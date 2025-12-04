import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Gift, 
  Trophy, 
  Star, 
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  Coins,
  Target,
  Users,
  Share2
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const dailyTasks = [
  { id: 1, title: "Login to app", points: 5, completed: true, icon: CheckCircle2 },
  { id: 2, title: "Make a transfer", points: 20, completed: true, icon: Zap },
  { id: 3, title: "Pay a bill", points: 15, completed: false, icon: Target },
  { id: 4, title: "Refer a friend", points: 100, completed: false, icon: Users },
];

const availableRewards = [
  { id: 1, title: "₦500 Airtime", points: 500, category: "Airtime", color: "bg-blue-500" },
  { id: 2, title: "₦1,000 Data Bundle", points: 900, category: "Data", color: "bg-green-500" },
  { id: 3, title: "Free Transfer", points: 150, category: "Transfer", color: "bg-purple-500" },
  { id: 4, title: "₦2,000 Cashback", points: 1800, category: "Cash", color: "bg-yellow-500" },
  { id: 5, title: "Premium Badge", points: 5000, category: "Badge", color: "bg-pink-500" },
  { id: 6, title: "₦5,000 Shopping Voucher", points: 4500, category: "Voucher", color: "bg-orange-500" },
];

const leaderboard = [
  { rank: 1, name: "Adebayo O.", points: 15420, avatar: "AO" },
  { rank: 2, name: "Chioma N.", points: 14850, avatar: "CN" },
  { rank: 3, name: "Ibrahim M.", points: 13200, avatar: "IM" },
  { rank: 4, name: "You", points: 2850, avatar: "JD", isUser: true },
  { rank: 5, name: "Fatima A.", points: 2100, avatar: "FA" },
];

export default function Rewards() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("earn");
  const totalPoints = 2850;
  const dailyProgress = 40;
  const streak = 7;

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
          <h1 className="text-lg sm:text-xl font-display font-bold">Rewards</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="bg-gradient-to-r from-primary to-purple-600 mx-4 mt-4 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-sm">Your Points</p>
            <div className="flex items-center gap-2">
              <Coins className="w-8 h-8" />
              <span className="text-4xl font-bold">{totalPoints.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
            <Zap className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">{streak} day streak</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Daily progress</span>
            <span>{dailyProgress}%</span>
          </div>
          <Progress value={dailyProgress} className="h-2 bg-white/20" />
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="earn">Earn</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
            <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          </TabsList>

          <TabsContent value="earn" className="space-y-6">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Daily Tasks
              </h3>
              <div className="space-y-3">
                {dailyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-card rounded-xl p-4 border flex items-center justify-between ${
                      task.completed ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.completed ? "bg-green-500/20 text-green-500" : "bg-primary/10 text-primary"
                      }`}>
                        {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <task.icon className="w-5 h-5" />}
                      </div>
                      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold">+{task.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Share2 className="w-6 h-6 text-pink-500" />
                <h3 className="font-bold text-lg">Refer & Earn</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Invite friends and earn 100 points for each successful referral!
              </p>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                Share Referral Link
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="redeem" className="space-y-4">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Available Rewards
            </h3>
            <div className="grid gap-4">
              {availableRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${reward.color} rounded-xl flex items-center justify-center text-white`}>
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold">{reward.title}</p>
                      <p className="text-xs text-muted-foreground">{reward.category}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={totalPoints >= reward.points ? "default" : "outline"}
                    disabled={totalPoints < reward.points}
                  >
                    <Coins className="w-3 h-3 mr-1" />
                    {reward.points}
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top Earners This Month
            </h3>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-xl p-4 border flex items-center gap-4 ${
                    user.isUser ? "bg-primary/10 border-primary" : "bg-card"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    user.rank === 1 ? "bg-yellow-500 text-white" :
                    user.rank === 2 ? "bg-gray-400 text-white" :
                    user.rank === 3 ? "bg-orange-400 text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Coins className="w-3 h-3 text-yellow-500" />
                      {user.points.toLocaleString()} points
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <Trophy className={`w-5 h-5 ${
                      user.rank === 1 ? "text-yellow-500" :
                      user.rank === 2 ? "text-gray-400" :
                      "text-orange-400"
                    }`} />
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
