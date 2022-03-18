import { useWax } from 'contexts/wax_context'

export const GameHeader = () => {
  const { wax } = useWax()
  return (
    <header>
      <div>{wax?.userAccount}</div>
      <div>
        <div>res 0</div>
        <div>res 0</div>
        <div>res 0</div>
        <div>res 0</div>
        <div>I</div>
      </div>
    </header>
  )
}
