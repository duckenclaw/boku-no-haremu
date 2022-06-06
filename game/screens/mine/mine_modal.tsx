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
import { useState } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import s from './mine.module.scss'

type MineModalProps = {
  className?: string
  isOpen?: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
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
  const [riskValue, setRiskValue] = useState(1)
  const { reward_precision, multiplier_to_risk } = useGame()

  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={() => onConfirm()}
      onClose={() => onClose()}
      dialogChildren={
        <p>
          “Are you sure you want to mine her Senpai? you will get 180 nyan. your
          risk is 0% 100% chance that you will get the resources.”
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
              <span className={s.name}>{cardData?.name}</span>
              <span className={s.lvl}>{cardData?.level} lvl</span>
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
                    src={
                      RESOURCES.find(
                        (item) =>
                          item.apiName === mineRecipe?.mined_resource.currency
                      )?.image || ''
                    }
                  />
                  <div className={s.digit}>
                    {mineRecipe?.mined_resource.balance}
                  </div>
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
                  value={riskValue}
                  min={0}
                  max={multiplier_to_risk.length}
                  onChange={(value) => setRiskValue(value as number)}
                  renderThumb={(props, state) => (
                    <div {...props}>
                      <div className={s.thumbValue}>
                        X
                        {Number(
                          Number(
                            multiplier_to_risk[state.valueNow].key /
                              reward_precision
                          ).toFixed(1)
                        )}
                      </div>
                    </div>
                  )}
                />
                <div className={s.percent}>
                  {Number(
                    (100 - Number(multiplier_to_risk[riskValue].value)).toFixed(
                      1
                    )
                  )}
                  %
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </ConfirmModal>
  )
}

export { MineModal }
