import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import s from './resource.module.scss'

type ResourceProps = {
  balance: BalanceType
  sign?: 'none' | 'plus' | 'minus'
} & React.ComponentProps<'span'>

const currencyToImg = (c: string) => {
  switch (c.toLowerCase()) {
    default:
    case 'nya':
      return '/images/currencies/nyan.png'
    case 'cht':
      return '/images/currencies/crystal.png'
    case 'smp':
      return '/images/currencies/simptetix.png'
    case 'bnt':
      return '/images/currencies/bento.png'
  }
}

export const Resource = ({
  balance,
  className,
  sign = 'none',
  ...props
}: ResourceProps) => {
  return (
    <span {...props} className={cn(className, s.balance)}>
      <div className={s.image_container}>
        <Image
          className={s.image}
          alt={balance.currency}
          src={currencyToImg(balance.currency)}
        />
        {sign !== 'none' && <Sign className={s.sign} />}
      </div>

      {balance.balance.toFixed(0)}
    </span>
  )
}

type SignProps = {} & React.ComponentProps<'svg'>

const Sign = ({ ...props }: SignProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidyMid meet"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99992 0.833313C4.93534 0.833313 0.833252 4.9354 0.833252 9.99998C0.833252 15.0646 4.93534 19.1666 9.99992 19.1666C15.0645 19.1666 19.1666 15.0646 19.1666 9.99998C19.1666 4.9354 15.0645 0.833313 9.99992 0.833313ZM14.5833 10.9166H10.9166V14.5833H9.08325V10.9166H5.41659V9.08331H9.08325V5.41665H10.9166V9.08331H14.5833V10.9166Z"
      fill="url(#paint0_linear_1593_1893)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1593_1893"
        x1="9.99992"
        y1="0.833313"
        x2="9.99992"
        y2="19.1666"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6CCAF3" />
        <stop offset="0.505208" stopColor="#2E92BF" />
        <stop offset="1" stopColor="#00415E" />
      </linearGradient>
    </defs>
  </svg>
)
