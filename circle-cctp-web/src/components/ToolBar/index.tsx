import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Image } from 'antd-mobile'

import { routes } from '../../pages/Router'

const ToolBar: React.FC<{}> = () => {
  const [active, setActive] = useState(0)
  return (
    <>
      <div
        style={{
          backgroundColor: 'rgba(217, 217, 217, 0.55)',
          zIndex: 999,
          position: 'fixed',
          bottom: 0,
        }}
        className="h-42 flex w-full justify-between px-2"
      >
        {routes
          .filter((i) => i.nav)
          .map((route, ind) => (
            <Link to={route.path} key={route.label}>
              <div
                className="flex flex-1 flex-col items-center justify-center py-2"
                onClick={() => setActive(ind)}
              >
                <Image src={route.icon} className="h-18 mb-2 w-20 px-4" />
                <div
                  style={{ color: active === ind ? '#1b3c51' : 'white' }}
                  className="text-center text-xl"
                >
                  {route.description}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default ToolBar
