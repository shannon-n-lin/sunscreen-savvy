export default function Sunscreen({ sunscreen }) {
  const price = sunscreen.pricePerOz.$numberDecimal
  let priceRange
  priceRange = price < 5 ? '$' :
               price < 10 ? '$$' : 
               price < 15 ? '$$$' : 
               price < 25 ? '$$$$' : '$$$$$'
  
  return (
    <div className='h-fit sm:h-80 flex flex-row border-[1px] border-lt-gray rounded-xl shadow-md bg-white'>
      <div className='w-5/12 mt-4'>
        <img className='h-[95%] w-[95%] object-contain mx-auto' 
              src={sunscreen.image} 
              alt={`Packaging of ${sunscreen.name}`}
        />
      </div>
      <div className='w-7/12 p-8'>
        <div className='uppercase tracking-wide text-sm font-semibold hover:underline'>{sunscreen.brand}</div>
        <a href={sunscreen.url} target='_blank' className='mt-2 block text-xl/tight font-semibold hover:underline'>{sunscreen.name}</a>
        <ul className='mt-5'>
          <li className='mt-1'>
            <span className='font-bold'>FORM: </span>
            {sunscreen.form}
          </li>
          <li className='mt-1'>
            <span className='font-bold'>TYPE: </span>
            {sunscreen.type}
          </li>
          <li className='mt-1'>
            <span className='font-bold'>SPF: </span>
            {sunscreen.spf}
          </li>
          <li className='mt-1'>
            <span className='font-bold'>PRICE: </span>
            {priceRange}
          </li>
        </ul>
      </div>
    </div>    
  )
}
