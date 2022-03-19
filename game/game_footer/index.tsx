import classNames from 'classnames'
import { GameState, useGame } from 'game/game_context'

import s from './game_footer.module.scss'

type ScreenLinkProps = {
  screen: GameState['screen']
  disabled?: boolean
}

const ScreenLink: React.FC<ScreenLinkProps> = ({
  screen,
  children,
  disabled,
}) => {
  const { dispatch, screen: activeScreen } = useGame()
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        !disabled && dispatch({ screen, type: 'setScreen' })
      }}
      className={classNames(s.link, {
        [s.active]: activeScreen === screen,
        [s.disabled]: disabled,
      })}
    >
      {children}
    </a>
  )
}

export const GameFooter = () => {
  return (
    <footer className={s.footer}>
      <nav className={s.navList}>
        <ScreenLink screen="mine">MINE </ScreenLink>
        <ScreenLink screen="craft" disabled>
          CRAFT
        </ScreenLink>
        <ScreenLink screen="fusion" disabled>
          FUSION
        </ScreenLink>
        <ScreenLink screen="withdraw" disabled>
          WITHDRAW
        </ScreenLink>
        <ScreenLink screen="convert" disabled>
          CONVERT
        </ScreenLink>
      </nav>
    </footer>
  )
}
