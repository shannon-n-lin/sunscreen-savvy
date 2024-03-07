import Sunscreens from '../../components/Sunscreens'

export default function BudgetSunscreens() {
  
  return (
    <>
      <h1 className='text-center mt-16'>Budget Sunscreens</h1>
      <div className='w-[80%] max-w-2xl mx-auto my-8 flex flex-col gap-6'>
        <p className='text-center'>
          Budget-friendly options that typically cost less than $5 per ounce! 
        </p>
      </div>
      <Sunscreens presetQuery='?price=0,5'/>
    </>
  )
}
