import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import {db} from '../firebase-config'
import {collection,getDocs,where} from 'firebase/firestore'


import Helmet from '../components/Helmet'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'




const Product = () => {


  const productsCollectionRef = collection(db, "products");
  const [products,setProducts] = useState([])
  // const [product,setProduct] = useState({})

  const getAllProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      const products = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setProducts(products.sort((a, b) => {
        const titleCompare = a.title.localeCompare(b.title)
        const categorySlugCompare = a.categorySlug.localeCompare(b.categorySlug)
        return titleCompare && categorySlugCompare
      }))
    } catch (er) {
      console.error(er)
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
