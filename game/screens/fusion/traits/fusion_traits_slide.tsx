import { useGetCardByAssetId } from 'game/game_api'
import { useMemo } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import cn from 'classnames'

import s from './fusion_traits.module.scss'
import { CardImage } from 'game/components/card_image'
import { Loader } from 'components/shared-ui/loader'
import { TraitItem } from './fusion_trait_item'

type FusionTraitsSlideProps = {
  asset_id?: string
  className?: string
}

export const FusionTraitsSlide = ({
  className,
  asset_id,
}: FusionTraitsSlideProps) => {
  const { data, isLoading } = useGetCardByAssetId({
    asset_id,
  })

  const characterTraits = useMemo(
    () => data?.data?.immutable_data,
    [data?.data?.immutable_data]
  )

  const templateData = useMemo(
    () => data?.data.template.immutable_data,
    [data?.data.template.immutable_data]
  )

  const levelTraits = {
    2: ['clothes', 'hair', 'passionate', 'shy', 'emotional'],
    3: ['eyes'],
    4: ['accessories'],
    5: ['background', 'unique trait'],
  }

  const ignoreTraits = ['img', 'name']

  return (
    <div className={cn(className, s.slide)}>
      <Loader isLoading={isLoading}>
        <CardImage
          className={s.image}
          src={[
            ipfsToS3Url(characterTraits?.img),
            ipfsToUrlSafe(characterTraits?.img),
          ]}
        />
        <div className={s.info}>
          <div className={s.title}>you will receive</div>
          {templateData &&
            Object.entries(templateData).map(([key, value]) =>
              ignoreTraits.includes(key) ? null : (
                <TraitItem
                  className={s.templateItem}
                  type={key}
                  value={value}
                  key={key}
                />
              )
            )}
          {characterTraits &&
            Object.entries(characterTraits).map(([key, value]) =>
              ignoreTraits.includes(key) ? null : (
                <TraitItem type={key} value={value} key={key} />
              )
            )}
          {
            <TraitItem
              className={s.additionTrait}
              valueClassName={s.additionValue}
              type={levelTraits[
                (Number(templateData?.level) + 1) as keyof typeof levelTraits
              ]?.join(', ')}
              value={'???'}
            />
          }
        </div>
      </Loader>
    </div>
  )
}
