/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from 'layouts/AppLayout'

import { IosAppsIcon, SettingsIcon, WalletIcon } from '../assets'

import { Demand, Home, NotFound, Settings } from './index'

export interface RouteConfig {
  path: string
  label: string
  component: React.FC<any>
  nav: boolean
  icon?: string
  description?: string
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Home',
    component: Home,
    nav: true,
    icon: WalletIcon,
    description: 'Wallet',
  },
  {
    path: '/demand',
    label: 'Demand',
    component: Demand,
    nav: true,
    icon: IosAppsIcon,
    description: 'Demand',
  },
  {
    path: '/settings',
    label: 'Settings',
    component: Settings,
    nav: true,
    icon: SettingsIcon,
    description: 'Settings',
  },
  {
    path: '/*',
    label: 'NotFound',
    component: NotFound,
    nav: false,
    description: 'NotFound',
  },
]

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.component
        return <Route key={route.path} path={route.path} element={<Page />} />
      })}
    </Routes>
  )
}

function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  )
}

export default Router
