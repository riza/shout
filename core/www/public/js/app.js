$(() => {

  var conn, peer_id, call;
  var ayo = io();

  var peer = new Peer({port:3000,host:'/',path:'/peerjs',debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
    credential: 'muazkh', username: 'webrtc@live.com' }
    ]}
  });

  peer.on('connection',function(id){
    console.log(id);
  });

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


  function getVideo(callback) {
    navigator.getUserMedia(
      {audio: true, video: true},
      callback,
      function(error){
        console.log(error);
        alert('An error occurred. Please try again');
      }
      );
  }

  function onReceiveStream(stream, element_id) {
    var video = $('#' + element_id + ' video')[0];
    video.src = window.URL.createObjectURL(stream);
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
