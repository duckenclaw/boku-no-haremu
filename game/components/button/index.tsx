import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
} from 'react'
import cn from 'classnames'

import s from './button.module.scss'

type BaseButtonProps = {
  size?: 'medium' | 'small' | 'xsmall'
  color?: 'purple' | 'blue' | 'darkblue'
}

type ButtonProps = BaseButtonProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = ({
  children,
  className,
  size = 'medium',
  color = 'purple',
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={cn(s.button, className, { [s[size]]: true, [s[color]]: true })}
    >
      {children}
    </button>
  )
}

type LinkButtonProps = BaseButtonProps & React.ComponentProps<'a'>

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ size, color, children, ...props }, ref) => {
    return (
      <a {...props} ref={ref}>
        <Button size={size} color={color}>
          {children}
        </Button>
      </a>
    )
  }
)

LinkButton.displayName = 'LinkButton'

type SkewButtonProps = {
  mirror?: boolean
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const SkewButton = ({
  className,
  children,
  disabled,
  onClick,
  mirror,
  ...props
}: SkewButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={cn(className, s.skew_button, { [s.mirror]: mirror })}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}
