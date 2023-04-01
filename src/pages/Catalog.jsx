import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as Realm from 'realm-web'


import Helmet from '../components/Helmet'
import classes from './Catalog.module.css'
import ProductCard from '../components/ProductCard'
import CheckBox from '../components/CheckBox'
import Button from '../components/Button'
import Loading from '../components/Loading'


import category from '../fake-data/category'
const Catalog = () => {

  // const [isLoading, setIsLoading] = useState(true);


  const fetchProducts = async () => {
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
          // }
        },
        {
          $sort: {
            categorySlug: -1
          }
        }
      ])
      setProductList(products)
      //  setIsLoading(false); 
    } catch (err) {
      console.error("Failed to log in", err);
    }



  }

  const initFiler = {
    category: []
  }

  const [productList, setProductList] = useState([])


  const [products, setProducts] = useState(productList)

  const [filter, setFilter] = useState(initFiler)

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
          break
        default:
      }
    }
    else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(e => e !== item.categorySlug)
          setFilter({ ...filter, category: newCategory })
          break
        default:
      }


    }
  }

  const clearFilter = () => setFilter(initFiler)

  const updateProducts = useCallback(
    () => {
      let temp = productList

      if (filter.category.length > 0) {
        temp = temp.filter(e => filter.category.includes(e.categorySlug))
      }

      setProducts(temp)
    },
    [filter, productList],

  )


  useEffect(() => {
    fetchProducts()
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    updateProducts()
    window.scrollTo(0, 0)
  }, [updateProducts])

  const filterRef = useRef(null)
  const filterContainerModalRef = useRef(null)



  const stopPropagationHandler = (e) => {
    e.stopPropagation()
  }

  const showHideFilter = () => {
    filterRef.current.classList.toggle('active')
    filterContainerModalRef.current.classList.toggle('active')

  }

  if (productList.length === 0) {
    return (<Loading></Loading>)
  } else {
    return (
      <div className="grid wide">
        <Helmet title='Sản Phẩm'>
          <div className={classes.catalog}>
            <div className={classes.toggle}>
              <Button size="sm" onclick={() => showHideFilter()}>bộ lọc</Button>
            </div>
            <div className={classes[`filter-container`]} ref={filterContainerModalRef} onClick={showHideFilter}>
              <div className={classes.filter} ref={filterRef} onClick={stopPropagationHandler}>
                <div className={classes.close} onClick={showHideFilter}>
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className={classes.widget}>
                  <div className={classes.title}>
                    danh mục sản phẩm
                  </div>
                  <div className={classes[`widget-content`]}>
                    {
                      category.map((item, index) => {
                        return (<div className={classes.item} key={index}>
                          <CheckBox
                            label={item.display}
                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                            checked={filter.category.includes(item.categorySlug)}
                          ></CheckBox>
                        </div>)
                      })
                    }
                  </div>
                </div>
                <div className={classes.widget}>
                  <div className={classes[`widget-content`]}>
                    <Button
                      onclick={clearFilter}
                      size="sm"
                    >Xóa bộ lọc</Button>
                  </div>
                </div>

              </div>

            </div>
            <div className={classes.content}>
              <div className="grid">
                <div className="row">
                  {
                    products.map((item, index) => {
                      return (
                        <ProductCard
                          key={index}
                          item={item}
                          lcol={4}
                          mcol={6}
                          ccol={12}
                        ></ProductCard>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

        </Helmet>
      </div>
    )
  }
}



export default Catalog
