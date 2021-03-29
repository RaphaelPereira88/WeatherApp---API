
document.getElementById("country").addEventListener('click',()=>{
    document.getElementById("country").style.borderColor = "black";
});

/* Event listener that will trigger the API call function and gather all the user datas and API 
datas that the server will then add to the js object projectData */
document.getElementById('generate').addEventListener('click',action);

function action(e){
    const newZip = document.getElementById('zip').value;
    const country= document.getElementById('country').value;
    const newContent = document.getElementById('feelings').value;
    let countryComma = ',';
    let baseURL ='https://api.openweathermap.org/data/2.5/weather?q=';
    let apiKey = "&units=metric&appid=c3ce4cd3a2dad80331ebdf71257604b6";

    /*Create a new date instance dynamically with JS*/
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    document.getElementById("date").value = newDate;
    const newTime = document.getElementById("date").value;

    if (country ==="0" ){
        alert("please select a country first");
        document.getElementById("country").style.borderColor = "red";
        window.stop();
    }else{
        getCity(baseURL, newZip,countryComma,country, apiKey)
        /*to tell the program to do this task after the previous one */
        .then(function(data){
            postData("/save", { date:newTime, name: data.name, temp:data.main.temp, 
                description:data.weather[0].description, content:newContent, icon:data.weather[0].icon })
        /*to get the data from projectdata (the js object) displayed on the browser*/
        .then(updateUI())
        });
    }
}


/*API Call function*/
/*Get request function using Fetch to make a dynamic url query*/

const getCity = async (baseURL, zip, countryComma, country, key) =>{
    const res = await fetch(baseURL+ zip + countryComma + country + key )
    try{
        const data = await res.json();
        console.log(data);
        return data
    }catch(err){
        console.log("error",error);
        alert("error");
    }
}

/*POST request function*/
const postData = async ( url = '', data = {})=>{
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try {
        const newData = await res.json();
        return newData;
    }catch(error) {
        console.log( "rrrrrrrrr", error);
    }
};

/* with fetch, I 'm gonna call the data from the js object projectData*/
const updateUI = async() => {
    const request = await fetch("/all")
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ "℃";
        document.getElementById('name').innerHTML = allData.name;
        document.getElementById('description').innerHTML = allData.description;
        icon.setAttribute("src", "http://openweathermap.org/img/wn/"+ allData.icon +"@2x.png");
        document.getElementById('feeling_note').innerHTML = allData.content;
    }catch(error){
        console.log("error", error);
    }
}
