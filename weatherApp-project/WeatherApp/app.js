


/* Event listener that will trigger the API call function and gather all the user datas and API 
datas that the server will then add to the js object projectData */
document.getElementById('generate').addEventListener('click',action);

function action(e){
    const newZip = document.getElementById('zip').value;
    const newContent = document.getElementById('feelings').value;

    /*Create a new date instance dynamically with JS*/
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    document.getElementById("date").value = newDate;
    const newTime = document.getElementById("date").value;
    
    getCity(baseURL, newZip, apiKey)
    /*to tell the program to do this task after the previous one */
    .then(function(data){
        postData("/save", { date:newTime, temp:data.main.temp, content:newContent })
    /*to get the data from projectdata (the js object) displayed on the browser*/
    .then(updateUI())
    })
}


/*API Call function*/
/*Get request function using Fetch to make a dynamic url query*/
let baseURL ='https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = "&appid=c3ce4cd3a2dad80331ebdf71257604b6";

const getCity = async (baseURL, zip, key) =>{
    const res = await fetch(baseURL+ zip+ key )
    try{
        const data = await res.json();
        return data
    }
    catch(error){
        console.log("error",error);
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
        console.log( "error", error);
    }
};

/* with fetch, I 'm gonna call the data from the js object projectData*/
const updateUI = async() => {
    const request = await fetch("/all")
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].content;
    }catch(error){
        console.log("error", error);
    }
}

