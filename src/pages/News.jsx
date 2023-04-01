import React, { useState, useEffect } from 'react'

import classes from './News.module.css'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import NewCard from '../components/NewCard'
import Loading from '../components/Loading'

import * as Realm from 'realm-web'


const News = () => {

  const [news, setNews] = useState([])
  // const [isLoading, setIsLoading] = useState(true);


  const fecthNews = async () => {
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("news");
      const news = await collection.find({})
      setNews(news)
      // setIsLoading(false)
    } catch (err) {
      console.error("Failed to log in", err);
    }



  }

  useEffect(() => {
    fecthNews()
  }, []);


  if (news.length === 0) {
    return (<Loading></Loading>)
  } else {
    return (
      <Helmet title='Tin tức'>
        <div className={classes.news}>
          <Section>
            <SectionTitle>TIN TỨC</SectionTitle>
            <SectionBody>
              <div className="grid wide">
                <div className="row">
                  {news.map((item, index) => {
                    return (
                      <NewCard
                        key={index}
                        item={item}
                        lcol={3}
                        mcol={6}
                        ccol={6}
                      ></NewCard>
                    )
                  })
                  }

                </div>
              </div>
            </SectionBody>
          </Section>
        </div>
      </Helmet>
    )
  }
}


export default News