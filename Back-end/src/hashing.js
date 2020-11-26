function getUniqueURL(){
    const B62_EXPRESSION="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let text="";
    for(let i=0;i<5;i++){
        text+=B62_EXPRESSION.charAt(Math.floor(Math.random()*62))
    }
    return text;
}

module.exports=getUniqueURL;
//console.log(getUniqueURL());