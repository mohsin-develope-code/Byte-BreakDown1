import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { UserContext } from '../contextAPI/AuthContext';
import { BASE_URL } from '../utils/FetchAPI';



const Login = () => {


  const navigate = useNavigate();
  const {setUserName, setLogin} = UserContext();
  const [errMessage, setErrMessage] = useState("");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: ""})

  const [clicked, setClicked] = useState(false);


  function handleLoginChange (e) {
    const {name, value} = e.target
    
    const copyLoginInfo = {...loginInfo}
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }

  

  async function handleLogin (e) {
    e.preventDefault()

    const { email, password} = loginInfo
    if(!email || !password){
      return  setErrMessage("All fields are required")
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
                                    method: "POST", 
                                    body: JSON.stringify(loginInfo),
                                    credentials: "include",
                                    headers: {"Content-Type" : "application/json"}
                                  })

      const result = await response.json()
      const {message, status, user} = result

      if(status){
        setClicked(!clicked)
        setTimeout(() => {
          setErrMessage(message);
        }, 2000);

        setTimeout(()=> {
          navigate('/dashboard')
          setUserName(user);
          setLogin(true);
        },3000)
      }

      else if(!status) {
        setErrMessage(message);
      }
    

    } catch (error) {
      setErrMessage("Internel Error");
      
    }

  }




  return (
  
    

     <div className='h-[450px] min-w-screen flex flex-col justify-center items-center gap-11 '>
        
          <h1 className='text-3xl font-bold'>Login</h1>

          <div className='flex flex-col justify-center items-center gap-4'>

            <form method="post" onSubmit={handleLogin}
                  className='flex flex-col justify-center items-center gap-3 w-80 px-4'>
        

                 <input type="eail" 
                        name="email" 
                        placeholder='Email' 
                        onChange={handleLoginChange}
                        className='w-full border border-black rounded-md px-3 py-2 text-sm '/>

                <input type="password" 
                       name="password" 
                       placeholder='Password' 
                       onChange={handleLoginChange}
                       className='w-full border border-black rounded-md px-3 py-2 text-sm '/>

                       {
                         errMessage? <div className='text-sm text-red-500 duration-300 ease-in mt-1'>{errMessage}</div> : <></>
                       }

                <Button btnText={"Login"} clicked={clicked}/>
            
            </form>

            <div className='text-sm'>Don't have an account? <Link to={'/signup'} className='underline hover:text-blue-600'>signup</Link></div>
          </div>

     </div>


  )
}



export default Login