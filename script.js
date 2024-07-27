const SliderLength=document.querySelector("[slider-movement]");
const passwordlength=document.querySelector("[pl]");
const pd=document.querySelector("[password-display]");
const uc=document.querySelector("#uppercase");
const lc=document.querySelector("#Includelowercase");
const In=document.querySelector("#Includenumbers");
const sym=document.querySelector("#Includesymbols");
const generatebtn=document.querySelector("[g-btn]");
const circle=document.querySelector("[strength-color]");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const cpybtn=document.querySelector("[data-copy]");
const cpytext=document.querySelector("[data-copy-text]")
const symbols='~`!@#$%^&*():"}{<>?/,;';

let psswrd="";
let psswrdlen=10;
let checkcount=0;

handleslider();


// color of circle is gray

function handleslider(){
    SliderLength.value=psswrdlen;
    passwordlength.innerText=psswrdlen;

    const min=SliderLength.min;
    const max=SliderLength.max;
    SliderLength.style.backgroundSize=((psswrdlen-min)*100/(max-min))+ "% 100% "       

}

setIndicator("#CCC");

function getrandomInteger(min,max){
    

   return Math.floor(Math.random()*(max-min))+min;


}

function generateRandomNumber(){
    return getrandomInteger(0,9)
}


function lowercase()
{
     return String.fromCharCode(getrandomInteger(97,123));
}

function uppercase()
{
    return String.fromCharCode(getrandomInteger(63,91));
}

function getsymbol(){
    const randnum=getrandomInteger(0,symbols.length);
    return symbols.charAt(randnum)
}


function setIndicator(color){
    circle.style.backgroundColor=color;
    circle.style.boxShadow= `0px 0px 12px 1px ${color}`;

}

//  weathr the password is strong or weak
function CalcStrength(){
    let hasupper=false;
    let haslower=false;
    let hasNum=false;
    let hasSym=false;

    if(uc.checked) hasupper=true;
    if(lc.checked) haslower=true;
    if(In.checked) hasnum=true;
    if(sym.checked) hasSym=true;


    if(hasupper && haslower && (hasNum||hasSym)&& psswrdlen>=8){
        setIndicator("#0f0");
    }

    else if((haslower||hasupper) &&(hasNum||hasSym)&& psswrdlen>=6)
        {
            setIndicator("#ff0");
        }
    

    else{
        setIndicator("#f0f")
    }

}

async function CopyContent(){

    try
    {
       await navigator.clipboard.writeText( pd.value )
       cpytext.innerText="copied!"
    }

    catch{

        cpytext.innerText="failed";

    }
    cpytext.classList.add("active");

    setTimeout(()=>{
        cpytext.classList.remove("active")
    },1000)

    
}




SliderLength.addEventListener('input',(e)=>{
    psswrdlen= e.target.value;
    handleslider();
});

cpybtn.addEventListener('click',()=>{
    if(pd.value)
    {
        CopyContent();
    }
})





function handleCheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        {
            checkcount++;
        }
    });

    console.log(checkcount);
    if(psswrdlen<checkcount){
        psswrdlen=checkcount;
        handleslider();

    }
    
    
    
}

function shufflepassword(array){
    // fisher yates method

    for( let i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    let str="";
    array.forEach((el)=>(str+=el));

    return str;

}

allcheckbox.forEach((checkbox)=>
{
    checkbox.addEventListener('change',handleCheckboxchange);
});

generatebtn.addEventListener("click",()=>{
      
    if(checkcount<=0)
    {
        return;
    }
    if(psswrdlen<checkcount){
        psswrdlen=checkcount;
        handleslider();
    }

    psswrd="";

    console.log(" reached in finally")

    // if(uc.checked){
    //     psswrd+=uppercase();
    // }

    // if(lc.checked){
    //     psswrd+=lowercase();
    // }

    // if(sym.checked){
    //     psswrd+=getsymbol();
    // }

    // if(In.checked){
    //     psswrd+=generateRandomNumber();
    // }

      let funcarr=[];

      if(uc.checked)
      {
          funcarr.push(uppercase());
          console.log("reached in first module")
      }
      if(lc.checked)
        {
           funcarr.push(lowercase());
           console.log("reached in first module 2")
        }
      if(sym.checked)
        {
           funcarr.push(getsymbol());
        }  
      if(In.checked)
        {
            funcarr.push(generateRandomNumber());
        }

        console.log(" reached in last module3")

    //  compusory 
    
    
    for(let i=0;i<funcarr.length;i++)
    {
        psswrd+=funcarr[i];
    }

    console.log(" for loop checked")

    for( let i=0; i<psswrdlen-funcarr.length;i++)

    {
        let randIndex=getrandomInteger(0,funcarr.length);
        psswrd+=funcarr[randIndex];
    }
    console.log(psswrd);



    psswrd=shufflepassword(Array.from(psswrd));

    pd.value=psswrd;



    CalcStrength();
});