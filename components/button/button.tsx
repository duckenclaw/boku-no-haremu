import classNames from 'classnames'
import s from './button.module.scss'

type ButtonProps = {
  className?: string
  title?: string
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({
  className,
  title,
  onClick,
}) => (
  <button
    className={classNames(className, s.button)}
    onClick={() => {
      onClick()
    }}
  >
    {title}
  </button>
)
