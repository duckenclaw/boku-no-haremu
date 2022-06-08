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

const levelTraits = {
  2: ['clothes', 'hair', 'passionate', 'shy', 'emotional'],
  3: ['eyes'],
  4: ['accessories'],
  5: ['background', 'unique trait'],
}

const templateTraitsKeys = ['level', 'type']

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

  const templateTraits = useMemo(() => {
    if (data?.data?.template?.immutable_data) {
      return Object.entries(data.data.template.immutable_data).reduce<{
        [key: string]: string
      }>((acc, [key, value]) => {
        if (templateTraitsKeys.includes(key)) {
          acc[key] = value
          return acc
        }
        return acc
      }, {})
    }

    return {}
  }, [data?.data.template.immutable_data])

  const ignoreTraits = ['img', 'name']

  return (
    <div className={cn(className, s.slide)}>
      <Loader isLoading={isLoading}>
        <CardImage
          className={s.image}
          src={[
            ipfsToS3Url(
              data?.data?.immutable_data?.img || data?.data?.data?.img
            ),
            ipfsToUrlSafe(data?.data?.data?.img),
          ]}
        />
        <div className={s.info}>
          <div className={s.title}>you will receive</div>
          {templateTraits &&
            Object.entries(templateTraits).map(([key, value]) =>
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
                (Number(templateTraits?.level) + 1) as keyof typeof levelTraits
              ]?.join(', ')}
              value={'???'}
            />
          }
        </div>
      </Loader>
    </div>
  )
}
