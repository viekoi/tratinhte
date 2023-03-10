import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import * as Realm from 'realm-web'


import Helmet from '../components/Helmet'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'




const Product = () => {



  const [products,setProducts] = useState([])
  

  const getAllProducts = async () => {
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("products");
      const products = await collection.aggregate([{
        $lookup:{
          from:"toppings",
          localField:"toppings",
          foreignField:"slug",
          as:"toppings"
        }
    }])
      setProducts(products)
    } catch(err) {
      console.error("Failed to log in", err);
    }



  }

  



  let {state}= useLocation();
  const product = state.props
  const relatedProducts  = products.filter(e =>{return((e.categorySlug===state.props.categorySlug) && (e.slug!==state.props.slug))})

  useEffect(() => {
    getAllProducts()
  }, []);

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
