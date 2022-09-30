import Input from "@/slots/Input"
export default function CanvasPanel() {
  const [Comp, data] = Input()
  console.log(Comp, data)
  return (
    <div w-800px border-3px>
      abc
     {{ Comp }}
    </div>
  )
}

