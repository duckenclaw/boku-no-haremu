import cn from 'classnames'
import s from './styles.module.scss'
import { Image } from 'components/shared-ui/image'

type WalletProps = {
  className?: string
  title: string
  action: () => void
  disabled?: boolean
  logoSrc?: string
}

const Wallet: React.FC<WalletProps> = ({
  className,
  title,
  logoSrc,
  action,
  disabled = false,
}) => {
  return (
    <button
      className={cn(className, s.wallet)}
      onClick={action}
      disabled={disabled}
    >
      {logoSrc && <Image className={s.walletLogo} src={logoSrc} alt="logo" />}
      <div className={s.walletTitle}>{title}</div>
    </button>
  )
}

export { Wallet }
