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

const roomId = "1234567890";
const sdkAppId = "1400345310";
const userId = "1";
const userSig =
  "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoZQweKU7MSCgswUJStDEwMDYxNTY0MDiExqRUFmUSpQ3NTU1MjAACpakpkLFrMwtbQ0MDE1gpqSmQ40MyU9zCgi3yvDLzkv3bwwpCLSoyzJsMQvK8jNxNfXPze1KNwsy6jY1cey0MRWqRYAFy8vzw__";

const client = TRTC.createClient({
  mode: "live",
  sdkAppId,
  userId,
  userSig,
});
client
  .join({ roomId })
  .catch((error: any) => {
    console.error("进房失败 " + error);
  })
  .then(() => {
    console.log("进房成功");
    const localStream = TRTC.createStream({ userId, audio: true, video: true });
    localStream
      .initialize()
      .catch((error: any) => {
        console.error("初始化本地流失败 " + error);
      })
      .then(() => {
        console.log("初始化本地流成功");
        localStream.setVideoProfile({
          width: 360, // 视频宽度
          height: 360, // 视频高度
          frameRate: 10, // 帧率
          bitrate: 400, // 比特率 kbps
        });
        client
          .publish(localStream)
          .catch((error: any) => {
            console.error("本地流发布失败 " + error);
          })
          .then(() => {
            localStream.play("local_video");
          });
      });
  });

const shareUserId = "6";
const shareUserSig =
  "eJwtzMsKwjAURdF-yVQpN0kTY6EDdSIitGAR7EzIw4uv0AQtiP9uiRmedWB-SLc-FC8zkIqwAsg8bdTmEdFiYpkx6OvZe9SkoiUALwWn8H-M6HEwkwshGEDWiPdkSnLOKWW5gm5qerlolH3vZtJdcITV8rlu401tQ*t1t7G9OwGE0B9Do2ry-QH*UC9q";

const shareClient = TRTC.createClient({
  mode: "live",
  sdkAppId,
  userId: shareUserId,
  userSig: shareUserSig,
});

// 指明该 shareClient 默认不接收任何远端流 （它只负责发送屏幕分享流）

shareClient.setDefaultMuteRemoteStreams(true);
shareClient.join({ roomId }).then(() => {
  debugger;
  console.log("shareClient join success");
  // 创建屏幕分享流
  const localStream = TRTC.createStream({ audio: false, screen: true });
/*  localStream.setVideoProfile({
    width: 360, // 视频宽度
    height: 360, // 视频高度
    frameRate: 10, // 帧率
    bitrate: 400, // 比特率 kbps
  });*/
  localStream.initialize().then(() => {
    // screencast stream init success
    shareClient.publish(localStream).then(() => {
      debugger;
      console.log("screen casting");
    });
  });
});

// 主 Client 中指定取消订阅 shareId 的远端流
client.on("stream-added", (event: any) => {
  const remoteStream = event.stream;
  const remoteUserId = remoteStream.getUserId();
  if (remoteUserId === shareUserId) {
    // 取消订阅自己的屏幕分享流
    client.unsubscribe(remoteStream);
  } else {
    // 订阅其他一般远端流
    client.subscribe(remoteStream);
  }
});
