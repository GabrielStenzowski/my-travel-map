'use client'

import * as React from 'react'
import {
  IconMapRoute,
  IconMapPinPlus, // para cadastrar lugar
  IconListSearch,
} from '@tabler/icons-react'

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
import { useEffect, useState } from 'react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserName(localStorage.getItem('user-name') || 'User Loagind')
      setUserEmail(localStorage.getItem('user-email') || 'user.mail.loading')
    }
  }, [])

  const data = {
    user: {
      name: userName,
      email: userEmail,
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Cadastrar Lugar',
        url: 'register-place',
        icon: IconMapPinPlus,
      },
      {
        title: 'Listar Lugares',
        url: 'list-places',
        icon: IconListSearch,
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
              <a href="home-page">
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
