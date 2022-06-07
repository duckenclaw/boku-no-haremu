import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import { Loader } from 'components/shared-ui/loader'
import { CardImage } from 'game/components/card_image'
import { ConfirmModal } from 'game/components/confirm_modal'
import { Slider } from 'game/components/slider'
import { RESOURCES } from 'game/constants'
import { useGame } from 'game/game_context'
import { Duration } from 'luxon'
import IconInfo from 'public/game/svg/icon_info.svg'
import { useMemo, useState } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import s from './mine.module.scss'

type MineModalProps = {
  className?: string
  isOpen?: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: (value?: number) => Promise<void>
  cardData?: { [key: string]: string }
  mineRecipe?: MiningRecipeRecordType
}

const MineModal: React.FC<MineModalProps> = ({
  className,
  cardData,
  mineRecipe,
  isOpen,
  onClose,
  isLoading,
  onConfirm,
}) => {
  const [riskValueIndex, setRiskValueIndex] = useState(0)
  const { reward_precision, multiplier_to_risk } = useGame()

  const sortedRiskValues = useMemo(
    () => Object.values(multiplier_to_risk).sort((a, b) => a.key - b.key),
    [multiplier_to_risk]
  )

  const currentResource = useMemo(
    () =>
      RESOURCES.find(
        (item) => item.apiName === mineRecipe?.mined_resource.currency
      ),
    [mineRecipe?.mined_resource.currency]
  )

  const riskValue = Number(
    (100 - Number(sortedRiskValues[riskValueIndex].value)).toFixed(1)
  )
  const xValue = Number(
    Number(sortedRiskValues[riskValueIndex].key / reward_precision).toFixed(1)
  )
  const productionValue = mineRecipe?.mined_resource.balance
    ? Number((Number(mineRecipe?.mined_resource.balance) * xValue).toFixed(1))
    : '??'

  const [name, lvl] = cardData?.name ? cardData?.name.split(' ') : ['??', '??']

  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={() =>
        onConfirm(sortedRiskValues[riskValueIndex].key).finally(() =>
          setRiskValueIndex(0)
        )
      }
      onClose={() => {
        setRiskValueIndex(0)
        onClose()
      }}
      dialogChildren={
        <p className={s.dialogChildren}>
          “Are you sure you want to mine her Senpai? You will get{' '}
          <span>{productionValue}</span> {currentResource?.name}. Your risk is{' '}
          {riskValue}% {100 - riskValue}% chance that you will get the
          resources.”
        </p>
      }
      title="you are going to mine"
    >
      <div className={cn(className, s.modal)}>
        <Loader isLoading={isLoading}>
          <div className={s.imageContainer}>
            <CardImage
              className={s.image}
              src={[ipfsToS3Url(cardData?.img), ipfsToUrlSafe(cardData?.img)]}
            />
            <div className={s.imageInfo}>
              <div className={s.timeTitle}>time to mine</div>
              <div className={s.time}>
                {Duration.fromObject({
                  seconds: mineRecipe?.mining_time,
                }).toFormat('hh:mm:ss')}
              </div>
            </div>
          </div>
          <div className={s.info}>
            <div className={s.title}>
              <span className={s.name}>{name}</span>
              <span className={s.lvl}>{lvl} lvl</span>
            </div>
            <div className={s.row}>
              <div className={s.subtitle}>
                Production
                <IconInfo className={s.iconInfo} />
              </div>
              <div className={s.content}>
                <div className={s.resourceItem}>
                  <Image
                    className={s.resourceIcon}
                    alt="nyan"
                    mode="none"
                    src={currentResource?.image || ''}
                  />
                  <div className={s.digit}>{productionValue}</div>
                </div>
              </div>
            </div>
            <div className={s.row}>
              <div className={s.subtitle}>
                Cost <IconInfo className={s.iconInfo} />
              </div>
              <div className={s.content}>
                {mineRecipe?.cost.map((cost) => (
                  <div className={s.resourceItem} key={cost.currency}>
                    <Image
                      className={s.resourceIcon}
                      alt="nyan"
                      mode="none"
                      src={
                        RESOURCES.find(
                          (item) => item.apiName === cost?.currency
                        )?.image || ''
                      }
                    />
                    <div className={s.digit}>{cost?.balance}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.row}>
              <div className={s.subtitle}>
                Risk <IconInfo className={s.iconInfo} />
              </div>
              <div className={s.sliderContainer}>
                <Slider
                  className={s.slider}
                  min={0}
                  max={sortedRiskValues.length - 1}
                  onChange={(value) => setRiskValueIndex(value as number)}
                  renderThumb={(props, state) => (
                    <div {...props}>
                      <div className={s.thumbValue}>X{xValue}</div>
                    </div>
                  )}
                />
                <div className={s.percent}>{riskValue}%</div>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </ConfirmModal>
  )
}

export { MineModal }
