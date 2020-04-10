// @ts-ignore
import TRTC from "trtc-js-sdk";
// @ts-ignore
import TIM from 'tim-js-sdk';
// @ts-ignore
import COS from "cos-js-sdk-v5";
import any = jasmine.any;
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


let options = {
    SDKAppID: sdkAppId
};

let tim = TIM.create(options); // SDK 实例通常用 tim 表示


tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// 注册 COS SDK 插件
tim.registerPlugin({'cos-js-sdk': COS});
let promise = tim.login({userID: userId, userSig: userSig});
promise.then((imResponse: any) => {
    console.log(imResponse.data); // 登录成功
    console.log("tim 登录成功");
}).catch((imError: any) => {
    console.warn('login error:', imError); // 登录失败的相关信息
});
