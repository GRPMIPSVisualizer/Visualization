
function RChecker() {
    if ($('#pause').hasClass("fa-pause")) {

        if (insNum == 1) {
            $('#data1').css("animation-play-state", "paused");
            $('#data2').css("animation-play-state", "paused");
            $('#data3').css("animation-play-state", "paused");
        }
        else if (insNum == 2) {
            $('#data4').css("animation-play-state", "paused");
            $('#data42').css("animation-play-state", "paused");
            $('#data5').css("animation-play-state", "paused");
            $('#data6').css("animation-play-state", "paused");
            $('#data19').css("animation-play-state", "paused");
            $('#ALUOp').css("animation-play-state", "paused");
            $('#RegWrite').css("animation-play-state", "paused");
        }
        else if (insNum == 3) {
            $('#data7').css("animation-play-state", "paused");
            $('#data8').css("animation-play-state", "paused");
            $('#data9').css("animation-play-state", "paused");
            $('#data10').css("animation-play-state", "paused");
        }
        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "paused");
            $('#data12').css("animation-play-state", "paused");
            $('#data18').css("animation-play-state", "paused");
        }
        $('#pause').removeClass("fa-pause").addClass("fa-play");
        $('#pause').attr('title', 'play');
        $('#halfSpeed').css("pointer-events", "none");
        $('#doubleSpeed').css("pointer-events", "none");

    }

    else if ($('#pause').hasClass("fa-play")) {

        if (insNum == 1) {
            $('#data1').css("animation-play-state", "running");
            $('#data2').css("animation-play-state", "running");
            $('#data3').css("animation-play-state", "running");
        }
        else if (insNum == 2) {
            $('#data4').css("animation-play-state", "running");
            $('#data42').css("animation-play-state", "running");
            $('#data5').css("animation-play-state", "running");
            $('#data6').css("animation-play-state", "running");
            $('#data19').css("animation-play-state", "running");
            $('#ALUOp').css("animation-play-state", "running");
            $('#RegWrite').css("animation-play-state", "running");
        }
        else if (insNum == 3) {
            $('#data7').css("animation-play-state", "running");
            $('#data8').css("animation-play-state", "running");
            $('#data9').css("animation-play-state", "running");
            $('#data10').css("animation-play-state", "running");
        }
        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "running");
            $('#data12').css("animation-play-state", "running");
            $('#data18').css("animation-play-state", "running");
        }
        $('#pause').removeClass("fa-play").addClass("fa-pause");
        $('#pause').attr('title', 'pause');
        $('#halfSpeed').css("pointer-events", "auto");
        $('#doubleSpeed').css("pointer-events", "auto");
    }
};

function RBind(){
    /*暂停*/
    $('#pause').click(function () {
        RChecker();
    });

    $("#data3").bind("animationend", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        $('#data3').css("animation", "none");
        $('#data3_1').css("opacity", "1");
        if(sequenceFlag == 1){
            addStep2();
        }
    });
    $("#data1").bind("animationend", function () {
        $('#data1').css("animation-play-state", "paused");
        $('#data1').css("animation", "none");
    });
    $("#data2").bind("animationend", function () {
        refreshIM();
        $('#data2').css("animation-play-state", "paused");
        $('#data2').css("animation", "none");
    });


    $("#data4").bind("animationend", function () {
        $('#data4').css("animation-play-state", "paused");
        $('#data4').css("animation", "none");
    });
    $("#data42").bind("animationend", function () {
        $('#data42').css("animation-play-state", "paused");
        $('#data42').css("animation", "none");
    });
    $("#data5").bind("animationend", function () {
        $('#data5').css("animation-play-state", "paused");
        $('#data5').css("animation", "none");
    });
    $("#data6").bind("animationend", function () {
        $('#data6').css("animation-play-state", "paused");
        $('#data6').css("animation", "none");
    });
    $("#ALUOp").bind("animationend", function () {
        $('#ALUOp').css("animation-play-state", "paused");
        alert("yo");
    });
    $("#RegWrite").bind("animationend", function () {
        $('#RegWrite').css("animation-play-state", "paused");
        alert("bro");
    });

    $("#data19").bind("animationend", function () {
        $('#data19').css("animation-play-state", "paused");
        $('#data19').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            addStep3();
        }
    });

    $("#data8").bind("animationend", function () {
        $('#data8').css("animation-play-state", "paused");
        $('#data8').css("animation", "none");
    });
    $("#data9").bind("animationend", function () {
        $('#data9').css("animation-play-state", "paused");
        $('#data9').css("animation", "none");
    });
    $("#data10").bind("animationend", function () {
        $('#data10').css("animation-play-state", "paused");
        $('#data10').css("animation", "none");
    });

    $("#data7").bind("animationend", function () {
        $('#data7').css("animation-play-state", "paused");
        $('#data7').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            addStep4();
        }
    });

    $("#data12").bind("animationend", function () {
        playing = false;
        insNum = 0;
        refreshRegisters();
        $('#data12').css("animation-play-state", "paused");
        $('#data12').css("animation", "none");
        $('#ALUOp').css("animation", "none");
        $('#RegWrite').css("animation", "none");
        $('#pause').css("pointer-events", "none");
        Unbind();
        $('#fw').css("pointer-events", "auto");
        if(sequenceFlag == 1){
            continuePlay.theFlagData = continuePlay.theFlagData + 1;
        }
    });

    $("#data18").bind("animationend", function () {
        $('#data18').css("animation-play-state", "paused");
        $('#data18').css("animation", "none");
    });

    $("#data11").bind("animationend", function () {
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
    });

}


function RStepForward(addStep){
    if(addStep == 1){
        addStep1();
    }
    else if(addStep == 2){

        addStep2();
    }
    else if(addStep == 3){

        addStep3();
    }
    else if(addStep == 4){

        addStep4();
    }

}

function RPlay(){
    sequenceFlag = 1;
    addStep1();
}

function addStep1(){
    RBind();
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");

    //Set animation
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3_1').css("opacity", "0");
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 1;
    $('#pause').css("pointer-events", "auto");
}


function addStep2(){
    $('#fw').css("pointer-events", "none");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data5').css({"animation":"pathing5 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data6').css({"animation":"pathing6 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data19').css({"animation":"pathing19 " + 9.5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#ALUOp').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#RegWrite').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    insNum = 2;
    $('#pause').css("pointer-events", "auto");
}

function addStep3(){
    $('#fw').css("pointer-events", "none");
    $('#data7').css({"animation":"pathing7 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data9').css({"animation":"pathing9 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data10').css({"animation":"pathing10 " + 9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 3;
    $('#pause').css("pointer-events", "auto");
}

function addStep4(){
    $('#fw').css("pointer-events", "none");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data12').css({"animation":"pathing12 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data18').css({"animation":"pathing18 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 4;
    $('#pause').css("pointer-events", "auto");
}


