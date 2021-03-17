
function JChecker() {
    if ($('#pause').hasClass("fa-pause")) {
        if (insNum == 1) {
            $('#data1').css("animation-play-state", "paused");
            $('#data2').css("animation-play-state", "paused");
            $('#data3').css("animation-play-state", "paused");
        }
        else if (insNum == 2) {
            $('#data42').css("animation-play-state", "paused");
            $('#data28').css("animation-play-state", "paused");
            $('#Jump').css("animation-play-state", "paused");
        }

        else if (insNum == 3) {
            $('#data73').css("animation-play-state", "paused");
            $('#data72').css("animation-play-state", "paused");
            $('#data29').css("animation-play-state", "paused");
            $('#data30').css("animation-play-state", "paused");
        }

        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "paused");
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
            $('#data42').css("animation-play-state", "running");
            $('#data28').css("animation-play-state", "running");
            $('#Jump').css("animation-play-state", "running");
        }
        else if (insNum == 3) {
            $('#data73').css("animation-play-state", "running");
            $('#data72').css("animation-play-state", "running");
            $('#data29').css("animation-play-state", "running");
            $('#data30').css("animation-play-state", "running");
        }
        else if (insNum == 4) {
            $('#data11').css("animation-play-state", "running");
        }
        $('#pause').removeClass("fa-play").addClass("fa-pause");
        $('#pause').attr('title', 'pause');
        $('#halfSpeed').css("pointer-events", "auto");
        $('#doubleSpeed').css("pointer-events", "auto");
    }
};
function JBind(){
    /*暂停*/
    $('.fas.fa-pause').click(function () {
        JChecker();
    });

    $("#data3").bind("animationend", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#data3').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep2();
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


    $("#data42").bind("animationend", function () {
        $('#data42').css("animation-play-state", "paused");
        $('#data42').css("animation", "none");
    });
    $("#data28").bind("animationend", function () {
        $('#data28').css("animation-play-state", "paused");
        $('#data28').css("animation", "none");
    });
    $("#Jump").bind("animationend", function () {
        $('#Jump').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep3();
        }
    });


    $("#data72").bind("animationend", function () {
        $('#data72').css("animation-play-state", "paused");
        $('#data72').css("animation", "none");
    });
    $("#data73").bind("animationend", function () {
        $('#data73').css("animation-play-state", "paused");
        $('#data73').css("animation", "none");
    });
    $("#data29").bind("animationend", function () {
        $('#data29').css("animation-play-state", "paused");
        $('#data29').css("animation", "none");
    });
    $("#data30").bind("animationend", function () {
        $('#data30').css("animation-play-state", "paused");
        $('#data30').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep4();
        }
    });


    $("#data11").bind("animationend", function () {
        playing = false;
        insNum = 0;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#Jump').css("animation", "none");
        $('#pause').css("pointer-events", "none");
        Unbind();
        $('#fw').css("pointer-events", "auto");
            if(sequenceFlag == 1){
                continuePlay.theFlagData = continuePlay.theFlagData + 1;
            }
    });
}
function JPlay(){
    sequenceFlag = 1;
    jStep1();
}
function JStepForward(jStep){
    if(jStep == 1){
        jStep1();
    }
    else if(jStep == 2){

        jStep2();
    }
    else if(jStep == 3){

        jStep3();
    }
    else if(jStep == 4){

        jStep4();
    }

}

function jStep1(){
    JBind();
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 1;
    $('#pause').css("pointer-events", "auto");
}

function jStep2(){
    $('#fw').css("pointer-events", "none");
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data28').css({"animation":"pathing28 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#Jump').css({"animation":"Jump " + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 2;
    $('#pause').css("pointer-events", "auto");
}

function jStep3(){
    $('#fw').css("pointer-events", "none");
    $('#data72').css({"animation":"pathing72 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data73').css({"animation":"pathing73 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data29').css({"animation":"pathing29 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data30').css({"animation":"pathing30 " + 14/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 3;
    $('#pause').css("pointer-events", "auto");
}

function jStep4(){
    $('#fw').css("pointer-events", "none");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    insNum = 4;
    $('#pause').css("pointer-events", "auto");
}

