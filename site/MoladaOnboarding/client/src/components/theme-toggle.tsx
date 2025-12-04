import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline";
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({ 
  variant = "ghost", 
  className = "",
  iconClassName = "w-5 h-5"
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full relative overflow-hidden ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === "dark" ? 180 : 0,
          scale: resolvedTheme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className={iconClassName} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === "dark" ? 0 : -180,
          scale: resolvedTheme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className={iconClassName} />
      </motion.div>
    </Button>
  );
}

export function ThemeTogglePill({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div 
      className={`relative flex items-center gap-1 p-1 rounded-full bg-muted border border-border cursor-pointer ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-primary"
        initial={false}
        animate={{
          x: isDark ? 36 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <div className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${!isDark ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
        <Sun className="w-4 h-4" />
      </div>
      <div className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
        <Moon className="w-4 h-4" />
      </div>
    </div>
  );
}
