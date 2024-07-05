import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      profilePic: ""
  })

  const navigate = useNavigate()

  const handelOnChange = (e) => {
      const {name, value} = e.target

      setData((preve) => {
          return {
              ...preve,
              [name] : value
          }
      })
  }

  const handelUploadPic = async(e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    if(data.password === data.confirmPassword) {
        const dataResponse = await fetch(SummaryApi.signUp.url, {
            method: SummaryApi.signUp.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success) {
            toast.success(dataApi.message)
            navigate("/login")
        }

        if(dataApi.error) {
            toast.error(dataApi.message)
        }

    } else {
        toast.error("Please check password and confirm password!")
    }
      
  }
    
  return (
    <section id="signup">
        <div className='mx-auto container p-4'>
            
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                      <img src={data.profilePic || loginIcons} alt='login icons'/>
                    </div>
                    <form>
                      <label>
                        <div className='text-xs pb-4 pt-2 bg-opacity-80 bg-slate-200 py-4 text-center absolute bottom-0 w-full cursor-pointer'>
                            Upload Photo
                        </div>  
                        <input type='file' className='hidden' onChange={handelUploadPic}/>
                      </label>
                      
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handelSubmit}>
                  <div className='grid'>
                    <label>Name : </label>
                    <div className='bg-slate-100 p-2'>
                      <input 
                        type='text' 
                        placeholder='Enter your name ...' 
                        name='name'
                        data={data.name}
                        onChange={handelOnChange}
                        required
                        className='h-full w-full outline-none bg-transparent'/>
                    </div>
                  </div>

                    <div className='grid'>
                      <label>Email : </label>
                      <div className='bg-slate-100 p-2'>
                        <input 
                          type='email' 
                          placeholder='Enter email ...' 
                          name='email'
                          data={data.email}
                          onChange={handelOnChange}
                          required
                          className='h-full w-full outline-none bg-transparent'/>
                      </div>
                    </div>

                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                onChange={handelOnChange}
                                name='password'
                                data={data.password}
                                placeholder='Enter password ...' 
                                required
                                className='h-full w-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? 
                                        (
                                            <FaEyeSlash/>
                                        ) 
                                        : 
                                        (
                                            <FaEye/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                onChange={handelOnChange}
                                name='confirmPassword'
                                data={data.confirmPassword}
                                placeholder='Enter password again ...' 
                                required
                                className='h-full w-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showConfirmPassword ? 
                                        (
                                            <FaEyeSlash/>
                                        ) 
                                        : 
                                        (
                                            <FaEye/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-700 hover:scale-110 transition-all block mx-auto mt-6'>Sign up</button>
                </form>

                <p className='my-5'>
                    Already have account?
                    <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link>
                </p>
            </div>
        </div>
        
    </section>
  )
}

export default SignUp