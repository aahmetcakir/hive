import { BigHead } from '@bigheads/core'
export default function Avatar({ size }) {
  return (
    <BigHead
      accessory="shades"
      body="chest"
      circleColor="blue"
      clothing="tankTop"
      clothingColor="black"
      eyebrows="angry"
      eyes="wink"
      facialHair="mediumBeard"
      graphic="react"
      hair="short"
      hairColor="black"
      hat="none"
      hatColor="green"
      lashes="false"
      lipColor="purple"
      mask="true"
      mouth="open"
      skinTone="brown"
      className={`w-[${size}px] h-[${size}px]`}
    />
  )
}

