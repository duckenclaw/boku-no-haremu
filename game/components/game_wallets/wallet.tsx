import cn from 'classnames'
import { useWax } from 'contexts/wax_context'
import { Image } from 'components/shared-ui/image'
import { useMemo } from 'react'
import s from './styles.module.scss'

type WalletProps = {
  className?: string
  type: 'wax' | 'anchor' | 'test'
}

const Wallet: React.FC<WalletProps> = ({ className, type }) => {
  const { isLoading: isLoadingWax, login } = useWax()

  const imageSrc = useMemo(() => {
    if (type === 'wax') {
      return '/game/svg/logo_wax.svg'
    }
    if (type === 'anchor') {
      return '/game/svg/logo_anchor.svg'
    }

    return null
  }, [type])

  const makeAction = () => {
    if (type === 'wax') {
      return login('waxjs')
    }
    if (type === 'anchor') {
      return login('anchor')
    }
    if (type === 'test') {
      return login('testnet')
    }
  }

  return (
    <button
      className={cn(className, s.wallet)}
      onClick={() => makeAction()}
      disabled={isLoadingWax}
    >
      {imageSrc && <Image className={s.walletLogo} src={imageSrc} alt="logo" />}
      <div className={s.walletTitle}>{`${type} wallet`}</div>
    </button>
  )
}

export { Wallet }
