
function LWChecker() {
    if ($('#pause').hasClass("pause")) {
        $('#pause').removeClass("pause").addClass("play");
        $('#pause').removeClass("fa-pause").addClass("fa-play");
        $('#pause').attr('title', 'play');
        $('#halfSpeed').css("pointer-events", "none");
        $('#doubleSpeed').css("pointer-events", "none");
        if ($('#data3').css('animation-play-state').toLowerCase() == 'running') {
            $('#data1').css("animation-play-state", "paused");
            $('#data2').css("animation-play-state", "paused");
            $('#data3').css("animation-play-state", "paused");
            $('#superToggler').addClass("1");

        }
        if ($('#data4').css('animation-play-state').toLowerCase() == 'running') {
            $('#data4').css("animation-play-state", "paused");
            $('#data42').css("animation-play-state", "paused");
            $('#data5').css("animation-play-state", "paused");
            $('#data20').css("animation-play-state", "paused");
            $('#MemRead').css("animation-play-state", "paused");
            $('#MemtoReg').css("animation-play-state", "paused");
            $('#ALUSrc').css("animation-play-state", "paused");
            $('#RegWrite').css("animation-play-state", "paused");
            $('#superToggler').addClass("2");
        }

        if ($('#data21').css('animation-play-state').toLowerCase() == 'running') {
            $('#data8').css("animation-play-state", "paused");
            $('#data21').css("animation-play-state", "paused");
            $('#superToggler').addClass("3");
        }

        if ($('#data22').css('animation-play-state').toLowerCase() == 'running') {
            $('#data22').css("animation-play-state", "paused");
            $('#superToggler').addClass("4");
        }
        if ($('#data11').css('animation-play-state').toLowerCase() == 'running') {
            $('#data11').css("animation-play-state", "paused");
            $('#data23').css("animation-play-state", "paused");
            $('#superToggler').addClass("5");
        }
    }
    
    else if ($('#pause').hasClass("play")) {
        $('#pause').removeClass("play").addClass("pause");
        $('#pause').removeClass("fa-play").addClass("fa-pause");
        $('#pause').attr('title', 'pause');
        $('#halfSpeed').css("pointer-events", "auto");
        $('#doubleSpeed').css("pointer-events", "auto");
        if ($('#superToggler').hasClass("1")) {
            $('#data1').css("animation-play-state", "running");
            $('#data2').css("animation-play-state", "running");
            $('#data3').css("animation-play-state", "running");
            $('#superToggler').removeClass("1");
        }

        if ($('#superToggler').hasClass("2")) {
            $('#data4').css("animation-play-state", "running");
            $('#data42').css("animation-play-state", "running");
            $('#data5').css("animation-play-state", "running");
            $('#data20').css("animation-play-state", "running");
            $('#MemRead').css("animation-play-state", "running");
            $('#MemtoReg').css("animation-play-state", "running");
            $('#ALUSrc').css("animation-play-state", "running");
            $('#RegWrite').css("animation-play-state", "running");
            $('#superToggler').removeClass("2");
        }
        if ($('#superToggler').hasClass("3")) {
            $('#data8').css("animation-play-state", "running");
            $('#data21').css("animation-play-state", "running");
            $('#superToggler').removeClass("3");
        }
        if ($('#superToggler').hasClass("4")) {
            $('#data22').css("animation-play-state", "running");
            $('#superToggler').removeClass("4");
        }
        if ($('#superToggler').hasClass("5")) {
            $('#data11').css("animation-play-state", "running");
            $('#data23').css("animation-play-state", "running");
            $('#superToggler').removeClass("5");
        }

    }
};
function LWBind(){

    $('#pause').click(function () {
        LWChecker();
    });

    $("#data3").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#data3').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            lwStep2();
        }
    });
    $("#data1").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data1').css("animation-play-state", "paused");
        $('#data1').css("animation", "none");
    });
    $("#data2").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        refreshIM();
        $('#data2').css("animation-play-state", "paused");
        $('#data2').css("animation", "none");
    });


    $("#data4").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data4').css("animation-play-state", "paused");
        $('#data4').css("animation", "none");
    });
    $("#data42").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data42').css("animation-play-state", "paused");
        $('#data42').css("animation", "none");
    });
    $("#data5").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data5').css("animation-play-state", "paused");
        $('#data5').css("animation", "none");
    });
    $("#data20").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data20').css("animation-play-state", "paused");
        $('#data20').css("animation", "none");
    });
    $("#MemRead").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#MemRead').css("animation-play-state", "paused");

    });
    $("#MemtoReg").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#MemtoReg').css("animation-play-state", "paused");

    });
    $("#ALUSrc").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#ALUSrc').css("animation-play-state", "paused");

    });
    $("#RegWrite").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#RegWrite').css("animation-play-state", "paused");

        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            lwStep3();
        }
    });


    $("#data8").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data8').css("animation-play-state", "paused");
        $('#data8').css("animation", "none");
    });
    $("#data21").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data21').css("animation-play-state", "paused");
        $('#data21').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            lwStep4();
        }
    });

    $("#data22").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data22').css("animation-play-state", "paused");
        $('#data22').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            lwStep5();
        }
    });


    $("#data11").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        playing = false;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#MemRead').css("animation", "none");
        $('#MemtoReg').css("animation", "none");
        $('#ALUSrc').css("animation", "none");
        $('#RegWrite').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        Unbind();

            if(sequenceFlag == 1){
                continuePlay.theFlagData = continuePlay.theFlagData + 1;
            }

    });

    $("#data23").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data23').css("animation-play-state", "paused");
        $('#data23').css("animation", "none");
    });

}
function LWPlay(){
    sequenceFlag = 1;
    setTimeout(lwStep1, 500);
}

function LWStepForward(lwStep){
    if(lwStep == 1){
        lwStep1();
    }
    else if(lwStep == 2){

        lwStep2();
    }
    else if(lwStep == 3){

        lwStep3();
    }
    else if(lwStep == 4){

        lwStep4();
    }
    else if(lwStep == 5){

        lwStep5();
    }
}

function lwStep1(){
    setTimeout(LWBind, 50);
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function lwStep2(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data5').css({"animation":"pathing5 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data20').css({"animation":"pathing4 " + 4.9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#MemRead').css({"animation":"MemRead " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#MemtoReg').css({"animation":"MemtoReg " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#ALUSrc').css({"animation":"ALUSrc " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#RegWrite').css({"animation":"RegWrite " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
}

function lwStep3(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data21').css({"animation":"pathing21 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function lwStep4(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data22').css({"animation":"pathing22 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function lwStep5(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data23').css({"animation":"pathing23 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

