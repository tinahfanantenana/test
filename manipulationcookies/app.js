function getCookies(name){
    const cookies=document.cookie.split(';');
    const result=cookies.find(c=>c.startsWith(name))?.split('=')[1];
    if(result===undefined){
        return null
    }
    return decodeURIComponent(result)
}

/**
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 * @returns 
 */
function setCookies(name, value, days){
    const date=new Date();
    date.setDate(date.getDate()+days);
    return document.cookie=`${name}=${encodeURIComponent(value)};expires=${date.toUTCString()}`
}0

s// setCookies('test', 'encore', 2);
// console.log(getCookies('hello'));

fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5',{
    credentials: 'include'
})


//l'option credentials ne suffit pas si l'on veut obtenir des informations sur les cookies d'un nom de domaine, les configurations sur certains valeurs du cookie doivent-être configuré (secure,samesite)