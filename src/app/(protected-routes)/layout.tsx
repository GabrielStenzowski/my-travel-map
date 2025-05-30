import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/AuthProvider'
import { CategoryProvider } from '@/providers/CategoryProvider'
import { PlaceProvider } from '@/providers/PlaceProvider'
import { ReactNode } from 'react'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <>
      <SidebarProvider>
        <AuthProvider>
          <PlaceProvider>
            <CategoryProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-6">
                      {children}
                    </div>
                  </div>
                </div>
              </SidebarInset>
            </CategoryProvider>
          </PlaceProvider>
        </AuthProvider>
      </SidebarProvider>
    </>
  )
}
