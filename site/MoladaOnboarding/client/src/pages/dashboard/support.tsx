import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  HeadphonesIcon, 
  MessageCircle, 
  Phone, 
  Mail,
  FileText,
  ChevronRight,
  Search,
  Send,
  Bot,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const faqCategories = [
  { id: "account", title: "Account & Security", icon: AlertCircle, count: 12 },
  { id: "transfers", title: "Transfers & Payments", icon: Send, count: 15 },
  { id: "bills", title: "Bill Payments", icon: FileText, count: 8 },
  { id: "crypto", title: "Crypto & Wallets", icon: Bot, count: 10 },
];

const popularFaqs = [
  { q: "How do I reset my password?", a: "Go to Settings > Security > Change Password. You'll need to verify your identity via email or phone." },
  { q: "Why is my transfer pending?", a: "Transfers can take up to 24 hours during peak times. If it exceeds this, please contact support." },
  { q: "How do I verify my account?", a: "Complete KYC by uploading your valid ID and taking a selfie. Verification usually takes 1-2 hours." },
  { q: "What are the transfer limits?", a: "Unverified accounts: ₦50,000/day. Verified accounts: ₦5,000,000/day. Premium: Unlimited." },
];

const tickets = [
  { id: "TKT-001", subject: "Transfer delayed", status: "resolved", date: "2 days ago" },
  { id: "TKT-002", subject: "Account verification issue", status: "open", date: "1 day ago" },
];

export default function Support() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Hello! I'm MOLADA AI Assistant. How can I help you today?" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages(prev => [...prev, { type: "user", message: newMessage }]);
    setNewMessage("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: "bot",
        message: "Thank you for your message. Our team will get back to you shortly. In the meantime, you can check our FAQ section for quick answers."
      }]);
    }, 1000);
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
          <h1 className="text-lg sm:text-xl font-display font-bold">Support</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="help">Help Center</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="help" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className="bg-card rounded-xl p-4 border text-left hover:border-primary transition-colors"
                  >
                    <cat.icon className="w-6 h-6 text-primary mb-2" />
                    <p className="font-medium text-sm">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Popular Questions</h3>
              <div className="space-y-3">
                {popularFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-xl border overflow-hidden"
                  >
                    <button
                      className="w-full p-4 flex items-center justify-between text-left"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span className="font-medium text-sm pr-4">{faq.q}</span>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedFaq === index ? "rotate-90" : ""
                      }`} />
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-4 pb-4 text-sm text-muted-foreground"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold mb-2">Need more help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our support team directly
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="h-[60vh] flex flex-col">
            <div className="flex-1 bg-card rounded-2xl border p-4 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {msg.type === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">My Support Tickets</h3>
              <Button size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </div>

            {tickets.length > 0 ? (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-card rounded-xl p-4 border flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          ticket.status === "resolved" 
                            ? "bg-green-500/20 text-green-600" 
                            : "bg-yellow-500/20 text-yellow-600"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HeadphonesIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No support tickets yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
