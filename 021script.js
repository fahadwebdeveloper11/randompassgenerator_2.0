let passwordLimit=document.querySelector('.password-limit');
let rangeInput=document.querySelector('.range');
let allCheckBoxes=document.querySelectorAll('.check-box');
let forUppercase=document.querySelector('#uppercase');
let forLowercase=document.querySelector('#lowercase');
let forNumber=document.querySelector('#number');
let forSymbol=document.querySelector('#symbol');
let light=document.querySelector('.light');
let passowrdDisplayer=document.querySelector('.pass')
let teller=document.querySelector('.teller')
let copyButton=document.querySelector('.copy-button')
let generateButton=document.querySelector('.generate-button')
let sym='`!@#$%^&*()::""<>.,/*}{][|?'
let limitValue=10;
passwordLimit.innerText=limitValue
function HandleSlider(){
    rangeInput.value=limitValue
    passwordLimit.innerText=limitValue
    const min=rangeInput.min;
    const max=rangeInput.max;
    rangeInput.style.backgroundSize= ( (limitValue - min) *100/ (max-min))+ "% 100%"
    
}
HandleSlider()
function randomIntegerGenerator(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateNumbers(){
    return randomIntegerGenerator(0,10);
}
function generateLowerCase(){
    return String.fromCharCode(randomIntegerGenerator(97,122));
}
function generateUpperCase(){
    return String.fromCharCode(randomIntegerGenerator(65,91));
}

function generateSymbol(){
    const num = randomIntegerGenerator(0,sym.length)
    return sym.charAt(num);
}

function gettingStrength(){
    let count=0;
    let upper=false;
    let lower=false;
    let number=false;
    let symbol=false;
    if(forUppercase.checked) {
        upper=true;
        count++;
    }
    if(forLowercase.checked) {
        lower=true;
        count++;
    }
    if(forNumber.checked) {
        number=true;
        count++;
    }
    if(forSymbol.checked) {
        symbol=true;
        count++;
    }
    if((count>=3 && limitValue>=6) || (count>=2&&limitValue>=10) || (count>=1 && limitValue>=10)){
        light.style.backgroundColor='lightgreen'
        light.style.boxShadow='1px 1px 10px green'
    }else{
        light.style.backgroundColor='red'
        light.style.boxShadow='1px 1px 10px red'
    }
}
 
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passowrdDisplayer.value)
        teller.innerText='Copied'
    }
    catch{
        teller.innerText='Failed'
    }
    teller.classList.add('active')
    setTimeout(()=>{
        teller.classList.remove('active')
        teller.innerText=''
    },1000)
}

rangeInput.addEventListener('input',()=>{
    limitValue=rangeInput.value;
    HandleSlider()
})

function handleCheckBoxChange(){
    let count=0;
    allCheckBoxes.forEach((checkBox)=>{
        if(checkBox.checked){
            count++;
        }
        if(limitValue<count){
            limitValue=count;
            HandleSlider()
        }
    })
}
allCheckBoxes.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange)
})

copyButton.addEventListener('click',()=>{
    if(passowrdDisplayer.value){
        copyContent()
    }
})

generateButton.addEventListener('click',()=>{
    let password='';
    let Array=[];
    if(forUppercase.checked) {
        Array.push(generateUpperCase)
    }
    if(forLowercase.checked){
        Array.push(generateLowerCase)
    }
    if(forNumber.checked){
        Array.push(generateNumbers)
    }
    if(forSymbol.checked){
        Array.push(generateSymbol)
    }

    // Must come values
    for(let i=0;i<Array.length;i++){
        password+=Array[i]();
    }
    // remaining values
    for(let i=0;i<limitValue-Array.length;i++){
        let randomInteger=randomIntegerGenerator(0,Array.length);
        password+=Array[randomInteger]();
    }
    passowrdDisplayer.value=password
    gettingStrength()
})