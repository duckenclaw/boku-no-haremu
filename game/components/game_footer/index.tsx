import classNames from 'classnames'
import { GameRoutes, GameState, useGame } from 'game/game_context'

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
      <nav className={s.nav_list}>
        {GameRoutes.map((s) => (
          <ScreenLink screen={s} key={s}>
            {s.toUpperCase()}
          </ScreenLink>
        ))}
      </nav>
    </footer>
  )
}
