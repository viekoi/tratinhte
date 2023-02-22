import React,{useState,useEffect} from 'react'
import {db} from '../firebase-config'
import {getDocs,collection,limit,query} from 'firebase/firestore'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import heroSliderData from '../fake-data/hero-slider'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'

import { async } from '@firebase/util'

const Home = () => {
  const [products,setProducts] = useState([])

  const productsCollectionRef = collection(db,"products")
  const getProducts = async()=>{
    try{
      const q = query(productsCollectionRef ,limit(4));
      const data = await getDocs(q)
      const products = (data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      setProducts(products)
    }catch(er){
      console.error(er)
    }
  }

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <Helmet title='Trang chủ'>
      <div className="grid wide">
        <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={5000}></HeroSlider>
      </div>
      <Section>
        <SectionTitle>
          Sản phẩm bán chạy
        </SectionTitle>
        <SectionBody>
          <div className="grid wide">
            <div className="row">
              {
                products.map((item,index)=>{
                  return(<ProductCard 
                    key={index}
                    item={item}
                    lcol={3}
                    mcol={6}
                    ccol={12}
                  >
                  </ProductCard>)
                  
                })
              }
            </div>
          </div>
        </SectionBody>
      </Section>
    </Helmet>
    
  )
}

export default Home
