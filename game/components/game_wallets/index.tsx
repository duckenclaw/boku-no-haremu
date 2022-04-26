import cn from 'classnames'
import { useWax } from 'contexts/wax_context'
import { ScreenTitle } from 'game/components/screen_title'
import { Wallet } from './wallet'
import s from './styles.module.scss'
import { BlurContainer } from '../blur_container'

type WalletsProps = {
  className?: string
}

const Wallets: React.FC<WalletsProps> = ({ className }) => {
  const { isLoading: isLoadingWax, login } = useWax()
  return (
    <BlurContainer className={cn(className, s.container)}>
      <ScreenTitle className={s.title}>Select wallet</ScreenTitle>
      <div className={s.wallets}>
        <Wallet
          title="wax wallet"
          logoSrc="game/svg/logo_wax.svg"
          action={() => login('waxjs')}
          disabled={isLoadingWax}
        />
        <Wallet
          title="anchor wallet"
          logoSrc="game/svg/logo_anchor.svg"
          action={() => login('anchor')}
          disabled={isLoadingWax}
        />
        {process.env.NEXT_PUBLIC_TESTNET === 'true' && (
          <Wallet title="Login Testnet" action={() => login('testnet')} />
        )}
      </div>
    </BlurContainer>
  )
}

export { Wallets }
