
const Button = ({btnText, clicked}) => {


  return (
    <div>
        <button type='submit' className='font-semibold mt-3 hover:text-black hover:bg-white border-2 border-transparent hover:border-black px-8 py-2 bg-black text-white rounded-md transition-all duration-300 ease-in-out'>
            {
            clicked?  
            <div className="border-4 border-white border-t-4 border-l-neutral-800 rounded-full w-[25px] h-[25px] animate-spin ">
            </div>
            :
            btnText
            
            }

        </button>
    </div>
  )
}

export default Button