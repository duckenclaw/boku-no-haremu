import React from 'react'
import s from './road_map.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'
import cn from 'classnames'
import { Image } from 'components/shared-ui/image'

export const RoadMap = () => {
  const row = [
    {
      number: 'March 2022',
      title: 'Pre-Production',
      description:
        'We assembled the team, finished ideation of our project and started working on the game. We launched a Discord server, Twitter page and Medium of Boku no Haremu. It is only a start on our journey to give you the Waifus you deserve.',
      image: 'images/road_map/image1.png',
    },
    {
      number: 'April 2022',
      title: 'Verification on AtomicHub',
      description:
        'We have done all the neccesary pre-production work to get our project verified on AtomicHub. Discord server is up, Smartcontract and Webpage are created, Twitter page is up and we’re all set to go! Now you can invest in our project knowing full well that Boku no Haremu is actually happening!',
      image: 'images/road_map/image2.webp',
    },
    {
      number: 'May 2022',
      title: '10 May. Mintpass sale day 1 ',
      description:
        'On the release day of the mintpasses there will be only 200 of them. This will be the lowest price in Boku no Haremu’s history so don’t miss out on your chance! Remember, that you can participate in the sale ONLY if you are WHITELISTED in our Discord server.',
      image: 'images/road_map/image3.webp',
    },
    {
      number: '',
      title: 'Secret event',
      description:
        'Faucibus interdum posuere lorem ipsum dolor sit. Malesuada bibendum arcu vitae elementum curabitur vitae. Viverra nibh cras pulvinar mattis nunc. Commodo nulla facilisi nullam vehicula ipsum a. Feugiat in fermentum posuere urna nec tincidunt praesent semper.',
      image: 'images/road_map/image5.webp',
    },
    {
      number: '',
      title: '13 May. Mintpass sale day 2',
      description:
        'On the second day of the sale the price will go up and there will be only 300 mintpasses for sale. The price will only go up from this point.',
      image: 'images/road_map/image4.webp',
    },
    {
      number: '',
      title: '14 May. Mintpass sale day 3',
      description:
        'It’s the final day of the mintpass sale, and the price is now even higher! There is only 300 of them! Get your mintpasses, this will be your last chance to get into the most progressive project on WAX - Boku no Haremu.',
      image: 'images/road_map/image6.webp',
    },
    {
      number: '',
      title: 'Secret Event',
      description:
        'Faucibus interdum posuere lorem ipsum dolor sit. Malesuada bibendum',
    },
    {
      number: '',
      title: 'Secret Event',
      description:
        'Viverra nibh cras pulvinar mattis nunc. Commodo nulla facilisi',
    },
    {
      number: '',
      title: 'Secret Event',
      description:
        'Malesuada bibendum arcu vitae elementum curabitur vitae. Viverra',
      image: 'images/road_map/image7.webp',
    },
    {
      number: '',
      title: 'NFT Packs sale',
      description:
        'The beginning of a legendary tale of Harem Masters. What Waifu will you get? The launch of the game is coming up so you better be ready!',
      image: 'images/road_map/image13.webp',
    },
    {
      number: 'June 2022',
      title: 'Opening of Packs',
      description:
        'This is what we all have been waiting for, you can find out what Waifus you get and plan your Harem progression strategy together with them!',
      image: 'images/road_map/image9.webp',
    },
    {
      number: '',
      title: 'Resource Packs sale',
      description:
        'Gifts from your waifus gathered in one Resources are needed to start the mining the resources, you can check our Whitepaper to know the mechanics, so be ready for some more packs that will ensure prosperity of your Haremu.',
      image: 'images/road_map/image8.webp',
    },
    {
      number: '',
      title: 'Launch of the Boku no Haremu',
      description:
        'The journey has started, all your Waifus are ready and you can now start developing your Harem! This is where your path begins, where all your triumphs lie and where the future of your waifus is decided... Your waifus can upgrade only up to the 3rd level at this point but no matter what your Waifu will be unique in the end!',
      image: 'images/road_map/image10.webp',
    },
    {
      number: 'July 2022',
      title: 'Generative NFTs of the 5th level',
      description:
        'This is the final step, the last obstacle you have to overcome, the end of the journey to your goal — a fully generated WAIFU. This is a race now and you know you have to win no matter the cost, there will be only 1000 level 5 Waifus of every type so you better hurry!',
      image: 'images/road_map/image11.webp',
    },
    {
      number: '',
      title: 'Bridge to the ETHEREUM blockchain',
      description:
        'We’re all set for the migration of your Harem, now you can have your Waifu on OpenSea so everyone can see what path you have taken, what happened in your journey and what obstacles you have overcome to get your Waifu!',
      image: 'images/road_map/image12.webp',
    },
  ]

  const stage = 1
  const line_class = (index: number) => {
    if (index < stage) return s.before
    if (index === stage) return s.gradient
    if (index > stage) return s.after
  }

  return (
    <section className={cn(s.section, 'section')}>
      <a className="anchor" id="roadmap" />
      <Container className={s.wrap}>
        <TextHeader title="ROADMAP" className={s.textHeader} />
        <div className={s.first_shadow} />
        <div className={s.second_shadow} />
        <div className={s.columns_wrapper}>
          {row.map((item, index) => (
            <div className={cn(s.row, [s[`row-${index}`]])} key={index}>
              <div className={index <= stage ? s.circle : s.ring} />
              <div className={index % 2 ? s.item_right : s.item_left}>
                <div className={line_class(index)} />
                <div className={s.text_block}>
                  {!!item.number && (
                    <div className={s.number}>{item.number}</div>
                  )}
                  <div className={s.title}>{item.title}</div>
                  <div
                    className={
                      item.title.toLowerCase() !== 'secret event'
                        ? s.description
                        : s.description_secret
                    }
                  >
                    {item.description}
                  </div>
                </div>
                {item.image && (
                  <div className={s.image_block}>
                    <Image
                      className={
                        index === 8 ? s.secret_image : s.road_map__image
                      }
                      alt="image"
                      src={item.image}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
