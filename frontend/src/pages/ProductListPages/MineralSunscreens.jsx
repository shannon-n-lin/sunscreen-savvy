import Sunscreens from '../../components/Sunscreens'

export default function MineralSunscreens() {

  return (
    <>
      <h1 className='text-center mt-16'>Mineral Sunscreens</h1>
      <div className='w-[80%] max-w-2xl mx-auto my-8 flex flex-col gap-6'>
        <p className='text-center'>
          Mineral (or physical) sunscreens use ingredients like zinc oxide and titanium dioxide to create a physical barrier on your skin that reflects and scatters UV rays. They provide instant protection upon application and are often less likely to irritate sensitive skin than the active ingredients in chemical sunscreens.  
        </p>
      </div>
      <Sunscreens presetQuery='?type=physical'/>
    </>
  )
}
