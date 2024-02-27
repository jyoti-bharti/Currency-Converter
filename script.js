const baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

document.addEventListener("load", ()=>{
    updateExchange();
})

for (let select of dropdowns){
    for (currCode in countryList){
        // console.log(currCode,countryList[currCode]);
        let nwOption=document.createElement("option");
        nwOption.innerText=currCode;
        nwOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            nwOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            nwOption.selected = "selected";
        }
        select.append(nwOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlg(evt.target);

    });
}

const updateFlg = (element) => {
    let currCode= element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];//IN,EU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();//stop all the automatic bahavior that was happening on click of button.
    updateExchange();
});

const updateExchange = async ()=>{
    let amt= document.querySelector(".amount input");
    let amtVal= amt.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);
     let URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
     let data = await response.json();
    //  console.log(data);
     let rate = data[toCurr.value.toLowerCase()];
    //  console.log(rate);
    //  console.log(amtVal);
     let finalAmt = rate * amtVal;
    //  console.log(finalAmt);
     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

}

window.addEventListener("load", ()=>{
    updateExchange();
})