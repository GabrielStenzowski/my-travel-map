'use client'

import * as React from 'react'
import { IconMapRoute, IconUsers } from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userName = localStorage.getItem('user-name')
  const userEmail = localStorage.getItem('user-email')
  const data = {
    user: {
      name: userName,
      email: userEmail,
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Cadastrar Lugar',
        url: '/protected-routes/register-place',
        icon: IconUsers,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/protected-routes/home-page">
                <IconMapRoute className="!size-5" />
                <span className="text-base font-semibold">My Travel Map.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
