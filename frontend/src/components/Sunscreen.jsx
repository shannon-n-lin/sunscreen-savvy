export default function Sunscreen({ sunscreen }) {
  const price = sunscreen.pricePerOz.$numberDecimal
  let priceRange
  priceRange = price < 5 ? '$' :
               price < 10 ? '$$' : 
               price < 15 ? '$$$' : 
               price < 25 ? '$$$$' : '$$$$$'
  
  return (
    <div className='h-full border-[1px] border-lt-blue rounded-xl shadow-md'>
      <div className='md:flex'>
        <div className='md:shrink-0'>
          <img className='h-48 w-full p-2 object-cover md:h-full md:w-48' src={sunscreen.image} alt={`Packaging of ${sunscreen.name}`}/>
        </div>
        <div className='p-8'>
          <div className='uppercase tracking-wide text-sm font-semibold hover:underline'>{sunscreen.brand}</div>
          <a href='#' className='block mt-1 text-lg/tight font-medium hover:underline'>{sunscreen.name}</a>
          <ul>
            <li className='mt-2'>Form: {sunscreen.form}</li>
            <li className='mt-2'>Type: {sunscreen.type}</li>
            <li className='mt-2'>SPF: {sunscreen.spf}</li>
            <li className='mt-2'>Price: {priceRange}</li>
          </ul>
        </div>
      </div>
    </div>    
  )
}
