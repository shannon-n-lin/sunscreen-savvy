const Button = ({ text, color, hover, width }) => {
  return (
    <button className={`mx-auto bg-${color} hover:bg-${hover} w-[${width}] py-2 px-4 rounded uppercase font-bold`}>
      {text}
    </button>
  )
}

export default Button