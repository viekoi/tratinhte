import React from 'react'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import heroSliderData from '../fake-data/hero-slider'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'

import producData from '../fake-data/products'

const Home = () => {
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
                producData.getRandomProducts(4).map((item,index)=>{
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
