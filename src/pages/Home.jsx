import React,{useState,useEffect} from 'react'
import * as Realm from 'realm-web'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import heroSliderData from '../fake-data/hero-slider'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'



const Home = () => {
  const [products,setProducts] = useState([])
  console.log(products)


  const getRandomProducts = async()=>{
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("products");
      const products = await collection.find({},{limit:4})
      setProducts(products)
    } catch(err) {
      console.error("Failed to log in", err);
    }

  }

  useEffect(() => {
    getRandomProducts()
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
