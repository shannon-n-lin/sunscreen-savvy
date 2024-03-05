export default function Hero() {
  return (
    <div className='z-0 w-full bg-[url("src/assets/gradient2.png")] 
    bg-cover bg-left-bottom -mt-[80px]'>
      <div className='h-[550px] p-4 flex flex-col text-center justify-center'>
        <h1 className='mt-12 mb-4 text-4xl md:text-5xl/tight max-w-[476px] md:max-w-[680px] mx-auto'>Find a sunscreen that works for your skin</h1>
        <p className='text-lg md:text-2xl/snug max-w-[400px] md:max-w-[530px] mx-auto'>Search for sunscreens that match your needs and read reviews from people like you</p>
        <div className='mt-8'>
          <button className='bg-lt-blue hover:bg-off-white border border-[#797a7a] mx-auto py-2 px-4 rounded uppercase font-bold'>Get started</button>
        </div>
      </div>
    </div>
  )
}
