import AppShell from "@/components/shell/AppShell";

/** Authenticated shell for /dashboard, /basics, /core, /notes, /tools, /community. */
export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
