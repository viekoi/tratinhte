import React,{useEffect,useState} from 'react'
import { useLocation,useParams} from 'react-router-dom'
import * as Realm from 'realm-web'
import classes from './NewView.module.css'
import Loading from './Loading'
const NewView = () => {
  
  const {id} = useParams()
  const [article,setArticle] = useState(undefined)
  const fecthArticle = async (id) => {
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("myDB").collection("news");
      const article = await collection.findOne({id:id})
      console.log(article)
      setArticle(article)
    } catch (err) {
      console.error("Failed to log in", err);
    }



  }

  let { state } = useLocation();

  if(state){
    var newInfo = state.news
  }else{
    var newInfo = article
}


if(newInfo){
  var date = new Date(newInfo.date)
}

  useEffect(() => {
    if(!state){
      fecthArticle(id)
    }
  }, []);


  if(!newInfo){
    return(<Loading></Loading>)
  }else{
    return (
      <div className={classes.newView}>
        <div className="grid wide">
          <div className="row">
            <div className="col">
              <div className={classes.newTitle}>
                <h1>{newInfo.title}</h1>
              </div>
              <div className={classes.newDate}>
                <span><i className='fa-solid fa-calendar'> {date.toLocaleString()}</i></span>
              </div>
              <div className={classes.newDSC}>
                <div className={classes[`new-img`]}>
                  <img src={newInfo.image} alt="" />
                </div>
                <p>{newInfo.content.map((content, index) => {
                  return <p key={index}>{content}</p>
                })}</p>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  }
 

export default NewView