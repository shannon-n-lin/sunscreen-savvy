const Sunscreen = ({ sunscreen }) => {
  const price = sunscreen.pricePerOz.$numberDecimal
  
  return (
    <div className=''>
      <div className='max-w-md my-8 mx-auto border-[1px] border-lt-blue rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
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
              <li className='mt-2'>Price: {price < 5 ? '$' :
                                       price < 10 ? '$$' : 
                                       price < 15 ? '$$$' : 
                                       price < 25 ? '$$$$' : '$$$$$'}
              </li>
            </ul>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default Sunscreen