const url = 'https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/%7Bname%7D/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '031c0154bemsh5323774fbe1bec1p1e9fa8jsnd949c31431eb',
		'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	display(result);

} catch (error) {
	console.error(error);
}
function display(result){
    document.getElementById("p1").innerHTML=result;
}