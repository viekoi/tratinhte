import React,{useState,useEffect} from 'react'
import * as Realm from 'realm-web'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'

import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'



const Home = () => {
  const [products,setProducts] = useState([])
  const [heroSliderProducts,setHeroSliderProducts] = useState([])


  const getHeroSliderProducts = async()=>{
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("products");
      const products = await collection.aggregate([
        {
          $match:{slug:{$in:['ds-01',"mt-01","t-01","cf-01"]}}
        },
        {
          $lookup: {
            from: "toppings",
            localField: "toppings",
            foreignField: "slug",
            as: "toppings"
          }
        }
        
      ])
      setHeroSliderProducts(products)
    } catch(err) {
      console.error("Failed to log in", err);
    }

  }

  const getRandomProducts = async()=>{
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("products");
      const products = await collection.aggregate([
        {
          $lookup: {
            from: "toppings",
            localField: "toppings",
            foreignField: "slug",
            as: "toppings"
          }
        },
        {
          $skip:4
        },
        {
          $limit:4
        }
      ])
      setProducts(products)
    } catch(err) {
      console.error("Failed to log in", err);
    }

  }

  useEffect(() => {
    getRandomProducts()
    getHeroSliderProducts()
  }, []);

  return (
    <Helmet title='Trang chủ'>
      <div className="grid wide">
        <HeroSlider data={heroSliderProducts} control={true} auto={true} timeOut={5000}></HeroSlider>
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
