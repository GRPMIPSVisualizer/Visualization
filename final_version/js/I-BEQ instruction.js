
function BEQChecker() {
    if ($('#pause').hasClass("fa-pause")) {

        if (insNum == 1) {
            $('#data1').css("animation-play-state", "paused");
            $('#data2').css("animation-play-state", "paused");
            $('#data3').css("animation-play-state", "paused");

        }
        else if (insNum == 2) {
            $('#data4').css("animation-play-state", "paused");
            $('#data42').css("animation-play-state", "paused");
            $('#data6').css("animation-play-state", "paused");
            $('#data20').css("animation-play-state", "paused");
        }
        else if (insNum == 3) {
            $('#data8').css("animation-play-state", "paused");
            $('#data9').css("animation-play-state", "paused");
            $('#data10').css("animation-play-state", "paused");
            $('#data25').css("animation-play-state", "paused");
            $('#isZero').css("animation-play-state", "paused");
            $('#Branch').css("animation-play-state", "paused");
            $('#BranchAndZero').css("animation-play-state", "paused");
            $('#and1').css("animation-play-state", "paused");
        }
        else if (insNum == 4) {
            $('#BranchAndZero').css("animation-play-state", "paused");
            $('#data7').css("animation-play-state", "paused");
            $('#data72').css("animation-play-state", "paused");
            $('#data26').css("animation-play-state", "paused");
            $('#data27').css("animation-play-state", "paused");
        }
        else if (insNum == 5) {
            $('#data11').css("animation-play-state", "paused");
        }

        $('#pause').removeClass("fa-pause").addClass("fa-play");
        $('#pause').attr('title', 'play');
        $('#halfSpeed').css("pointer-events", "none");
        $('#doubleSpeed').css("pointer-events", "none");
    }

    else if ($('#pause').hasClass("fa-play")) {

        if (stepNum == 1) {
            $('#data1').css("animation-play-state", "running");
            $('#data2').css("animation-play-state", "running");
            $('#data3').css("animation-play-state", "running");
        }
        else if (stepNum == 2) {
            $('#data4').css("animation-play-state", "running");
            $('#data42').css("animation-play-state", "running");
            $('#data6').css("animation-play-state", "running");
            $('#data20').css("animation-play-state", "running");
        }
        else if (stepNum == 3) {
            $('#data8').css("animation-play-state", "running");
            $('#data9').css("animation-play-state", "running");
            $('#data10').css("animation-play-state", "running");
            $('#data25').css("animation-play-state", "running");
            $('#isZero').css("animation-play-state", "running");
            $('#Branch').css("animation-play-state", "running");
            $('#BranchAndZero').css("animation-play-state", "running");
            $('#and1').css("animation-play-state", "running");
        }
        else if (stepNum == 4) {
            $('#data7').css("animation-play-state", "running");
            $('#data72').css("animation-play-state", "running");
            $('#data26').css("animation-play-state", "running");
            $('#data27').css("animation-play-state", "running");
        }
        else if (stepNum == 5) {
            $('#data11').css("animation-play-state", "running");
        }

        $('#pause').removeClass("fa-play").addClass("fa-pause");
        $('#pause').attr('title', 'pause');
        $('#halfSpeed').css("pointer-events", "auto");
        $('#doubleSpeed').css("pointer-events", "auto");
    }
};

function BEQBind(){
    /*暂停*/
    $('#pause').click(function () {
        BEQChecker();
    });

    $("#data3").bind("animationend", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        $('#data3').css("animation", "none");
        if(sequenceFlag == 1){
            beqStep2();
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
    $("#data6").bind("animationend", function () {
        $('#data6').css("animation-play-state", "paused");
        $('#data6').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep3();
        }
    });
    $("#data20").bind("animationend", function () {
        $('#data20').css("animation-play-state", "paused");
        $('#data20').css("animation", "none");
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
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep4();
        }
    });
    $("#data25").bind("animationend", function () {
        $('#data25').css("animation-play-state", "paused");
        $('#data25').css("animation", "none");
    });
    $("#isZero").bind("animationend", function () {
        $('#isZero').css("animation-play-state", "paused");
    });
    $("#BranchAndZero").bind("animationend", function () {
        $('#BranchAndZero').css("animation-play-state", "paused");
    });
    $("#Branch").bind("animationend", function () {
        $('#Branch').css("animation-play-state", "paused");
    });
    $("#and1").bind("animationend", function () {
        $('#and1').css("animation-play-state", "paused");
    });


    $("#data7").bind("animationend", function () {
        $('#data7').css("animation-play-state", "paused");
        $('#data7').css("animation", "none");
    });
    $("#data72").bind("animationend", function () {
        $('#data72').css("animation-play-state", "paused");
        $('#data72').css("animation", "none");
    });
    $("#data26").bind("animationend", function () {
        $('#data26').css("animation-play-state", "paused");
        $('#data26').css("animation", "none");
    });
    $("#data27").bind("animationend", function () {
        $('#data27').css("animation-play-state", "paused");
        $('#data27').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep5();
        }
    });

    $("#data11").one("animationend", function () {
        playing = false;
        insNum = 0;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#isZero').css("animation", "none");
        $('#BranchAndZero').css("animation", "none");
        $('#Branch').css("animation", "none");
        $('#and1').css("animation", "none");
        $('#pause').css("pointer-events", "none");
        Unbind();
        $('#fw').css("pointer-events", "auto");
        if(sequenceFlag == 1){
            continuePlay.theFlagData = continuePlay.theFlagData + 1;
        }

    });

}
function BEQPlay(){
    sequenceFlag = 1;
    beqStep1();
}

function BEQStepForward(beqStep){
    if(beqStep == 1){
        beqStep1();
    }
    else if(beqStep == 2){

        beqStep2();
    }
    else if(beqStep == 3){

        beqStep3();
    }
    else if(beqStep == 4){

        beqStep4();
    }
    else if(beqStep == 5){

        beqStep5();
    }
}

function beqStep1(){
    BEQBind();
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 1;
    $('#pause').css("pointer-events", "auto");
}

function beqStep2(){
    $('#fw').css("pointer-events", "none");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data6').css({"animation":"pathing6 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data20').css({"animation":"pathing4 " + 4.9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 2;
    $('#pause').css("pointer-events", "auto");
}

function beqStep3(){
    $('#fw').css("pointer-events", "none");
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data9').css({"animation":"pathing9 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data10').css({"animation":"pathing10 " + 9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data25').css({"animation":"pathing25 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#isZero').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#Branch').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#BranchAndZero').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#and1').css({"animation":"Wire " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    insNum = 3;
    $('#pause').css("pointer-events", "auto");
}
function beqStep4(){
    $('#fw').css("pointer-events", "none");
    $('#data7').css({"animation":"pathing7 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data72').css({"animation":"pathing72 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data26').css({"animation":"pathing26 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data27').css({"animation":"pathing27 " + 17/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 4;
    $('#pause').css("pointer-events", "auto");
}
function beqStep5(){

    $('#fw').css("pointer-events", "none");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 5;
    $('#pause').css("pointer-events", "auto");
}




