import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
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

type ToggleProps = {
  isLeft?: boolean
  onChange?: (isLeft: boolean) => void
  className?: string
  leftLabel?: string
  rightLabel?: string
}

export const Toggle = ({
  isLeft = false,
  onChange,
  className,
  leftLabel,
  rightLabel,
}: ToggleProps) => {
  const { left, color, colorReverse } = useSpring({
    to: {
      left: isLeft ? '0%' : '50%',
      color: isLeft ? '#fff' : '#479EC5',
      colorReverse: isLeft ? '#479EC5' : '#fff',
    },
  })
  return (
    <div
      className={cn(s.toggle, className)}
      onClick={() => onChange?.(!isLeft)}
    >
      <AnimatedBox style={{ left }} className={s.back} />
      <animated.div style={{ color }} className={s.option}>
        {leftLabel}
      </animated.div>
      <animated.div className={s.option} style={{ color: colorReverse }}>
        {rightLabel}
      </animated.div>
    </div>
  )
}

type AnimatedBoxProps = {
  style?: any
  className?: string
}

const AnimatedBox = ({ style, className }: AnimatedBoxProps) => (
  <animated.svg
    className={className}
    style={style}
    viewBox="0 0 277 48"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b_3640_920)">
      <rect
        y="48"
        width="48"
        height="277"
        rx="12"
        transform="rotate(-90 0 48)"
        fill="url(#paint0_linear_3640_920)"
      />
      <rect
        x="3"
        y="45"
        width="42"
        height="271"
        rx="9"
        transform="rotate(-90 3 45)"
        stroke="url(#paint1_radial_3640_920)"
        strokeOpacity="0.4"
        strokeWidth="6"
      />
      <rect
        x="3"
        y="45"
        width="42"
        height="271"
        rx="9"
        transform="rotate(-90 3 45)"
        stroke="url(#paint2_radial_3640_920)"
        strokeOpacity="0.4"
        strokeWidth="6"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_3640_920"
        x="-40"
        y="-40"
        width="357"
        height="128"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="20" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3640_920"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3640_920"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_3640_920"
        x1="24"
        y1="48"
        x2="24"
        y2="325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6CCAF3" />
        <stop offset="0.505208" stopColor="#2E92BF" />
        <stop offset="1" stopColor="#00415E" />
      </linearGradient>
      <radialGradient
        id="paint1_radial_3640_920"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-6.60234 13.7505) rotate(79.1812) scale(205.545 150.048)"
      >
        <stop stopColor="#98F9FF" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_3640_920"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(51.9739 359.85) rotate(-99.2002) scale(226.436 130.701)"
      >
        <stop stopColor="#A5EFFF" />
        <stop offset="1" stopColor="#479EC5" stopOpacity="0.69" />
      </radialGradient>
    </defs>
  </animated.svg>
)
