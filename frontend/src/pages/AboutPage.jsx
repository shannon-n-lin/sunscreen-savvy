export default function AboutPage({ handleLogout }) {

  console.log('About page')

  return (
    <>
      <h1 className='text-center mt-16'>About</h1>
      <div className='w-[80%] max-w-2xl mx-auto mt-10 mb-8 flex flex-col gap-6'>
        <p>
          Welcome to Savvy, your go-to destination for finding the perfect sunscreen without the hassle. Sunscreen is crucial for protecting your skin from harmful UV rays, reducing the risk of sunburn and skin cancer. 
        </p>
        <p>
          We understand the frustration of searching for the right product only to end up disappointed. That's why we're here to streamline the process and help you discover sunscreens that work for your skin, ingredient concerns, and budget. Whether you're looking for a lightweight lotion for everyday wear or a water-resistant formula for your next beach adventure, we've got you covered.
        </p>
        <p>
          Stay tuned for upcoming features, including reviews, personalized recommendations, the ability to bookmark sunscreens, and more! By helping you find products that fit your needs, we're reducing waste and the skincare industry's impact on the environment. Join us in our mission to protect your skin, your wallet, and our planet. 
        </p>
      </div>
    </>
  )
}
