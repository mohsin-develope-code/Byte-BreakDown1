
const Button = ({btnText}) => {


  return (
    <div>
        <button type='submit' className='font-semibold mt-3 hover:text-black hover:bg-white border-2 border-transparent hover:border-black px-8 py-2 bg-black text-white rounded-md transition-all duration-300 ease-in-out'>
            {btnText}
        </button>
    </div>
  )
}

export default Button