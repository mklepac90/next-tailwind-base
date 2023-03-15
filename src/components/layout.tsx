import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
