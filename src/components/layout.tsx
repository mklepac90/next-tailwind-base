import { SiteHeader } from "@/components/site-header"
import Footer from "./footer"
import Sidebar from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />

      <main className="flex flex-row">
        <Sidebar />

        <div className="flex-grow">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
