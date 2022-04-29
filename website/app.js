
//const api_source =" https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key} ";
const base_url ="https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=11be3dd2b08ab432adf634545425c1f9&units=imperial";
const date = new Date();
let text = "empty textarea"; 

//fetching the query submit input node from our document 
const generate = document.querySelector("#generate");





generate.addEventListener("click", (event) => {
  event.preventDefault();

  //getting the zip code from the input
  let zip_code = document.querySelector("#zip_code").value;
  //getting the text from the input .
  text = document.querySelector("#feeling").value;
  console.log(zip_code);
  console.log(text);
  api_url = `${base_url}${zip_code}${api_key}`;
  //fetching the api result if found 
  fetchData(api_url)
  .then((result_in_json) => {
      //passing the data we got from the weather api, that is stored in 
      //result_in_json which was return by the fetchData function to the next 
      // execution of the promise , so as to filter the data for final
      //output / post  
      dataForOutput(result_in_json)
      .then((message) => {
          console.log(message);
      })
  }) 
 
  //cleansing our data to return to server
  

})


const fetchData = async (api_url) => {
    try 
    {
        const result = await fetch(api_url); 
        const result_in_json = await result.json(); 
        if(result_in_json.cod === 200) 
        
            return result_in_json;
    }
    catch(error) 
    {
        console.log(error);
    }


} 


const dataForOutput = async (return_data_in_json) => {

    try 
    {
        if(return_data_in_json.message) 
        {
            const message = data.message;
            console.log(message);
            return message;
        }
        else 
        {
            const message = 
            {
                date: date, 
                feelings : text, 
                temp : return_data_in_json.main.temp
            }
            console.log(message);
            return message;
        }

    }
    catch(error) 
    {
        console.log(error);
    }
    
}


