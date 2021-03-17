
function BEQChecker() {
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
            $('#data6').css("animation-play-state", "paused");
            $('#data20').css("animation-play-state", "paused");
            $('#superToggler').addClass("2");
        }
        if ($('#data25').css('animation-play-state').toLowerCase() == 'running') {
            $('#data8').css("animation-play-state", "paused");
            $('#data9').css("animation-play-state", "paused");
            $('#data10').css("animation-play-state", "paused");
            $('#data25').css("animation-play-state", "paused");
            $('#isZero').css("animation-play-state", "paused");
            $('#Branch').css("animation-play-state", "paused");
            $('#BranchAndZero').css("animation-play-state", "paused");
            $('#and1').css("animation-play-state", "paused");
            $('#superToggler').addClass("3");
        }
        if ($('#data7').css('animation-play-state').toLowerCase() == 'running') {
            $('#BranchAndZero').css("animation-play-state", "paused");
            $('#data7').css("animation-play-state", "paused");
            $('#data72').css("animation-play-state", "paused");
            $('#data26').css("animation-play-state", "paused");
            $('#data27').css("animation-play-state", "paused");
            $('#superToggler').addClass("4");
        }
        if ($('#data11').css('animation-play-state').toLowerCase() == 'running') {
            $('#data11').css("animation-play-state", "paused");
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
            $('#data6').css("animation-play-state", "running");
            $('#data20').css("animation-play-state", "running");
            $('#superToggler').removeClass("2");
        }
        if ($('#superToggler').hasClass("3")) {
            $('#data8').css("animation-play-state", "running");
            $('#data9').css("animation-play-state", "running");
            $('#data10').css("animation-play-state", "running");
            $('#data25').css("animation-play-state", "running");
            $('#isZero').css("animation-play-state", "running");
            $('#Branch').css("animation-play-state", "running");
            $('#BranchAndZero').css("animation-play-state", "running");
            $('#and1').css("animation-play-state", "running");
            $('#superToggler').removeClass("3");
        }
        if ($('#superToggler').hasClass("4")) {
            $('#data7').css("animation-play-state", "running");
            $('#data72').css("animation-play-state", "running");
            $('#data26').css("animation-play-state", "running");
            $('#data27').css("animation-play-state", "running");
            $('#superToggler').removeClass("4");
        }
        if ($('#superToggler').hasClass("5")) {
            $('#data11').css("animation-play-state", "running");
            $('#superToggler').removeClass("5");
        }

    }
};

function BEQBind(){
    /*暂停*/
    $('#pause').click(function () {
        BEQChecker();
    });

    $("#data3").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        $('#data3').css("animation", "none");
        if(sequenceFlag == 1){
            beqStep2();
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
    $("#data6").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data6').css("animation-play-state", "paused");
        $('#data6').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep3();
        }
    });
    $("#data20").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data20').css("animation-play-state", "paused");
        $('#data20').css("animation", "none");
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
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep4();
        }
    });
    $("#data25").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data25').css("animation-play-state", "paused");
        $('#data25').css("animation", "none");
    });
    $("#isZero").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#isZero').css("animation-play-state", "paused");
    });
    $("#BranchAndZero").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#BranchAndZero').css("animation-play-state", "paused");
    });
    $("#Branch").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#Branch').css("animation-play-state", "paused");
    });
    $("#and1").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#and1').css("animation-play-state", "paused");
    });


    $("#data7").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data7').css("animation-play-state", "paused");
        $('#data7').css("animation", "none");
    });
    $("#data72").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data72').css("animation-play-state", "paused");
        $('#data72').css("animation", "none");
    });
    $("#data26").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data26').css("animation-play-state", "paused");
        $('#data26').css("animation", "none");
    });
    $("#data27").bind("animationend webkitAnimationEnd oAnimationEnd ", function () {
        $('#data27').css("animation-play-state", "paused");
        $('#data27').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            beqStep5();
        }
    });

    $("#data11").one("animationend webkitAnimationEnd oAnimationEnd ", function () {
        playing = false;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#isZero').css("animation", "none");
        $('#BranchAndZero').css("animation", "none");
        $('#Branch').css("animation", "none");
        $('#and1').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        Unbind();
            if(sequenceFlag == 1){
                continuePlay.theFlagData = continuePlay.theFlagData + 1;
            }

    });

}
function BEQPlay(){
    sequenceFlag = 1;
    setTimeout(beqStep1, 500);
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
    setTimeout(BEQBind, 100);
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function beqStep2(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data4').css({"animation":"pathing4 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data6').css({"animation":"pathing6 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data20').css({"animation":"pathing4 " + 4.9/parseFloat(speed) + "s 1","animation-play-state":"running"});

}

function beqStep3(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data8').css({"animation":"pathing8 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data9').css({"animation":"pathing9 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data10').css({"animation":"pathing10 " + 9/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data25').css({"animation":"pathing25 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#isZero').css({"animation":"isZero " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#Branch').css({"animation":"Branch " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#BranchAndZero').css({"animation":"BranchAndZero " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});
    $('#and1').css({"animation":"and1 " + 8/parseFloat(speed) + "s 1","animation-play-state":"running","animation-fill-mode":"forwards"});

}
function beqStep4(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data7').css({"animation":"pathing7 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data72').css({"animation":"pathing72 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data26').css({"animation":"pathing26 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data27').css({"animation":"pathing27 " + 17/parseFloat(speed) + "s 1","animation-play-state":"running"});

}
function beqStep5(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}




