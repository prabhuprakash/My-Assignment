
async function getText(text) {
    let apiCall = "http://www.omdbapi.com/?apikey=f4741886&s="+text;
    let recievedData = await fetch(apiCall);
    const data = JSON.parse(await recievedData.text());
    let t="";
    data.Search.forEach(movie=>{
      t+=`<div id="class2"><img src="${movie.Poster}"> <br>Title : ${movie.Title} <br> Year : ${movie.Year} <br></div>`;
    })
    document.getElementById("p1").innerHTML=t;
  }