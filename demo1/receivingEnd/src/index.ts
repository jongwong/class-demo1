
// @ts-ignore
import TRTC from "trtc-js-sdk";
/*
const client = TRTC.createClient({
  mode: "videoCall",
  sdkAppId,
  userId,
  userSig,
});
*/
debugger;
var divvideo = document.querySelector("#video_wrap");
console.log(divvideo);
const roomId = "1234567890";
const sdkAppId = "1400345310";
const userId = "2";
const userSig = "eJwtzMkKwjAUheF3yVrqbYZO4FLikC6qdqG4ERPjNVhCDSKI725pszzfgf9LDmqfvE1PKkITILNxozZdwBtOHPGl3cV71KRKOQDjgqUwPebjsTeDCyEoQNSAz9EKUZYgWBEraIcmnLJd3WCwOVe521qWSaeX67aRUtXt-XGe080RVHfFFSzI7w8bKS7D"

const client = TRTC.createClient({
    mode: "videoCall",
    sdkAppId,
    userId,
    userSig,
});

const remoteVideoWrapEl = document.getElementById("remote_video");
client.on('stream-added', (event: any) => {
    const remoteStream = event.stream;
    console.log('远端流增加: ' + remoteStream.getId());

    //订阅远端流
     client.subscribe(remoteStream);
});
client.on('stream-subscribed', (event: any) => {
    debugger
    const remoteStream = event.stream;
    console.log('远端流订阅成功：' + remoteStream.getId());
    remoteStream.play('remote-video-view');
});
// 监听‘stream-updated’事件
client.on('stream-updated', (event: any) => {
    const remoteStream = event.stream;
    console.log('remoteStream ID: ' + remoteStream.getId() + ' was updated hasAudio: '
        + remoteStream.hasAudio() + ' hasVideo: ' + remoteStream.hasVideo());
});

// @ts-ignore
client
    .join({ roomId })
    .catch((error: any) => {
        console.error("进房失败 " + error);
    })
    .then(() => {
        console.log("进房成功");

    });
