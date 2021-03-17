
function JChecker() {
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
        if ($('#data42').css('animation-play-state').toLowerCase() == 'running') {
            $('#data42').css("animation-play-state", "paused");
            $('#data28').css("animation-play-state", "paused");
            $('#Jump').css("animation-play-state", "paused");
            $('#superToggler').addClass("2");
        }

        if ($('#data7').css('animation-play-state').toLowerCase() == 'running') {
            $('#data73').css("animation-play-state", "paused");
            $('#data72').css("animation-play-state", "paused");
            $('#data29').css("animation-play-state", "paused");
            $('#data30').css("animation-play-state", "paused");
            $('#superToggler').addClass("3");
        }

        if ($('#data11').css('animation-play-state').toLowerCase() == 'running') {
            $('#data11').css("animation-play-state", "paused");
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
            $('#data42').css("animation-play-state", "running");
            $('#data28').css("animation-play-state", "running");
            $('#Jump').css("animation-play-state", "running");
            $('#superToggler').removeClass("2");
        }
        if ($('#superToggler').hasClass("3")) {
            $('#data73').css("animation-play-state", "running");
            $('#data72').css("animation-play-state", "running");
            $('#data29').css("animation-play-state", "running");
            $('#data30').css("animation-play-state", "running");
            $('#superToggler').removeClass("3");
        }
        if ($('#superToggler').hasClass("4")) {
            $('#data11').css("animation-play-state", "running");
            $('#superToggler').removeClass("4");
        }

    }
};
function JBind(){
    /*暂停*/
    $('.fas.fa-pause').click(function () {
        JChecker();
    });

    $("#data3").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data3').css("animation-play-state", "paused");
        $('#data3').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep2();
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


    $("#data42").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data42').css("animation-play-state", "paused");
        $('#data42').css("animation", "none");
    });
    $("#data28").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data28').css("animation-play-state", "paused");
        $('#data28').css("animation", "none");
    });
    $("#Jump").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#Jump').css("animation-play-state", "paused");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep3();
        }
    });


    $("#data72").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data72').css("animation-play-state", "paused");
        $('#data72').css("animation", "none");
    });
    $("#data73").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data73').css("animation-play-state", "paused");
        $('#data73').css("animation", "none");
    });
    $("#data29").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data29').css("animation-play-state", "paused");
        $('#data29').css("animation", "none");
    });
    $("#data30").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        $('#data30').css("animation-play-state", "paused");
        $('#data30').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        if(sequenceFlag == 1){
            jStep4();
        }
    });


    $("#data11").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
        playing = false;
        $('#data11').css("animation-play-state", "paused");
        $('#data11').css("animation", "none");
        $('#Jump').css("animation", "none");
        $('#fw').css("pointer-events", "auto");
        $('#pause').css("pointer-events", "none");
        Unbind();

            if(sequenceFlag == 1){
                continuePlay.theFlagData = continuePlay.theFlagData + 1;
            }
    });
}
function JPlay(){
    sequenceFlag = 1;
    setTimeout(jStep1, 500);
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
    setTimeout(JBind, 50);
    $('#fw').css("pointer-events", "none");
    $('#play').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data1').css({"animation":"pathing " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data2').css({"animation":"pathing2 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data3').css({"animation":"pathing3 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function jStep2(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data42').css({"animation":"pathing42 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data28').css({"animation":"pathing28 " + 5/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#Jump').css({"animation":"Jump " + 8/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function jStep3(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data72').css({"animation":"pathing72 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data73').css({"animation":"pathing73 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data29').css({"animation":"pathing29 " + 7/parseFloat(speed) + "s 1","animation-play-state":"running"});
    $('#data30').css({"animation":"pathing30 " + 14/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

function jStep4(){
    $('#fw').css("pointer-events", "none");
    $('#pause').css("pointer-events", "auto");
    $('#data11').css({"animation":"pathing11 " + 10/parseFloat(speed) + "s 1","animation-play-state":"running"});
}

