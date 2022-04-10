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


let ticketArr = [];
let toolboxcolor = document.querySelectorAll(".color");

toolboxcolor.forEach((ele)=>{
       ele.addEventListener("click",(e)=>{
            let currentClickColor  = ele.classList[0];

            let filterTicket = ticketArr.filter((obj)=>{
                let fil = obj.ticketColor;
                return fil === currentClickColor;
            })

            console.log(filterTicket);

            let allticket = document.querySelectorAll(".ticket-cont");
            allticket.forEach((ele)=>{
                    ele.remove(); 
                    // console.log(ele)  
            })

            filterTicket.forEach((obj)=>{
                createTicket(obj.ticketColor , obj.ticketValue,obj.uniqueId);
            })

            })

             //COde to get all ticket return on double click on any color...
            ele.addEventListener("dblclick",(e)=>{
                let allticket = document.querySelectorAll(".ticket-cont");
                    allticket.forEach((obj)=>{
                    obj.remove();
                })
                ticketArr.forEach((obj)=>{
                    createTicket(obj.ticketColor , obj.ticketValue , obj.uniqueId);
                })

             });
    
});

allPriorityColors.forEach((colorEle , idx) => {
    colorEle.addEventListener('click',(e)=>{

        //to remove previous border 
        allPriorityColors.forEach((priorityColorEle ,idx)=>{
            priorityColorEle.classList.remove('border');
        })
        //Add border to clicked element 
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
        
        removeFlag =!removeFlag;
        if(removeFlag === true)
        {
            removebtn.style.background  = "red";
        }
        else{
            removebtn.style.background  = "";
        }
})

modalcont.addEventListener("keyup",(e)=>{
    let key = e.key;

    if(key === "Shift")
    {
        createTicket(modalPriorityColor , textArea.value);
        flag = false;
        defaultModel();
       
    }
})


function createTicket(ticketColor , ticketValue , uniqueId){
    let id = uniqueId || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
                <div class="ticket-color ${ticketColor}"></div>
                <div class="ticket-id">#${id}</div>
                <div class="task-area"> ${ticketValue}</div>
                <div class="ticket-lock"><i class="fas fa-lock"></i></div>
    `;
    mainCont.appendChild(ticketCont);

    if(!uniqueId) ticketArr.push({ticketColor , ticketValue , uniqueId: id });
    handleRemove(ticketCont , id);
    handleLock(ticketCont);
    handleColor(ticketCont);

}

function handleRemove(ticket , uniqueId)
{    
    // console.log(ticket);
    
            
        let allticket = document.querySelectorAll(".ticket-cont");
        // console.log(allticket)
        allticket.forEach((ele)=>{
            ele.addEventListener("click",(e)=>{
            
                if(removeFlag) ele.remove(); 
                // console.log(ele)               
                })
        })         
}

function handleLock(ticket){
    let ticketLockEle = ticket.querySelector(".ticket-lock");
    let ticketTask  = ticket.querySelector(".task-area");

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
    // console.log(ticketcont);
        ticketcont.addEventListener("click", (e)=>{
            let currentColor = ticketcont.classList[1];
            if(currentColor === "black")
            {
            //  let index = colors.indexOf("black");
                // console.log(currentColor)
                ticketcont.classList.remove("black");
                ticketcont.classList.add(lightpink);
              
            }
            else if(currentColor === "lightgreen")
            {
                // console.log(currentColor);
                ticketcont.classList.remove("lightgreen");
                ticketcont.classList.add(black);

            }
            else if(currentColor === "lightblue")
            {
                // console.log(currentColor);
                ticketcont.classList.remove("lightblue");
                ticketcont.classList.add(lightgreen);

            }
            else if(currentColor === "lightpink")
            {
                // console.log(currentColor);
                ticketcont.classList.remove("lightpink");
                ticketcont.classList.add(lightblue);

            }

        })
    
    
}
    
defaultModel();
// after creating model set model container to default 

function defaultModel(){
    allPriorityColors.forEach((colorEle , idx) => { 
        //to remove previous border 
        colorEle.classList.remove('border');
    })
    allPriorityColors[allPriorityColors.length -1].classList.add("border");
    modalPriorityColor = colors[colors.length -1];
    modalcont.style.display = 'none';
    textArea.value = "" ;
}