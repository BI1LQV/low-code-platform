/* eslint-disable react/jsx-key */
export default function Input() {
  return [(
    <div>
      <input type="text" />
      abc123
    </div>
  ), { a: 1 }] as [JSX.Element, any]
}

