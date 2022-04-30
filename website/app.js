let projectData = {};
//const api_source =" https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} ";
const base_url ="https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=11be3dd2b08ab432adf634545425c1f9&units=imperial";
const presentDate = new Date();
let text = "empty textarea"; 
const temp = document.querySelector("#temp");
const dateOutput = document.querySelector("#date"); 
const user_input = document.querySelector("#user_input");
const icon = document.querySelector("#icon");
const description = document.querySelector("#discription");
let description_value = undefined;
let icon_value = undefined;

//fetching the query submit input node from our document 
const generate = document.querySelector("#generate");




/*
this is the event listener for the submit input, it listens for a click event. 
*/
generate.addEventListener("click", (event) => {
  event.preventDefault();

  //getting the zip code from the input any time
  let zip_code = document.querySelector("#zip_code").value;
  //getting the text from the input .
  text = document.querySelector("#feeling").value;
  console.log(zip_code);
  console.log(text);
  //combinning the full url to fetch the api from the weather site .
  api_url = `${base_url}${zip_code}${api_key}`;
  //fetching the api result if found
  fetchData(api_url).then((result_in_json) => {
    //passing the data we got from the weather api, that is stored in
    //result_in_json which was return by the fetchData function to the next
    // execution of the promise , so as to filter the data for final
    //output / post
    dataForOutput(result_in_json).then((message) => {
      //console.log(message);
      data_to_be_posted("/post", message);
      getData("/getdata").then((message) => {
        updateDom(message);
      });
    });
  });

  //cleansing our data to return to server
})




/*
    * fetchData : the fetchData function takes the api_url variable as an argument whose function is commented at line 34, 
    with this api_url the data is fetched , converted to json format and return it in result_in_json variable if there was a succesfull 
    resource fetch, but if not , take the object returned and pass it as our result_in_json . 
*/
const fetchData = async (api_url) => {
    try 
    {
        const result = await fetch(api_url); 
        const result_in_json = await result.json(); 
        console.log(result_in_json);
        icon_value = result_in_json["weather"][0].icon;
        description_value = result_in_json["weather"][0].description;
        if(result_in_json.cod === 200) 
        {
            return result_in_json;
        }
        else 
        {
            console.log(result_in_json.message);
            return result_in_json;
        }
        
            
    }
    catch(error) 
    {
        console.log(error);
    }


} 

/*
    *dataForOutput : The dataForOutput function recieves the return object from the fetchData function which is asynchronous 
    filter only the neccessary properties we need for out output if the api value was returned , but if the exception object 
    was return it simply returns it to the next object . 
*/
const dataForOutput = async (return_data_in_json) => {

    try 
    {
        
        if(return_data_in_json.message) 
        {
            const message = return_data_in_json;
            return message;
        }
        else 
        {
            const message = 
            {
                date: presentDate, 
                feelings : text, 
                temp : return_data_in_json.main.temp
            }
            return message;
        }

    }
    catch(error) 
    {
        console.error(error);
    }
    
}

/*
    *data_to_be_posted : This asynchronous function returns whatever value we get from the dataForOutput to the server 
    using a post method to the url that is passed to the url parameter . 
*/
const data_to_be_posted = async(url="", data={}) => {
    //fetch data from a post request made in the server 
    const result = await fetch(url, {
        method : "POST", 
        credentials : "same-origin", 
        headers: {
            "Content-Type" : "application/json",
        }, 
        body:JSON.stringify(data)
    });

    try 
    {
        const res = await result.json();
        return res;
    }
    catch(err) 
    {
        console.error(err);
    }
}


/* 
    getData : fetches our object from the server at the url that is passed to it url parameter 
    and return it as response . 
*/
getData = async (url) => {
    const data = await fetch(url) ;
    try 
    {
        const response = await data.json();
        return response; 
    }
    catch(err) 
    {
        console.error(err) ; 
    }
}


/* 
    updateDom : takes the value from return from getData function , then pass it to our output section in the dom 
    as our users feed back . 
*/
const updateDom = async (data) => {

    const res = await data;
    //console.log(res);
    if(res.message) 
    {
        //if the api fetch was not successfull send a recheck message . 
        temp.innerHTML = `${res.message}, please recheck you zip code`;
    }
    else
    {
        //update our dom with the value passed to them if the actual api result was fetched
        temp.innerHTML = `The current temperature is : ${res.temp}f `;
        dateOutput.innerHTML = `Date : ${presentDate}`;
        user_input.innerHTML = `Your feelings are : ${text}`;
        icon.src = "https://openweathermap.org/img/wn/" +  icon_value + "@2x.png";
        description.innerHTML = `${description_value}`;
    }

    
}