export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': "f629eddbb0msh9b1a0a171c6cab0p18c4f5jsnaa3b0a68400d",
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const fetchData =async(url, options) =>{
    const response = await fetch(url, options);
    const data= await response.json();
    return data;
}