import classNames from 'classnames'
import s from './button.module.scss'

type ButtonProps = {
  className?: string
  title?: string
  handler: () => void
}

export const Button: React.FC<ButtonProps> = ({
  className,
  title,
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
