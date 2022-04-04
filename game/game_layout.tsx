import s from './game_component.module.scss'

export const GameLayout: React.FC = ({ children }) => (
  <div className={s.layout}>{children}</div>
)
