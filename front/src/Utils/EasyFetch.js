

export const EasyFetch = (Url, Data = null, Method, Token = null) => {

    const BaseURL = "http://localhost:3000/api/v1/";
    const Body = Data !== null ? JSON.stringify(Data) : [];
    const CurrentUrl = BaseURL+Url;

    const Header = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+Token
    }

    let Init = {
        method : Method,
        headers : Header,
        body : Body
    }

    return fetch(CurrentUrl, Init)
        .then(res=>  res.json())
        .then(res =>  res )

}
