import Sunscreens from '../../components/Sunscreens'

export default function ChemicalSunscreens() {

  return (
    <>
      <h1 className='text-center mt-16'>Chemical Sunscreens</h1>
      <div className='w-[80%] max-w-2xl mx-auto my-8 flex flex-col gap-6'>
        <p className='text-center'>
          Chemical sunscreens work by using active ingredients like avobenzone, oxybenzone, or octocrylene to absorb UV rays and protect your skin. These sunscreens typically require about 20 minutes to fully absorb into the skin before becoming effective, but they can be great, lightweight options that blend easily without looking chalky.
        </p>
      </div>
      <Sunscreens presetQuery='?type=chemical'/>
    </>
  )
}
