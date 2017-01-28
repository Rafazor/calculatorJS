var numbers = document.querySelectorAll("button");
var numDisplay = document.querySelector("#numDisplay");
var opDisplay = document.querySelector("#opDisplay");
var acBtn = document.querySelector("#acBtn");
var pointBtn = document.querySelector("#pointBtn");
var ceBtn = document.querySelector("#ceBtn");
var num;
var rezFinal;
var rezPart = [];
var digitCount = 0;
var composeNum = [];
var composeOp = [];
var finalNum; 

for(var i= 0; i < numbers.length; i++){
    numbers[i].addEventListener("click", function(){
        if(Number(this.textContent) >=0){
            num = this.textContent;
            buildNum(num);
            makeOp(num);
            testLength();        
        } else if(this.textContent == "+" && checkForOp() != 0){
            choseOp("+");
            rezPart.push(finalNum);
            rezPart.push("+");
            rezultate();
        } else if(this.textContent == "-" && checkForOp() != 0){
            choseOp("-");
            rezPart.push(finalNum);
            rezPart.push("-");
            rezultate();
        } else if(this.textContent == "X" && checkForOp() != 0){
            choseOp("x");
            rezPart.push(finalNum);
            rezPart.push("x");
            rezultate();
        } else if(this.textContent == "/" && checkForOp() != 0){
            choseOp("/");
            rezPart.push(finalNum);
            rezPart.push("/");
            rezultate();
        } else if(this.textContent == "=" && checkForOp() != 0){ 
            rezPart.push(finalNum);
            rezPart.push("=");
            rezultate();           
            makeOp("=" + (Math.round(rezFinal * 100) / 100));
            numDisplay.textContent = Math.round(rezFinal * 100) / 100;
            rezPart = [];
            composeNum = [];
            composeOp = [];           
        }           
    });  
}

pointBtn.addEventListener("click", function(){
    if (checkForOp() != 0){
        composeNum.push(".");
        composeOp.push(".");
        numDisplay.textContent = composeNum.join("");
        opDisplay.textContent = composeOp.join("");
    }    
});

// ceBtn.addEventListener("click", function(){
//     composeNum.pop();
//     composeOp.pop();
//     numDisplay.textContent = composeNum.join("");
//     opDisplay.textContent = composeOp.join("");
    
// });

function removeUsedElements(){ 
    rezPart.splice(0, 3);
    rezPart.unshift(rezFinal);
}

function rezultate(){
    if(rezPart.length >= 3 && rezPart[1] === "+"){
        rezFinal = rezPart[0] + rezPart[2];
       removeUsedElements();
    }
    if(rezPart.length >= 3 && rezPart[1] === "-"){
         rezFinal = rezPart[0] - rezPart[2];
       removeUsedElements();
    }
    if(rezPart.length >= 3 && rezPart[1] === "x"){
         rezFinal = rezPart[0] * rezPart[2];
       removeUsedElements();
    }
    if(rezPart.length >= 3 && rezPart[1] === "/"){
        rezFinal = rezPart[0] / rezPart[2];
       removeUsedElements();
    }   
}

function checkForOp(){
    var signs = ["+", "-", "x", "/", "=", "."];
    for(var i = 0; i < signs.length; i++){
        if(composeOp[composeOp.length - 1] === signs[i] || composeOp[composeOp.length] === signs[i] || composeOp.length === 0){
            return 0;
        };
    };
    return 1;
}

function choseOp(sign){
    makeOp(sign);
    numDisplay.textContent = sign;
    composeNum = [];
}

function buildNum(num){
   composeNum.push(num);
   numDisplay.textContent = composeNum.join("");
   finalNum = Number(composeNum.join(""));                            
};

function makeOp(op){
    composeOp.push(op);
    opDisplay.textContent = composeOp.join("");
};

function testLength(){
     if(composeNum.length > 8){
       composeOp = []; 
       opDisplay.textContent = "Digit Limit Met";
       composeNum = [];
       numDisplay.textContent = 0;
     };
     if(composeOp.length > 20){
       composeOp = []; 
       opDisplay.textContent = "Digit Limit Met";
       composeNum = [];
       numDisplay.textContent = 0;
     }
};

acBtn.addEventListener("click", function(){
    composeOp = []; 
    composeNum = [];
    rezPart = [];
    numDisplay.textContent = 0;
    opDisplay.textContent = "op";
});