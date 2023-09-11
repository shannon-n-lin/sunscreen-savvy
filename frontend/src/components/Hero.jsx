import Button from './Button'

const Hero = () => {
  return (
    <div className='w-full bg-[url("/src/assets/gradient1.png")] bg-cover bg-left-top'>
      <div className='h-[500px] p-4 flex flex-col text-center justify-center'>
        <h1 className='mb-8 text-4xl md:text-5xl/tight max-w-[476px] md:max-w-[680px] mx-auto font-semibold'>Find a sunscreen that works for your skin</h1>
        <p className='text-lg md:text-2xl/snug max-w-[400px] md:max-w-[530px] mx-auto'>Search for sunscreens that match your needs and read reviews from people like you</p>
        <div className='mt-8'>
          <Button text='Get started' color='lt-blue' hover='off-white' width='200px' />
        </div>
      </div>
    </div>
  )
}

export default Hero