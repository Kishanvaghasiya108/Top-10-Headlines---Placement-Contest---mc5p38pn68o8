import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  const API_KEY = '88a5e95de52692e73f1f2a439dadc668';
  const API_URL = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&max=10&lang=en`;

 useEffect(()=>{
  setLoading(true);
  fetch(API_URL).then(response => response.json()).then(data=>{
    setNewsData(data.articles);
    setLoading(false);
  }).catch(error => console.log(error));
 },[category]);
 
 const handleCategoryChange = (e) =>{
  setCategory(e.target.value);
 }

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (
      <p className='loader'>Loading...</p>
      ) : (
      <ol>
        {newsData.map((article,index)=>(
           <li key={index}>
           <img className='news-img' src={article.image} alt={article.title}/>
           <section className='new-title-content-author'>
             <h3 className='news-title'>{article.title}</h3>
             <section className='new-content-author'>
               <p className='news-description'>{article.description}</p>
               <p className='news-source'><strong>Source:</strong> {article.source.name}</p>
             </section>
           </section>
         </li>
        ))}
       
      </ol>
      )}
    </div>
  );
}


export default App;
