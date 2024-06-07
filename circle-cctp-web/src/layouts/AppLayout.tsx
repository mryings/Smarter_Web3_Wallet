import ToolBar from 'components/ToolBar'
import PageLayout from 'layouts/PageLayout'
import { useAccount, useNetwork } from 'wagmi'
import { GreenBg, HomeBg } from '../assets'
import { isSupportedNetwork } from 'utils'
import { useEffect } from 'react'
import { Toast } from 'antd-mobile'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const isLogin = isConnected && isSupportedNetwork(chain?.id)
  useEffect(() => {
    !isSupportedNetwork(chain?.id) &&
      Toast.show({ content: 'Unsupported Chain!' })
  }, [chain?.id])
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage: `url(${isLogin ? GreenBg : HomeBg})`,
        backgroundSize: 'cover',
      }}
    >
      <main className="flex-1">
        <PageLayout>{children}</PageLayout>
      </main>
      <ToolBar />
    </div>
  )
}

export default AppLayout
