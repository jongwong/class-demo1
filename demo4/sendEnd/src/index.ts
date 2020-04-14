// @ts-ignore
import TRTC from "trtc-js-sdk";
// @ts-ignore
import TIM from 'tim-js-sdk';
// @ts-ignore
import COS from "cos-js-sdk-v5";

const toUserId = "2";
const sdkAppId = "1400345310";
const userId = "1";
const userSig =
    "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoZQweKU7MSCgswUJStDEwMDYxNTY0MDiExqRUFmUSpQ3NTU1MjAACpakpkLFrMwtbQ0MDE1gpqSmQ40MyU9zCgi3yvDLzkv3bwwpCLSoyzJsMQvK8jNxNfXPze1KNwsy6jY1cey0MRWqRYAFy8vzw__";


/*
const toUserId = "test1";
const sdkAppId = "1400349760";
const userId = "jongwong";
const userSig =
    "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwln5eenlQAyVK07JTiwoyExRsjI0MTAwNrE0NzOAyKRWFGQWpQLFTU1NjQwMoKIlmblgMQszc3NjUzNDqCmZ6SAbU7Utg-ICKx3NfD380zMC3TI90gLdIqr8snPNg8MMwixMS3LdItzzc-yTbZVqAfSdMoc_";
*/


let options = {
    SDKAppID: sdkAppId
};

let tim = TIM.create(options); // SDK 实例通常用 tim 表示


tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// 注册 COS SDK 插件
tim.registerPlugin({'cos-js-sdk': COS});
let promise = tim.login({userID: userId, userSig: userSig});

//登录tim
promise.then((imResponse: any) => {
    console.log(imResponse.data); // 登录成功
    console.log("tim 登录成功");





    // @ts-ignore
    window["sendMessage"] = function () {
        // 2. 发送消息
        debugger
        let message = tim.createTextMessage({
            to: toUserId,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: {
                text: 'Hello world!==========='
            }
        });
        let promise = tim.sendMessage(message);
        promise.then(function(imResponse: any) {
            // 发送成功
        debugger
            console.log(imResponse);
        }).catch(function(imError : any) {
            // 发送失败
            console.warn('sendMessage error:', imError);
        });
    }




}).catch((imError: any) => {
    console.warn('login error:', imError); // 登录失败的相关信息
});


