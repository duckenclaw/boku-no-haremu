import classNames from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import s from './button.module.scss'

type ButtonProps = {
  className?: string
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => (
  <button {...props} className={classNames(className, s.button)} type="button">
    {children}
  </button>
)
