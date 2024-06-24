import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'
import SummaryApi from '../common'

const Home = () => {
  // ========== use map to show all product by category ==========
  // const [categoryProduct, setCategoryProduct] = useState([])

  // const fetchCategoryProduct = async() => {
  //     const response = await fetch(SummaryApi.categoryProduct.url)
  //     const dataResponse = await response.json()
  //     setCategoryProduct(dataResponse.data)
  // }

  // useEffect(()=>{
  //     fetchCategoryProduct()
  // }, [])

  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's AirPods"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      {/* ========== use map to show all product by category ==========
        {
          categoryProduct.map((product, index) => {
            return (
              <VerticalCartProduct category={product?.category} heading={product?.category}/>
            )})
        } */}

      <VerticalCartProduct category={"mobile"} heading={"mobile"}/>
      <VerticalCartProduct category={"speaker"} heading={"speaker"}/>
      <VerticalCartProduct category={"TV"} heading={"TV"}/>
      <VerticalCartProduct category={"camera"} heading={"camera"}/>
      <VerticalCartProduct category={"mouse"} heading={"mouse"}/>
      <VerticalCartProduct category={"earphones"} heading={"earphones"}/>
      <VerticalCartProduct category={"processor"} heading={"processor"}/>
      <VerticalCartProduct category={"printers"} heading={"printers"}/>
      <VerticalCartProduct category={"refrigerator"} heading={"refrigerator"}/>
      <VerticalCartProduct category={"trimmers"} heading={"trimmers"}/>

    </div>
  )
}

export default Home