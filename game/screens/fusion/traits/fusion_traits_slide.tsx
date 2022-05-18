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

  let characterTraits = useMemo(
    () => data?.data?.immutable_data,
    [data?.data?.immutable_data]
  )

  let templateData = useMemo(
    () => data?.data.template.immutable_data,
    [data?.data.template.immutable_data]
  )

  templateData = {
    // нужно удалить когда появятся харастеристики
    img: 'QmTLkXJoCjdYQKaQ7kDFJqtNn8gScz6KT52Aqh7SkJfpCE',
    type: 'namichuan',
    level: '1',
    name: 'NYANFAC3',
  }

  characterTraits = {
    // нужно удалить когда появятся харастеристики
    img: 'QmTLkXJoCjdYQKaQ7kDFJqtNn8gScz6KT52Aqh7SkJfpCE',
    shy: '3',
    eyes: 'grey',
    hair: 'kitsune',
    clothes: 'grey dress',
    emotional: '8',
    passionate: '4',
  }

  const levelTraits = {
    2: ['clothes', 'hair', 'passionate', 'shy', 'emotional'],
    3: ['eyes'],
    4: ['accessories'],
    5: ['background', 'unique trait'],
  }

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
              key === 'img' ? null : (
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
              key === 'img' ? null : (
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
