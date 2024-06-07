import React, { ReactNode } from 'react'
import { Avatar, Space } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'

type Props = {
  iconSrc: string
  iconSize: number
  title: string
  description: string
  extra?: ReactNode
}

const BaseListItem: React.FC<Props> = ({
  iconSrc,
  iconSize,
  title,
  description,
  extra,
}) => {
  const handleDetailClick = () => {
    // console.log('clicked')
  }
  return (
    <>
      <Space block direction="vertical" className=" p-4">
        <div className="flex items-center">
          <Avatar
            src={iconSrc}
            className={`h-[${iconSize}px] w-[${iconSize}px] rounded-[${
              iconSize / 2
            }px]`}
          />
          {extra !== undefined ? (
            <div className="ml-4 flex flex-1 justify-between">
              <div className="flex-1 text-left">
                <p className="text-lg font-semibold text-circle-green">
                  {title}
                </p>
                <p className="text-sm  text-licorice-600">{description}</p>
              </div>
              <div className="flex-1 text-right">{extra}</div>
              <RightOutline
                onClick={handleDetailClick}
                className="my-auto ml-2 text-2xl"
                style={{ color: 'rgb(103 232 249)' }}
              />
            </div>
          ) : (
            <div className="ml-4">
              <p className="text-lg font-semibold text-circle-green">{title}</p>
              <p className="text-sm  text-licorice-600">{description}</p>
            </div>
          )}
        </div>
      </Space>
    </>
  )
}

export default BaseListItem
