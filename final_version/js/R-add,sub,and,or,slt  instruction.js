
function RChecker() {
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
        if ($('#data19').css('animation-play-state').toLowerCase() == 'running') {
            $('#data4').css("animation-play-state", "paused");
            $('#data42').css("animation-play-state", "paused");
            $('#data5').css("animation-play-state", "paused");
            $('#data6').css("animation-play-state", "paused");
            $('#data19').css("animation-play-state", "paused");
            $('#ALUOp').css("animation-play-state", "paused");
            $('#RegWrite').css("animation-play-state", "paused");
            $('#superToggler').addClass("2");
        }

        if ($('#data7').css('animation-play-state').toLowerCase() == 'running') {
            $('#data7').css("animation-play-state", "paused");
            $('#data8').css("animation-play-state", "paused");
            $('#data9').css("animation-play-state", "paused");
            $('#data10').css("animation-play-state", "paused");
            $('#superToggler').addClass("3");
        }

        if ($('#data11').css('animation-play-state').toLowerCase() == 'running') {
            $('#data11').css("animation-play-state", "paused");
            $('#data12').css("animation-play-state", "paused");
            $('#data18').css("animation-play-state", "paused");
            $('#superToggler').addClass("4");
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
            $('#data6').css("animation-play-state", "running");
            $('#data19').css("animation-play-state", "running");
            $('#ALUOp').css("animation-play-state", "running");
            $('#RegWrite').css("animation-play-state", "running");
            $('#superToggler').removeClass("2");
        }
        if ($('#superToggler').hasClass("3")) {
            $('#data7').css("animation-play-state", "running");
            $('#data8').css("animation-play-state", "running");
            $('#data9').css("animation-play-state", "running");
            $('#data10').css("animation-play-state", "running");
            $('#superToggler').removeClass("3");
        }
        if ($('#superToggler').hasClass("4")) {
            $('#data11').css("animation-play-state", "running");
            $('#data12').css("animation-play-state", "running");
            $('#data18').css("animation-play-state", "running");
            $('#superToggler').removeClass("4");
        }

    }
};

function RBind(){
    /*暂停*/
    $('#pause').click(function () {
        RChecker();
    });

    $("#data3").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        $('#data3').css("animation", "none");
        if(sequenceFlag == 1){
            addStep2();
        }
    });
    $("#data1").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data1').css("animation-play-state", "paused");
        $('#data1').css("animation", "none");
    });
    $("#data2").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        refreshIM();
        $('#data2').css("animation-play-state", "paused");
        $('#data2').css("animation", "none");
    });


    $("#data4").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data4').css("animation-play-state", "paused");
        $('#data4').css("animation", "none");
    });
    $("#data42").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data42').css("animation-play-state", "paused");
        $('#data42').css("animation", "none");
    });
    $("#data5").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data5').css("animation-play-state", "paused");
        $('#data5').css("animation", "none");
    });
    $("#data6").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data6').css("animation-play-state", "paused");
        $('#data6').css("animation", "none");
    });
    $("#ALUOp").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#ALUOp').css("animation-play-state", "paused");

    });
    $("#RegWrite").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#RegWrite').css("animation-play-state", "paused");
    });

    $("#data19").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data19').css("animation-play-state", "paused");
        $('#data19').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            addStep3();
        }
    });

    $("#data8").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data8').css("animation-play-state", "paused");
        $('#data8').css("animation", "none");
    });
    $("#data9").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data9').css("animation-play-state", "paused");
        $('#data9').css("animation", "none");
    });
    $("#data10").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data10').css("animation-play-state", "paused");
        $('#data10').css("animation", "none");
    });

    $("#data7").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data7').css("animation-play-state", "paused");
        $('#data7').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            addStep4();
        }
    });

    $("#data12").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        playing = false;
        refreshRegisters();
        $('#data12').css("animation-play-state", "paused");
        $('#data12').css("animation", "none");
        $('#ALUOp').css("animation", "none");
        $('#RegWrite').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        Unbind();

        if(sequenceFlag == 1){
            continuePlay.theFlagData = continuePlay.theFlagData + 1;
        }
    });

    $("#data18").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data18').css("animation-play-state", "paused");
        $('#data18').css("animation", "none");
    });

    $("#data11").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
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
    setTimeout(addStep1, 500);
}

function addStep1(){
    setTimeout(RBind, 50);
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    //Set animation
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}


function addStep2(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data5').css({"animation":"pathing5 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data6').css({"animation":"pathing6 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data19').css({"animation":"pathing19 " + 9.5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#ALUOp').css({"animation":"ALUOp" + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#RegWrite').css({"animation":"RegWrite" + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function addStep3(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data7').css({"animation":"pathing7 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data9').css({"animation":"pathing9 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data10').css({"animation":"pathing10 " + 9/parseFloat(speed) + "s 1","animation-play-state":"running"});
}
function addStep4(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    //Set animation
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data12').css({"animation":"pathing12 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data18').css({"animation":"pathing18 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
}
