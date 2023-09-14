import Sunscreen from './Sunscreen'

// const Sunscreens = ({ sunscreens }) => {
  export default function Sunscreens({ sunscreens }) {
  return (
    <div className='pt-24'>
      {sunscreens.map(sunscreen => (
        <Sunscreen 
          key={sunscreen._id}
          sunscreen={sunscreen} 
        />
      ))}
    </div>
  )
}