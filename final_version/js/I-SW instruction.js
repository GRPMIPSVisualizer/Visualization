
function SWChecker() {
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
            $('#data20').css("animation-play-state", "paused");
            $('#ALUSrc').css("animation-play-state", "paused");
            $('#MemWrite').css("animation-play-state", "paused");
        }

        else if (insNum == 3) {
            $('#data8').css("animation-play-state", "paused");
            $('#data21').css("animation-play-state", "paused");
        }

        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "paused");
            $('#data22').css("animation-play-state", "paused");
            $('#data24').css("animation-play-state", "paused");
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
            $('#data20').css("animation-play-state", "running");
            $('#ALUSrc').css("animation-play-state", "running");
            $('#MemWrite').css("animation-play-state", "running");
        }
        else if (insNum == 3) {
            $('#data8').css("animation-play-state", "running");
            $('#data21').css("animation-play-state", "running");
        }
        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "running");
            $('#data22').css("animation-play-state", "running");
            $('#data24').css("animation-play-state", "running");
        }
        $('#pause').removeClass("fa-play").addClass("fa-pause");
        $('#pause').attr('title', 'pause');
        $('#halfSpeed').css("pointer-events", "auto");
        $('#doubleSpeed').css("pointer-events", "auto");
    }
};

function SWBind(){
    /*暂停*/
    $('#pause').click(function () {
        SWChecker();
    });

    $("#data3").bind("animationend", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#data3').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            swStep2();
        }
    });
    $("#data1").bind("animationend", function () {
        $('#data1').css("animation-play-state", "paused");
        $('#data1').css("animation", "none");
    });
    $("#data2").bind("animationend", function () {
        $('#data2').css("animation-play-state", "paused");
        $('#data2').css("animation", "none");
        refreshIM();
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
    $("#data20").bind("animationend", function () {
        $('#data20').css("animation-play-state", "paused");
        $('#data20').css("animation", "none");
    });
    $("#ALUSrc").bind("animationend", function () {
        $('#ALUSrc').css("animation-play-state", "paused");

    });
    $("#MemWrite").bind("animationend", function () {
        $('#MemWrite').css("animation-play-state", "paused");

        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            swStep3();
        }
    });


    $("#data8").bind("animationend", function () {
        $('#data8').css("animation-play-state", "paused");
        $('#data8').css("animation", "none");
    });
    $("#data21").bind("animationend", function () {
        $('#data21').css("animation-play-state", "paused");
        $('#data21').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            swStep4();
        }
    });


    $("#data11").one("animationend", function () {
        playing = false;
        insNum = 0;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#ALUSrc').css("animation", "none");
        $('#MemWrite').css("animation", "none");
        $('#pause').css("pointer-events", "none");
        Unbind();
        $('#fw').css("pointer-events", "auto");
            if(sequenceFlag == 1){
                continuePlay.theFlagData = continuePlay.theFlagData + 1;
            }

    });

    $("#data22").bind("animationend", function () {
        $('#data22').css("animation-play-state", "paused");
        $('#data22').css("animation", "none");
    });
    $("#data24").bind("animationend", function () {
        $('#data24').css("animation-play-state", "paused");
        $('#data24').css("animation", "none");
        refreshDM();
    });

}
function SWPlay(){
    sequenceFlag = 1;
    swStep1();
}
function SWStepForward(swStep){
    if(swStep == 1){
        swStep1();
    }
    else if(swStep == 2){

        swStep2();
    }
    else if(swStep == 3){

        swStep3();
    }
    else if(swStep == 4){

        swStep4();
    }

}

function swStep1(){
    SWBind();
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 1;
    $('#pause').css("pointer-events", "auto");
}

function swStep2(){
    $('#fw').css("pointer-events", "none");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data5').css({"animation":"pathing5 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data20').css({"animation":"pathing4 " + 4.9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#ALUSrc').css({"animation":"ALUSrc " + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#MemWrite').css({"animation":"MemWrite " + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 2;
    $('#pause').css("pointer-events", "auto");
}

function swStep3(){
    $('#fw').css("pointer-events", "none");
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data21').css({"animation":"pathing21 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 3;
    $('#pause').css("pointer-events", "auto");
}

function swStep4(){
    $('#fw').css("pointer-events", "none");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data22').css({"animation":"pathing22 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data24').css({"animation":"pathing24 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 4;
    $('#pause').css("pointer-events", "auto");
}

