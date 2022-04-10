let mainCont = document.querySelector('.main-cont');
let addbtn = document.querySelector(".add-btn");
let removebtn = document.querySelector(".remove-btn");
let textArea = document.querySelector(".textarea-cont");
let flag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let modalcont = document.querySelector(".modal-cont")

let allPriorityColors = document.querySelectorAll(".prioritycolors");
let colors  = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length -1];                     
// Listener for modal priority-color

allPriorityColors.forEach((colorEle , idx) => {
    colorEle.addEventListener('click',(e)=>{
        allPriorityColors.forEach((priorityColorEle ,idx)=>{
            priorityColorEle.classList.remove('border');
        })
        colorEle.classList.add("border");
        modalPriorityColor = colorEle.classList[0];
        // console.log(modalPriorityColor);       
   })  
});
addbtn.addEventListener("click" , (e)=>
{
    flag = !flag;

    if(flag == true )
    {
        modalcont.style.display = "flex";
    }
    else{
        modalcont.style.display = "none";
    }
})

removebtn.addEventListener('click', (e)=>{
        
        removeFlag = !removeFlag;
        if(removeFlag === true)
        {
            removebtn.style.background  = "red";
        }
        else{
            removebtn.style.background  = "";
        }
})

modalcont.addEventListener("keydown",(e)=>{
    let key = e.key;

    if(key === "Shift")
    {
        createTicket(modalPriorityColor , textArea.value , shortid());
        modalcont.style.display = 'none';
        flag = false;
        textArea.value = "" ;
    }
})


function createTicket(ticketColor , ticketValue , uniqueId){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
                <div class="ticket-color ${ticketColor}"></div>
                <div class="ticket-id">${uniqueId}</div>
                <div class="task-area"> ${ticketValue}</div>
                <div class="ticket-lock"><i class="fas fa-lock"></i></div>
    `;
    mainCont.appendChild(ticketCont);
    handleRemove(ticketCont , uniqueId);
    handleLock(ticketCont);
    handleColor(ticketCont);

}

function handleRemove(ticket , uniqueId)
{
    // // console.log(uniqueId)   
    // let maincont  = document.querySelectorAll(".main-cont");
    // maincont.forEach((ele)=>{
    //     // console.log(ele);
    //     ele.addEventListener("click",(e)=>{
    //         let el = ele.childNodes;
    //         console.log(el[3].children[1].innerHTML);
    //         if(el[3].children[1].innerHTML === uniqueId)
    //         {
                
    //             // console.log(ticket)
    //         }
    //     })
    

    // })

    // singlecont.addEventListener("click",(e)=>{
    //         // if(removeFlag) ticket.remove();
    // })
   
}

function handleLock(ticket){
    let ticketLockEle = document.querySelector(".ticket-lock");
    let ticketTask  = document.querySelector(".task-area");

    let ticketLock = ticketLockEle.children[0];

    ticketLock.addEventListener("click",(e)=>{
        if(ticketLock.classList.contains(lockClass))
        {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTask.setAttribute("contenteditable" , "true");
        }
        else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTask.setAttribute("contenteditable" , "false");

        }
    })
    // console.log(ticketLock);

}

let lightpink  = colors[0]; 
let lightblue  = colors[1];
let lightgreen = colors[2];
let black      = colors[3];



function handleColor(ticket){
    
    let ticketcont = ticket.querySelector(".ticket-color");
    console.log(ticketcont);
        ticketcont.addEventListener("click", (e)=>{
            let currentColor = ticketcont.classList[1];
            if(currentColor === "black")
            {
            //  let index = colors.indexOf("black");
                console.log(currentColor)
                ticketcont.classList.remove("black");
                ticketcont.classList.add(lightpink);
              
            }
            else if(currentColor === "lightgreen")
            {
                console.log(currentColor);
                ticketcont.classList.remove("lightgreen");
                ticketcont.classList.add(black);

            }
            else if(currentColor === "lightblue")
            {
                console.log(currentColor);
                ticketcont.classList.remove("lightblue");
                ticketcont.classList.add(lightgreen);

            }
            else if(currentColor === "lightpink")
            {
                console.log(currentColor);
                ticketcont.classList.remove("lightpink");
                ticketcont.classList.add(lightblue);

            }

        })
    
    
}
    