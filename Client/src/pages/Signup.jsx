import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useEffect, useState } from "react"

const Signup = () => {

  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [signupInfo, setSignupInfo] = useState({name: "", email: "", password: ""})


  function handleSignupChange (e) {
    const {name, value} = e.target
    const copySignupInfo = {...signupInfo}
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo)
  }


  async function handleSignup (e) {
    e.preventDefault()

    const {name, email, password} = signupInfo
    if(!name || !email || !password){
      return  setErrMessage("All fields are required")
    }

    try {
      const response = await fetch("http://localhost:8080/signup", {
                                    method: "POST", 
                                    body: JSON.stringify(signupInfo),
                                    credentials: "include",
                                    headers: {"Content-Type" : "application/json"}
                                  })
      
      const result = await response.json()
      const {message, status} = result

      if(status){
        setErrMessage(message);
        setTimeout(()=> {
          navigate('/login')
        }, 2000)
      }

      else if(!status) {
        setErrMessage(message);
      }
    

    } catch (error) {
      setErrMessage("Internel Error");
    }

  }




  return (


    <div className='h-[450px] flex flex-col justify-center items-center gap-11 '>
        
        <h1 className='text-3xl font-bold'>Sign up</h1>

        <div className='flex flex-col justify-center items-center gap-4'>

            <form onSubmit={handleSignup}
                  method="post" 
                  className='flex flex-col justify-center items-center gap-3 w-80 px-4'>
                
                <input type="text" 
                       name="name"
                       placeholder='Full Name' 
                       onChange={handleSignupChange}
                       className='w-full border border-black rounded-md px-3 py-2 text-sm '/>

                 <input type="eail" 
                        name="email" 
                        placeholder='Email' 
                        onChange={handleSignupChange}
                        className='w-full border border-black rounded-md px-3 py-2 text-sm '/>

                <input type="password" 
                       name="password" 
                       placeholder='Password' 
                       onChange={handleSignupChange}
                       className='w-full border border-black rounded-md px-3 py-2 text-sm '/>



                       {
                         errMessage? <div className='text-sm text-red-500 mt-1'>{errMessage}</div> : <></>
                       }

                <Button btnText={"Sign up"}/>
            
            </form>

            <div className='text-sm'>Do you have an account? <Link to={'/login'} className='underline hover:text-blue-600'>Login</Link></div>
        </div>

    </div>


  )
}

export default Signup