import cn from 'classnames'
import ReactSlider from 'react-slider'
import s from './slider.module.scss'

type SliderProps = {
  className?: string
} & React.ComponentProps<typeof ReactSlider>

const Slider: React.FC<SliderProps> = ({ className, ...restProps }) => {
  return (
    <ReactSlider
      className={cn(s.slider, className)}
      thumbClassName={s.sliderThumb}
      trackClassName={s.sliderTrack}
      {...restProps}
    />
  )
}

export { Slider }
