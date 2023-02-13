import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'


import productData from '../fake-data/products'

const Product = () => {
  let {state}= useLocation();
  const product = productData.getProductBySlug(state.props.slug)
  const products = productData.getAllProducts()
  const relatedProducts  = products.filter(e =>{return((e.categorySlug===state.props.categorySlug) && (e.slug!==state.props.slug))})

  useEffect(()=>{
    window.scrollTo(0,0)
  },[product])
  return (
    <Helmet title={product.title}>
      
      <Section>
        <SectionBody>
        <ProductView product={product}></ProductView>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Khám phá thêm
        </SectionTitle>
        <SectionBody>
            <div className="grid wide">
              <div className="row">
                {
                  relatedProducts.map((item,index)=>{
                    return(
                      <ProductCard                      
                      item={item} key={index}
                      lcol={3}
                      mcol={6}
                      ccol={12}
                      >
                      
                      </ProductCard>
                    )
                  })
                }
              </div>
            </div>
        </SectionBody>
      </Section>

    </Helmet>
  )
}

export default Product
