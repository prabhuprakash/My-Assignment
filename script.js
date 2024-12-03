
async function getText(text) {
    //let apiCall = "http://www.omdbapi.com/?apikey=f4741886&s="+text;
    let apiCall = "https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/movies";
    let recievedData = await fetch(apiCall);
    if (!recievedData.ok) {
      throw new Error(`HTTP error! Status: ${recievedData.status}`);
    }
    const data = await recievedData.json();
    console.log(recievedData);
    console.log(typeof(recievedData));
    //console.log(typeof(data));
    let t="";
    data.forEach(movie=>{
      t+=`<div id="class2"><img src="${movie.Poster}"> <br>Title : ${movie.title} <br> Year : ${movie.year} <br></div>`;
    })
    document.getElementById("p1").innerHTML=t;
  }
  document.addEventListener("DOMContentLoaded", function() {
    // You can now safely call getText or other functions that rely on the DOM being ready
    getText(""); // You can pass a default query or leave it empty
});