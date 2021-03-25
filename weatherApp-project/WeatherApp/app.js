

/*Get request using Fetch to make a dynamic url query*/
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
    .then(function(data){
        console.log(data)
        postData("/", { date:newTime, temp:data, content:newContent });
    })
}

let baseURL ='https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = "&appid=c3ce4cd3a2dad80331ebdf71257604b6";



/*API Call function*/
const getCity = async (baseURL, zip, key) =>{
    const res = await fetch(baseURL+ zip+ key )
    try{
        const data = await res.json();
        console.log(data);
    }
    catch(error){
        console.log("error",error);
    }
}


/*POST request function*/
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log( "error")
    }
};

