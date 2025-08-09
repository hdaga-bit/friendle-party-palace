import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <span className="font-display text-2xl leading-none">Friendle</span>
      <span className="inline-flex items-center justify-center rounded-full px-2 py-1 text-sm font-semibold text-accent-foreground" style={{background: "var(--gradient-primary)"}}>Plus</span>
    </div>
  );
}

export default Logo;
