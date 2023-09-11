const Sunscreen = ({ sunscreen }) => {
  return (
    <div>
      <div class="max-w-md my-8 mx-auto bg-lt-blue rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          {/* <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt="Modern building architecture"/>
          </div> */}
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm font-semibold">{sunscreen.brand}</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{sunscreen.name}</a>
            <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sunscreen