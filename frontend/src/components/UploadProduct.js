import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa"
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import { MdDelete } from "react-icons/md"
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData

}) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handelOnChange = (e) => {
        const {name, value} = e.target

        setData((preve)=>{
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handelUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handelDeleteProductImage = async(index) => {
        console.log("image index ", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve)=>{
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }   

    // Upload product
    const handelSubmit = async(e)=>{
        e.preventDefault()

        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if(responseData.error) {
            toast.error(responseData?.message)
        }
    }
    
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
           
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg '>Upload Product</h2>
                <div className='block ml-auto w-fit text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <IoMdClose/>
                </div>
            </div>

            <form className='grid p-4 gap-2 overflow-y-auto h-full' onSubmit={handelSubmit}>
                <label htmlFor='productName'>Product Name:</label>
                <input 
                    type='text' 
                    id='productName' 
                    placeholder='Enter product name'
                    name='productName'
                    value={data.productName}
                    onChange={handelOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                />

                <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
                <input 
                    type='text' 
                    id='brandName' 
                    placeholder='Enter brand name'
                    name='brandName'
                    value={data.brandName}
                    onChange={handelOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                />

                <label htmlFor='category' className='mt-3'>Category:</label>
                <select 
                    value={data.category} 
                    name='category' 
                    onChange={handelOnChange} 
                    className='p-2 bg-slate-100 border rounded'
                    required
                >
                    <option value={""}>Select Category</option>
                    {
                        productCategory.map((el, index)=> {
                            return (
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor='productImage' className='mt-3'>Product Image:</label>
                <label htmlFor='uploadProductInput'>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                            <span className='text-4xl'><FaCloudUploadAlt/></span>
                            <p className='text-sm'>Upload Product Image</p>
                            <input type='file' id='uploadProductInput' className='hidden' onChange={handelUploadProduct}/>
                        </div>
                    </div>
                </label>

                <div>
                    {
                        data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                    data.productImage.map((el, index)=>{
                                        return (
                                            <div className='relative group'>
                                                <img 
                                                    src={el} 
                                                    alt={el} 
                                                    width={80} 
                                                    height={80} 
                                                    className='bg-slate-100 border cursor-pointer'
                                                    onClick={()=>{
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)
                                                    }}
                                                />
                                                <div 
                                                    className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded hidden group-hover:block cursor-pointer'
                                                    onClick={()=>handelDeleteProductImage(index)}
                                                >
                                                    <MdDelete/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )
                    }
                    
                </div>

                <label htmlFor='price' className='mt-3'>Price:</label>
                <input 
                    type='number' 
                    id='price' 
                    placeholder='Enter price'
                    name='price'
                    value={data.price}
                    onChange={handelOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                />

                <label htmlFor='sellingPrice' className='mt-3'>Selling Price:</label>
                <input 
                    type='number' 
                    id='sellingPrice' 
                    placeholder='Enter selling price'
                    name='sellingPrice'
                    value={data.sellingPrice}
                    onChange={handelOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                />

                <label htmlFor='description' className='mt-3'>Description:</label>
                <textarea 
                    className='bg-slate-100 h-28 border resize-none p-1' 
                    placeholder='Enter product description' 
                    onChange={handelOnChange}
                    name='description'
                    value={data.description}
                    rows={3} 
                    >
                </textarea>
                

                <button className='px-3 py-2 mb-10 bg-red-600 text-white hover:bg-red-700'>Upload Product</button>
            </form>

        </div>

        {/* Display image full screen */}
        {
            openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }
    </div>
  )
}

export default UploadProduct