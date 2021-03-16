function scrollTable(divName, tableName, number){ //Scroll the scrollbar to a certain row in a table
    var line = document.getElementById(tableName).rows[number];
    $("#" + divName).animate({scrollTop:line.offsetTop},"slow"); //定位tr
}

function deleteALLRows(tableName){
    var table = document.getElementById(tableName);
    var l = table.rows.length;
    if(l > 1){
        for(i = l-1; i>0; i--){
            table.deleteRow(i);
        }
    }
}

function compareRegisters(newData){ // Return the rows that have been changed in the register table
    var tableName = "rTable";
    var alteredRegisters = new Array();
    var originData = new Array();
    var table = document.getElementById(tableName);
    var i;
    for(i=1; i<table.rows.length; i++){
        originData.push(table.rows[i].cells[1].innerHTML);
    }
    for(i=0; i<table.rows.length-1; i++){
        if(originData[i]!=newData[i]){
            alteredRegisters.push(i+1); //Because the first line is the table's head
        }
    }
    return alteredRegisters; //This data can be passed to setHighlight function
}

function clearTable(tableName){ //Remove all highlighted rows from a table
    var table = document.getElementById(tableName);
    for(var i=0; i<table.rows.length; i++){
        table.rows[i].classList.remove("highlightRow");
        table.rows[i].classList.remove("framePointer");
        table.rows[i].classList.remove("stackPointer");
    }
}

function setHighlight(tableName, rowNumbers){ //Set highlighted rows in a table
    var table = document.getElementById(tableName);
    for(var i=0; i<rowNumbers.length; i++){
        table.rows[rowNumbers[i]].classList.add("highlightRow");
    }
}


function initializeIM(){
    deleteALLRows("IMTable");
    var table = document.getElementById("IMTable");
    var machineCodes = cpu.getMachineCode();
    var index = 4194304;
    for(var a=0; a<machineCodes.length; a++){
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = index.toString(16);
        cell2.innerHTML = machineCodes[a];
        index += 4;
    }
}

function refreshDM(){
    deleteALLRows("DMTable");
    clearTable("DMTable");
    let data = cpu.getDynamicData();
    let a=0;
    let table = document.getElementById("DMTable");
    for(a=0; a<data.length; a++){
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data[a][0];
        cell2.innerHTML = data[a][1];
    }
    if(table.rows.length != 1){
        let fp = setFP();
        setSP();
        scrollTable("dynamicTable","DMTable", fp);
    }
}

function initializeSM(){
    deleteALLRows("SMTable");
    let data = cpu.getStaticData();
    let a=0;
    let table = document.getElementById("SMTable");
    for(a=0; a<data.length; a++){
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data[a][0];
        cell2.innerHTML = data[a][1];
    }
}

function setFP(){
    let table = document.getElementById("DMTable");
    let rTable = document.getElementById("rTable");
    let FPAddress = rTable.rows[31].cells[1].innerHTML;
    let a;
    for(a=1; a<table.rows.length; a++){
        if(table.rows[a].cells[0].innerHTML == FPAddress){
            table.rows[a].classList.add("framePointer");
            return a;
        }
    }
}

function setSP(){
    let table = document.getElementById("DMTable");
    let rTable = document.getElementById("rTable");
    let SPAddress = rTable.rows[30].cells[1].innerHTML;
    let a;
    for(a=0; a<table.rows.length; a++){
        if(table.rows[a].cells[0].innerHTML == SPAddress){
            table.rows[a].classList.add("stackPointer");
            break;
        }
    }
}

function initializeRegisters(){
    var data = cpu.debugReg();
    var table = document.getElementById("rTable");
    var i;
    for(i=1; i<table.rows.length; i++){
        table.rows[i].cells[1].innerHTML = data[i-1];
    }
    clearTable("rTable");
}

function refreshRegisters(){
    clearTable("rTable");
    let data = cpu.debugReg();
    let altered = compareRegisters(data);
    var table = document.getElementById("rTable");
    var i;
    for(i=0; i<altered.length; i++){

        table.rows[altered[i]].cells[1].innerHTML = data[altered[i]-1];
        table.rows[altered[i]].classList.add("highlightRow");
    }
    if(altered.length != 0){
        scrollTable("registerTable", "rTable", altered[0]);
    }
}

function refreshIM(){
    clearTable("IMTable");
    let current = cpu.getCurrentInsAddr();
    current = parseInt(current, 2).toString(16);
    let table = document.getElementById("IMTable");
    var i;
    for(i=1; i<table.rows.length; i++){
        if(table.rows[i].cells[0].innerHTML == current) {
            table.rows[i].classList.add("highlightRow");
            scrollTable("instructionTable","IMTable", i);
            break;
        }
    }
}
