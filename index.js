'use strict'

var interval_id;
var prevent_interval_id;
var start_click = false;
var stopTimerState = false;
var preventState = true;
var time = 5 * 60;
var stopTime = 0;
var min = 0;
var sec = 0;
var state = 'concentration';
var lapCount = 0;
var preCount = 4;


function count_start(){
    var stateLabel = document.getElementById('state');
    if(start_click === false){
        
        if(stopTimerState === true){
            time = stopTime;
            stopTimerState = false;
        }else{
            if(state === 'concentration'){
                time = 15 * 60;
                stateLabel.innerHTML = '集中しましょう!!'
            }else if(state === 'rest'){
                time = 5 * 60;
                stateLabel.innerHTML = 'ちょっと一休みしましょう。'
            }else if(state === 'test'){
                time = 0.1 * 60;
            }else if(state === 'longRest'){
                time = 30 * 60;
                stateLabel.innerHTML = 'しっかり休憩を取りましょう!!'
            }
        }
        interval_id = setInterval(count_down, 1000);
        start_click = true;
    }
}

function count_down(){

    var timeDisplay = document.getElementById('timeDisplay')
    console.log(time);
    if(time === 1){
        timeDisplay.innerHTML = '終了!!'
        if(state === 'concentration'){
            lapCount++;
            if(lapCount === 4){
                state = 'longRest'    
            }else{
                state = 'rest'
            }
        }else if(state === 'test'){
            state = 'rest'
        }else if(state === 'rest' || state === 'longRest'){
            state = 'concentration'
        }
        start_click = false;
        clearInterval(interval_id);
        count_start();
    }else{
        time--;
        min = Math.floor(time / 60);
        console.log(min);
        sec = Math.floor(time % 60);
        console.log(sec);
        timeDisplay.innerHTML = min + ':' + sec

        if(sec<10){
            timeDisplay.innerHTML = min + ':' + '0' + sec;
        }
    }
}

function count_stop(){
    clearInterval(interval_id);
    start_click = false;
    stopTimerState = true;
    stopTime = min * 60 + sec;
    console.log(stopTime);
    var stateLabel = document.getElementById('state');
    stateLabel.innerHTML = '停止中'
}

function count_end(){
    clearInterval(interval_id);
    var stateLabel = document.getElementById('state');
    var timeDisplay = document.getElementById('timeDisplay')
    start_click = false;
    stopTimerState = false;
    preventState = true;
    time = 5 * 60;
    stopTime = 0;
    min = 0;
    sec = 0;
    state = 'concentration';
    lapCount = 0;
    preCount = 4;
    stateLabel.innerHTML = '終了しました。';
    timeDisplay.innerHTML = '15:00';
}

function count_skip(){
    time = 1;
}

function diplayPreparation(){
    var timeDisplay = document.getElementById('timeDisplay');
   switch(preCount){
       case 4:
            timeDisplay.innerHTML = '3';
            preCount--;
            break;
        case 3:
            timeDisplay.innerHTML = '2';
            preCount--;
            break;
        case 2:
            timeDisplay.innerHTML = '1';
            preCount--;
            break;
        case 1:
            timeDisplay.innerHTML = 'START!';
            preCount--;
            preventState = false
            clearInterval(prevent_interval_id);
            break;
        default:
            clearInterval(prevent_interval_id);
            preventState = false
            break;
   }
    
    

}

window.onload = function(){
    var start = document.getElementById('start');
    start.addEventListener('click', count_start,false);

    var stop = document.getElementById('stop');
    stop.addEventListener('click', count_stop, false);

    var end = document.getElementById('end');
    end.addEventListener('click',count_end, false);

    var skip = document.getElementById('skip');
    skip.addEventListener('click',count_skip, false);
}