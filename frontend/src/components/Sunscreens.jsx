import Sunscreen from './Sunscreen'

export default function Sunscreens({ sunscreens }) {
  return (
    <div className='max-w-[1240px] grid grid-cols-auto gap-6 mx-auto'>
      {sunscreens.map(sunscreen => (
        <Sunscreen 
          key={sunscreen._id}
          sunscreen={sunscreen} 
        />
      ))}
    </div>
  )
}
