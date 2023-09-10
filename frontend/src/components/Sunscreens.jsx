import Sunscreen from './Sunscreen'

const Sunscreens = ({ sunscreens }) => {
  return (
    <div className='pt-24'>
      {sunscreens.map(sunscreen => (
        <Sunscreen 
          key={sunscreen.id}
          sunscreen={sunscreen} 
        />
      ))}
    </div>
  )
}

export default Sunscreens