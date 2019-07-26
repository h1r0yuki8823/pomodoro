'use strict'

var interval_id;
var start_click = false;
var stopTimerState = false;
var time = 5 * 60;
var stopTime = 0;
var min = 0;
var sec = 0;
var state = 'rest';
var lapCount = 0;

function count_start(){
    if(start_click === false){
        
        if(stopTimerState === true){
            time = stopTime;
            stopTimerState = false;
        }else{
            if(state === 'concentration'){
                time = 15 * 60;
            }else if(state === 'rest'){
                time = 5 * 60;
            }else if(state === 'test'){
                time = 0.1 * 60;
            }else if(state === 'longRest'){
                time = 30 * 60;
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
}

function count_end(){

}

function count_skip(){

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