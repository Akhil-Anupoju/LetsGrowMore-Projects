const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function updateClock(){
    var now=new Date();
    var dname=now.getDay(),
        mo=now.getMonth();
        dnum=now.getDate();
        yr=now.getFullYear();
        hou=now.getHours();
        min=now.getMinutes();
        sec=now.getSeconds();
        pe="AM";

        if(hou==0){
            hou=12;
        }
        if(hou>12){
            hou=hou-12;
            pe="PM";
        }

        Number.prototype.pad=function(digits){
            for(var n=this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months=['January','February','March','April','May','June','July','Augest','September','October','November','December'];
        var week=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var ids=['dayname','month','daynum','year','hour','minutes','seconds','period'];
        var values=[week[dname],months[mo],dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        for(var i=0;i<ids.length;i++)
        document.getElementById(ids[i]).firstChild.nodeValue=values[i];

}

function initClock(){
    updateClock()
        window.setInterval("updateClock()",1);
}

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML='<i class="ri-chat-delete-line"></i>';
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
        li.appendChild(span);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}

function clearData() {
    localStorage.removeItem("data");
    listContainer.innerHTML = ""; // Clear the displayed tasks on the page
}
// clearData()
showTask();