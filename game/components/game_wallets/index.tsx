import cn from 'classnames'
import { ScreenTitle } from 'game/components/screen_title'
import { Wallet } from './wallet'
import s from './styles.module.scss'
import { BlurContainer } from '../blur_container'

type WalletsProps = {
  className?: string
}

const Wallets: React.FC<WalletsProps> = ({ className }) => {
  return (
    <BlurContainer className={cn(className, s.container)}>
      <ScreenTitle className={s.title}>Select wallet</ScreenTitle>
      <div className={s.wallets}>
        <Wallet type="wax" />
        <Wallet type="anchor" />
        {process.env.NEXT_PUBLIC_TESTNET === 'true' && <Wallet type="test" />}
      </div>
    </BlurContainer>
  )
}

export { Wallets }
