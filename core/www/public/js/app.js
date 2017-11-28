
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function copyToClipboard(elem) {
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {

    target = elem;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
  } else {

    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement("textarea");
      target.style.position = "absolute";
      target.style.left = "-9999px";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);
    }
    target.textContent = elem.textContent;
  }

  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);


  var succeed;
  try {
    succeed = document.execCommand("copy");
  } catch(e) {
    succeed = false;
  }

  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  if (isInput) {

    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {

    target.textContent = "";
  }
  return succeed;
}


$(() => {


  var conn, peer_id, call;
  var ayo = io();

  var peer = new Peer({port:443,host:'shoutnow.me',path:'/peerjs',debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
    credential: 'muazkh', username: 'webrtc@live.com' }
    ]}
  });

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


  function getVideo(callback) {

    if (mobilecheck()) {
      var constraints = {
       audio: true,
       video: {
         facingMode: 'user'
       }
     }

     navigator.mediaDevices.getUserMedia(constraints).then(callback);

   } else {

    navigator.getUserMedia(
      {audio: true, video: true},
      callback,
      function(error) {
        console.log(error);
        alert('An error occurred. Please try again');
      }
      );

  }
}

function onReceiveStream(stream, element_id) {
  var video = $('#' + element_id + ' video')[0];
  video.srcObject = stream;
 
  window.peer_stream = stream;
}

getVideo(function(stream) {
  window.localStream = stream;
  onReceiveStream(stream, 'my-camera');
});

const uniqueToken = document.getElementById('uniq_url');

if (!location.hash) {

  setTimeout(() => {
    uniqueToken.value = location.href + "#" + peer.id; 

    peer.on('call', function(call) {
      navigator.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream); 
        call.on('stream', function(remoteStream) {
          onReceiveStream(remoteStream, 'peer-camera');
          $(".share-content").fadeOut();
          $("#peer-camera").fadeIn();
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });



  },2000);


} else {
    // conncect
    
    peer_id = location.hash.replace('#','');

    navigator.getUserMedia({video: true, audio: true}, function(stream) {
      var call = peer.call(peer_id, stream);
      call.on('stream', function(remoteStream) {
        onReceiveStream(remoteStream, 'peer-camera');
        $(".share-content").fadeOut();
        $("#peer-camera").fadeIn();
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });

    // call = peer.call(peer_id, window.localStream);
    // call.on('stream', function(stream){
    //   window.peer_stream = stream;
    //   onReceiveStream(stream, 'peer-camera');
    // });

  }

  // peer.on('call', function(call){
  //   onReceiveCall(call);
  // });


  // function onReceiveCall(call){
  //   call.answer(window.localStream);
  //   call.on('stream', function(stream){
  //     window.peer_stream = stream;
  //     onReceiveStream(stream, 'peer-camera');
  //   });
  // }

  window.onbeforeunload = function(e) {
   peer.destroy();
 };

});
