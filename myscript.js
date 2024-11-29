
async function getText(text) {
    let p = "http://www.omdbapi.com/?apikey=f4741886&t="+text;
    let x = await fetch(p);
    let y = JSON.parse(await x.text());
    let l="";
    console.log(typeof(y));
    for(var k in y){
        //console.log(k + ': ' + y[k] +'<br>');
        if(k!='Ratings')
        l +=`${k}  ': '  ${y[k]} '<br>'`;
    }
    document.getElementById("p1").innerHTML=l;
  }