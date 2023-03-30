import React,{useState,useEffect}from 'react'

import classes from './News.module.css'

import Helmet from '../components/Helmet'
import Section,{SectionBody,SectionTitle} from '../components/Section'
import NewCard from '../components/NewCard'

import * as Realm from 'realm-web'

const News = () => {

  const[news,setNews]= useState([])

  console.log(news)

  // const fecthNews = async () => {
  //   const app = new Realm.App({ id: "application-0-xxkdi" });
  //   const credentials = Realm.Credentials.anonymous();
  //   try {
  //     const user = await app.logIn(credentials);
  //     const mongo = app.currentUser.mongoClient("mongodb-atlas");
  //     const collection = mongo.db("myDB").collection("toppings");
  //     const news = await collection.find({title:"🌸 8 tháng 3 này, hãy cùng người phụ nữ của bạn ghé quán chúng mình để nhận những món quà ngọt ngào nhé."});
  //     setNews(news)
  //   } catch (err) {
  //     console.error("Failed to log in", err);
  //   }



  // }

  useEffect(() => {
    // fecthNews()
    setNews([
      {
        title: "🌸 8 tháng 3 này, hãy cùng người phụ nữ của bạn ghé quán chúng mình để nhận những món quà ngọt ngào nhé.",
        date: "2023-03-22T06:54:20.503Z",
        image: "https://scontent-sin6-1.xx.fbcdn.net/v/t39.30808-6/330411347_893024961906724_7810571064034657826_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=cnWT_5kw1m4AX97FGyA&_nc_ht=scontent-sin6-1.xx&oh=00_AfDnBhyMwubvt3XauVz71qXW5-O2pXuN13Gmhcdjv3ph9A&oe=641F479F",
        content: 
        [
          "🔸 Một phần Mousse xinh xắn sẽ được dành đến bạn khi order 1 ly size L bất kỳ trên menu của tụi mình.",
          "🌸 Dành tặng cho bản thân một ngày 8/3 tuyệt vời với món quà nhỏ này của HeiCha nhé.Còn chờ gì nữa, đặt hẹn đi thôi",
          "😘📍 Addr: 311 Mã Lò, P.Bình Trị Đông A, Q.Bình Tân, TPHCM.",
          "☎️ Hotline: 0765287742",
          "⏱️ Giờ mở cửa: 6:00 – 21:00",
          "🛵 Freeship dưới 1km cho tất cả hóa đơn",
          "🛵 Freeship dưới 5km cho hóa đơn từ 1.000.000đ",
          "Lưu ý: Chương trình áp dụng duy nhất ngày 8/3/2023."
        ]

      }
    ])
  }, []);


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
                    )})
                  }

                </div>
              </div>
            </SectionBody>
          </Section>
      </div>
    </Helmet>
  )
}

export default News