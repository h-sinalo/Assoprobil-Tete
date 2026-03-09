import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Painel Administrativo | ASSOPROBIL Tete",
    template: "%s | Admin ASSOPROBIL",
  },
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col lg:ml-64">
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
