

export const EasyFetch = (Url, Data = null, Method, Token = null) => {

    const BaseURL = "http://localhost:8000/";
    const Body = Data !== null ? JSON.stringify(Data) : [];
    const CurrentUrl = BaseURL+Url;

    const Header = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+Token
    }

    let InitGET = {
        method : Method,
        headers : Header
    }

    let InitPost = {
        method : Method,
        headers : Header,
        body : Body
    }

    let Init = InitGET;
    if(Data)
    Init = InitPost;

    return fetch(CurrentUrl, Init)
        .then(res=>  res.json())
        .then(res =>  res )

}
