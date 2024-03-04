import Sunscreen from './Sunscreen'

export default function Sunscreens({ sunscreens }) {
  return (
    <div className='mx-16 grid grid-cols-auto gap-6'>
      {sunscreens.map(sunscreen => (
        <Sunscreen 
          key={sunscreen._id}
          sunscreen={sunscreen} 
        />
      ))}
    </div>
  )
}
