import classNames from 'classnames'
import s from './button.module.scss'

type ButtonProps = {
  className?: string
  handler: () => void
}

export const Button: React.FC<ButtonProps> = ({
  className,
  handler,
  children,
}) => (
  <button
    className={classNames(className, s.button)}
    onClick={handler}
    type="button"
  >
    {children}
  </button>
)
