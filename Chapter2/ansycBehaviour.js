function asyncFunction(callback){
    setTimeout(callback, 200)
}
let colour = 'blue';
asyncFunction(() => {
    console.log(`The colour is ${colour}`)
});
colour = 'green';