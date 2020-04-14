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
                    width: 720, // 视频宽度
                    height: 560, // 视频高度
                    frameRate: 10, // 帧率  
                    bitrate: 400, // 比特率 kbpsy
                });
                client
                    .publish(localStream)
                    .catch((error: any) => {
                        console.error("本地流发布失败 " + error);
                    })
                    .then(() => {
                        console.log(localStream);
                        localStream.play("local_video");
                    });
            });
    });
