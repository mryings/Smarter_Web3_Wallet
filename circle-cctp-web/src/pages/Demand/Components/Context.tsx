import { Button } from 'antd-mobile'
import '../style.css'

interface Ops {
  type: string
  source_chain: string
  token: string
  amount: string
  receiver: string
  target_chain: string
}

interface ContextProp {
  text: string
  type?: string
  button?: boolean
  confirmTx: (op: Ops) => void
  op: Ops
}

const Context = (props: ContextProp) => {
  const handleConfirm = () => {
    props.confirmTx(props.op)
  }
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className={`m-1 inline-block max-w-full text-lg text-[#053346CC] ${
          props.type === 'response' ? 'rounded-r-lg' : 'rounded-l-lg'
        } p-2
        ${
          props.type === 'response' ? 'ml-auto' : 'mr-auto'
        } max-w-full overflow-auto break-words

        ${props.type === 'response' ? 'bg-[#1e83a54d]' : 'bg-[#73c5dd4d]'}
        `}
      >
        {props.text}
      </div>
      {props.button && (
        <div className="flex flex-col sm:flex-row">
          <Button
            className="demand-button"
            style={{ backgroundColor: 'white' }}
          >
            Change
          </Button>
          <Button
            className="demand-button"
            style={{ backgroundColor: 'white' }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  )
}

export default Context
