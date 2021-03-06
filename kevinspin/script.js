let timeSpun = 0; 
let timeSpun_all = 0;

if(localStorage.kevinSpin_totalTime !== undefined){
  timeSpun_all = parseInt(localStorage.kevinSpin_totalTime);
}

function padZero(n){
  if(n.toString().length === 1){
    return '0' + n
  }
  else{
    return n
  }
}
function displayTime(){
  let h = Math.floor(timeSpun/3600);
  let m = Math.floor((timeSpun%3600)/60);
  let s = timeSpun%60;
  time.innerHTML = h + ':' + padZero(m) + ':' + padZero(s);
  
  let ha = Math.floor(timeSpun_all/3600);
  let ma = Math.floor((timeSpun_all%3600)/60);
  let sa = timeSpun_all%60;
  time_all.innerHTML = ha + ':' + padZero(ma) + ':' + padZero(sa);
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.onload = function(){
  displayTime();
  load.innerHTML = '';
  audio.play();
  vid.play();
  setInterval(function(){
    timeSpun++; 
    timeSpun_all ++;
    localStorage.kevinSpin_totalTime = timeSpun_all;
    displayTime();
  }, 1000);
  sendGlobalTime();
  setInterval(sendGlobalTime, 15000);
  if(window.innerHeight < 640 || window.mobileCheck()){
    alertify.confirm("Would you like to visit the mobile version of Kevin Spin?", function(){
      window.open('../kevinspinmobile', '_self');
    });
  }
  if(audio.paused){
    noAudio_notice.style.display = 'block';
  }
}

function msConfirm(){
  let c = alertify.confirm('<b>External Link</b><br>Are you sure you would like to visit Meat Spin?<br><span style="color: #888">We take zero responsibility for any mental damage potentially caused from visiting this site.</span>', function(){
    window.open('http://meatspin.com', '_blank');
  }, function(){
    window.open('http://leekspin.com', '_blank');
  })
}

function toggleVolume_func(){
  if(toggleVolume.className === 'fa fa-fw fa-volume-up'){
    toggleVolume.className = 'fa fa-fw fa-volume-off';
    audio.muted = true;
  }
  else{
    toggleVolume.className = 'fa fa-fw fa-volume-up';
    audio.muted = false;
  }
}

function sendGlobalTime(){
  try{
    localStorage.setItem('ks_test', '1');
    if(localStorage.getItem('ks_test') !== '1'){
      return false;
    }
  }
  catch(err){
    return false;
  }
  $.post('https://ryan778.herokuapp.com/kevinspin/sendGlobalTime', {time: timeSpun_all, KSSID: localStorage.ks_sid}, function(res){
    if(res.KSSID){
      localStorage.ks_sid = res.KSSID;
    }
  })
}


function showGlobalTime(){
  alertify.alert('<span id="tmp_globalTime"><i class="fa fa-cog fa-spin"></i> Loading global time...<br><span style="color:#888">If it doesn\'t load within 15 seconds, press OK and open this again. If the problem persists, the global time server may be down.</span></span>');
  $.get('https://ryan778.herokuapp.com/kevinspin/getGlobalTime', function(res){
    document.getElementById('tmp_globalTime').innerHTML = '<b>Kevin Spin - Global Time</b><br><i class="fa fa-fw fa-clock-o"></i> Cumulative Global Time: '+res.time+'<br><i class="fa fa-fw fa-clock-o"></i> Currently Active Global Time: '+res.activeTime+'<br><i class="fa fa-fw fa-user"></i> Total Unique Users: '+res.uniqueUsers+'<br><i class="fa fa-fw fa-user-plus"></i> Currently Active Users: '+res.activeUsers;
  })
}

function showDisclaimer(){
  alertify.alert('<b>Disclaimer</b><br>This site is for entertainment purposes only. Don\'t waste your life on here. Please. No seriously.<br><br>Global times really don\'t mean anything. You (or anyone else) can leave your (or their) computer/phone/tablet on overnight and look, the time went up by eight hours!<br><br>Don\'t leave this open 24/7. You\'ll slow down the time tracking servers (and may be IP blocked). Not to mention it\'s a huge waste of CPU resources...')
}
