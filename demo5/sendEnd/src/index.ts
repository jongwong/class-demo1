// @ts-ignore
import TRTC from "trtc-js-sdk";
// @ts-ignore
import TIM from 'tim-js-sdk';
// @ts-ignore
import COS from "cos-js-sdk-v5";

// @ts-ignore
window["COS"] = COS;


const roomId = "1234567890";


/*
const toUserId = "2";
const sdkAppId = "1400345310";
const userId = "1";
const userSig =
  "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoZQweKU7MSCgswUJStDEwMDYxNTY0MDiExqRUFmUSpQ3NTU1MjAACpakpkLFrMwtbQ0MDE1gpqSmQ40MyU9zCgi3yvDLzkv3bwwpCLSoyzJsMQvK8jNxNfXPze1KNwsy6jY1cey0MRWqRYAFy8vzw__";
*/



const toUserId = "u2";
const sdkAppId = "1400351114";
const userId = "u1";
const userSig ="eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwqWGUNHilOzEgoLMFCUrQxMDA2NTQ0NDE4hMakVBZlEqUNzU1NTIwMAAIlqSmQsWszCzNDQzMoeqLc5MBxqa75ThnWhpkpHvbOaenJsd6ppdGKOfZ6Kd6Rga7heaEpDq6exW5l*REuJdmm*rVAsAe3owfg__";



/*
const toUserId = "abc1";
const sdkAppId = "1400350225";
const userId = "abc";
const userSig ="eJwtzFELgjAUhuH-sttCzuaOqNBNBRJ6EUyILldOOcpiTDEj*u*Jevk9H7xfVhYqGI1nKRMBsP2yqTKvgWpaWD*eG-dVp52jiqVcAoQIQuD6mMmRN7MjogCAVQeyi8VRwmXE461CzVx9T*jvStrr5aNMdjzlbZe3zQ4TyM4W9a2oy1DwaBr77sB*f5cSMCc_"
*/


var initParams = {
  id: "local_video", // dom节点id
  classId: roomId, // 整数
  sdkAppId: sdkAppId, // 整数
  userId: userId, // 字符串
  userSig: userSig, // 字符串
};
// @ts-ignore
var teduBoard = new window["TEduBoard"](initParams);


teduBoard.setDataSyncEnable(false);
teduBoard.isDataSyncEnable(false);
// @ts-ignore
window["_test"] = teduBoard;
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

// @ts-ignore
const TEduBoard = window["TEduBoard"];



teduBoard.on(TEduBoard.EVENT.TEB_SYNCDATA, (data:any) => {
    console.log(data);
    let message = tim.createCustomMessage({
    to: toUserId,
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      data: JSON.stringify(data),
      description: '',
      extension: 'TXWhiteBoardExt'
    }
  });
  tim.sendMessage(message).then(() => {
    // 同步成功
  }, () => {
    // 同步失败
  });
});



// @ts-ignore
window["uploadFile"] = function() {
debugger
    // @ts-ignore
    var file = document.getElementById('file_input').files[0];
    debugger
    if (/\.(bmp|jpg|jpeg|png|gif|webp|svg|psd|ai)/i.test(file.name)) {
        // this.teduBoard.setBackgroundImage({
        //   data: file,
        //   userData: 'image'
        // });
        teduBoard.addImageElement({
            data: file,
            userData: 'image'
        });
    } else {
        teduBoard.applyFileTranscode({
            data: file,
            userData: '123456'
        }, {
            minResolution: '960x540',
            isStaticPPT: false,
            thumbnailResolution: '200x200'
        });
        teduBoard.on(TEduBoard.EVENT.TEB_TRANSCODEPROGRESS, (res:any) => {
            console.log('=======  TEB_TRANSCODEPROGRESS 转码进度：', JSON.stringify(res));
            if (res.code) {
                console.log('转码失败code:' + res.code + ' message:' + res.message);
            } else {
                let status = res.status;
                if (status === 'ERROR') {
                    console.log('转码失败');
                } else if (status === 'UPLOADING') {
                    console.log('上传中，当前进度:' + parseInt(res.progress) + '%');
                } else if (status === 'CREATED') {
                    console.log('创建转码任务');
                } else if (status === 'QUEUED') {
                    console.log('正在排队等待转码');
                } else if (status === 'PROCESSING') {
                    console.log('转码中，当前进度:' + res.progress + '%');
                } else if (status === 'FINISHED') {
                    console.log('转码完成');
                    teduBoard.addTranscodeFile({
                        url: res.resultUrl,
                        title: res.title,
                        pages: res.pages,
                        resolution: res.resolution
                    });
                }
            }
        });
    }
};
// @ts-ignore
window["clearCurrentFile"] = function () {
    let id = teduBoard.getCurrentFile()
    debugger
    teduBoard.deleteFile(id)
};
// @ts-ignore
window["clearFiles"] = function () {

    let list = teduBoard.getFileInfoList()
    let id = teduBoard.getCurrentFile()
debugger
    /*    list.forEach((file: any) => {


        })*/
};
// @ts-ignore
window["switchFile"] = function () {
    let list = teduBoard.getFileInfoList();


        for (let i = 0; i < list.length; i ++) {

            let file = list[i];
            if (file.fid !== "#DEFAULT" && file.fid !== teduBoard.getCurrentFile()) {
                let boardList = teduBoard.getFileBoardList(file.fid);
                teduBoard.switchFile(file.fid,boardList[0] , 0);
                break;
            }
        }

};

