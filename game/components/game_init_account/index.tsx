import cn from 'classnames'
import s from './init_account.module.scss'
import { Button } from 'game/components/button'
import { BlurContainer } from 'game/components/blur_container'
import { ScreenTitle } from 'game/components/screen_title'
import { useInitAccount } from 'game/game_api'

type InitAccountProps = {
  className?: string
}

const InitAccount: React.FC<InitAccountProps> = ({ className }) => {
  const { mutateAsync: initAccount, isLoading } = useInitAccount()

  return (
    <BlurContainer className={cn(className, s.container)}>
      <ScreenTitle className={s.title}>
        initialize your game account
      </ScreenTitle>
      <div className={s.subtitle}>
        this is a one time transaction <br /> to create your account in our game
      </div>

      <Button
        className={s.initButton}
        onClick={() => initAccount()}
        disabled={isLoading}
        size="medium"
        color="blue"
      >
        init Game Account
      </Button>
    </BlurContainer>
  )
}

export { InitAccount }
