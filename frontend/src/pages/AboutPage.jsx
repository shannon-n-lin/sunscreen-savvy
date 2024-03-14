export default function AboutPage({ handleLogout }) {

  console.log('About page')

  return (
    <>
      <h1 className='text-center mt-16'>About</h1>
      <div className='w-[80%] max-w-2xl mx-auto mt-10 mb-8 flex flex-col gap-6'>
        <p>
          Welcome to Savvy, your go-to resource for finding the perfect sunscreen without the hassle. Sunscreen is crucial for protecting your skin from harmful UV rays, reducing the risk of sunburn and skin cancer. But searching for a sunscreen that fits works for your skin type, ingredient preferences, and budget can be frustrating.
        </p>
        <p>
          That's why Savvy is here to streamline the process and help you discover sunscreens that work for your needs. Whether you're looking for a lightweight lotion for everyday wear or a water-resistant formula for your next beach adventure, we've got you covered.
        </p>
        <p>
          Stay tuned for upcoming features — including the ability to leave reviews, bookmark sunscreens, get personalized recommendations, and more! By helping you find products that fit your needs, we're reducing waste and the skincare industry's impact on the environment. Join us in our mission to protect your skin, your wallet, and our planet. 
        </p>
      </div>
    </>
  )
}
