
// variables
// will store set alarms
let alarmListArr = []; 
// function to set alarms
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
// no of alarm 
let alarmCount = 0;
// store set alarms
let alarmTime;
let ring = new Audio("miley_cyrus_flowers.mp3");


// Script for Time and Date


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 

let isAlarmRinging = false;

function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);

// function checkAlarm() {
//     setInterval(() => {
//         var now = new Date();
//         var hou = now.getHours();
//         var min = now.getMinutes();
//         var sec = now.getSeconds();
//         var pe = "AM";

//         if (hou == 0) {
//             hou = 12;
//         }

//         if (hou > 12) {
//             hou -= 12;
//             pe = "PM";
//         }

//         for (let i = 0; i < alarmListArr.length; i++) {
//             if (alarmListArr[i] == `${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`) {
//                 if (!isAlarmRinging) {
//                     console.log("Alarm ringing...");
//                     ring.load();
//                     ring.play();
//                     isAlarmRinging = true;
//                     document.querySelector("#stopAlarm").style.visibility = "visible";
//                 }
//                 break; // Stop checking further alarms if one is triggered
//             }
//         }
//     }, 1000);
// }
function checkAlarm() {
    setInterval(() => {
        var now = new Date();
        var hou = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var pe = "AM";

        if (hou == 0) {
            hou = 12;
        }

        if (hou > 12) {
            hou -= 12;
            pe = "PM";
        }

        for (let i = 0; i < alarmListArr.length; i++) {
            if (alarmListArr[i] == `${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`) {
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                // document.querySelector("#stopAlarm").style.visibility = "visible";
            }
        }
    }, 1000);
}



//delete alarm

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}
//  looping music 
ring.addEventListener('ended', function() {
    // When the audio ends, load and play it again
    ring.load();
    ring.play();
  });
  ring.play();

// function stopAlarm(){
//     ring.pause();
//     isAlarmRinging = false;
//     document.querySelector("#stopAlarm").style.visibility= "hidden";
// }
