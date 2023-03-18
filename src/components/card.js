import axios from "axios"
import { response } from "msw"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //


const articleWrap = document.createElement('div')
const headline = document.createElement('div')
const author = document.createElement('div')
const iCon = document.createElement('div')
const iAut = document.createElement('img')
const aName = document.createElement('span')

articleWrap.classList.add('card')
headline.classList.add('headline')
author.classList.add('author')
iCon.classList.add('img-container')

headline.textContent = article.headline
aName.textContent = `${article.authorName}`
iAut.src = article.authorPhoto

articleWrap.appendChild(headline)
articleWrap.appendChild(author)
author.appendChild(iCon)
author.appendChild(aName)
iCon.appendChild(iAut)

articleWrap.addEventListener('click', ()=>{
    console.log(headline.textContent)
})

return articleWrap

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

axios.get(`http://localhost:5001/api/articles`).then(response =>{
  for (const key in response.data.articles){
    response.data.articles[key].forEach(article=>{
      const newCard = Card(article)
      document.querySelector(selector).appendChild(newCard)
    })
  }
})


}

export { Card, cardAppender }
