function displaySpeed(){
    $('#playSpeed').val(parseFloat(speed).toFixed(2));
}

/*半速播放*/
$('.btn.btn-primary.half').click(function () {
    if(parseFloat(speed) == 0.25)
        return;
    var period;
    var data = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10', 'data11', 'data12', 'data18', 'data19', 'data20', 'data21', 'data22', 'data23', 'data24', 'data25', 'data26', 'data27', 'data28', 'data29', 'data30', 'data42', 'data73', 'data72', 'Jump', 'isZero', 'BranchAndZero', 'Branch', 'ALUSrc', 'RegWrite', 'RegDst', 'ALUOp', 'MemWrite', 'MemRead', 'MemtoReg', 'and1'];
    for(var i=0;i<40;i++) {
        period = parseFloat($("#"+data[i]).css("animation-duration"))*2;
        var t = period + 's';
        $("#"+data[i]).css("animation-duration", t);
    }
    speed = parseFloat(speed)/2;
    displaySpeed();
});

/*二倍速播放*/
$('.btn.btn-primary.double').click(function () {
    if(parseFloat(speed) == 8)
        return;
    var period;
    var data = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10', 'data11', 'data12', 'data18', 'data19', 'data20', 'data21', 'data22', 'data23', 'data24', 'data25', 'data26', 'data27', 'data28', 'data29', 'data30', 'data42', 'data73', 'data72', 'Jump', 'isZero', 'BranchAndZero', 'Branch', 'ALUSrc', 'RegWrite', 'RegDst', 'ALUOp', 'MemWrite', 'MemRead', 'MemtoReg', 'and1'];
    for(var i=0;i<40;i++) {
        period = parseFloat($("#"+data[i]).css("animation-duration"))/2;
        var t = period + 's';
        $("#"+data[i]).css("animation-duration", t);
    }
    speed = parseFloat(speed)*2;
    displaySpeed();
});

function Unbind(){
    var data = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10', 'data11', 'data12', 'data18', 'data19', 'data20', 'data21', 'data22', 'data23', 'data24', 'data25', 'data26', 'data27', 'data28', 'data29', 'data30', 'data42', 'data73', 'data72', 'Jump', 'isZero', 'BranchAndZero', 'Branch', 'ALUSrc', 'RegWrite', 'RegDst', 'ALUOp', 'MemWrite', 'MemRead', 'MemtoReg', 'and1', 'pause'];
    for(var i=0;i<41;i++) {
        $("#"+data[i]).unbind();
    }
}