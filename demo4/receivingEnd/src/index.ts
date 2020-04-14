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

const sdkAppId = "1400345310";
const userId = "2";
const userSig = "eJwtzMkKwjAUheF3yVrqbYZO4FLikC6qdqG4ERPjNVhCDSKI725pszzfgf9LDmqfvE1PKkITILNxozZdwBtOHPGl3cV71KRKOQDjgqUwPebjsTeDCyEoQNSAz9EKUZYgWBEraIcmnLJd3WCwOVe521qWSaeX67aRUtXt-XGe080RVHfFFSzI7w8bKS7D"

/*
const sdkAppId = "1400349760";
const userId = "test1";
const userSig ="eJwtzMsKwjAQheF3yVrqpG2SptCFKAWxtIu6EdyImcpUlJAG8YLvbolZnu-A-2H7pk8e6FjJ0gTYImwyePc0UGCPk*fxmMz1ZC0ZVvIcIMu1kvB-8GnJ4exCiBQgqqdbsEIqlUmexwpd5m5Xa5QjHJfFiI0RPnNt4aSyu9eBtvW7lVbjetWZfjOcK-b9ATm2MRw_"

*/


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
    console.log("登录成功");
}).catch((imError: any) => {
    console.warn('login error:', imError); // 登录失败的相关信息
});


// 监听事件，如：
tim.on(TIM.EVENT.SDK_READY, function(event:any) {
    
    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
    // event.name - TIM.EVENT.SDK_READY
});

tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event:any) {
debugger
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
    // event.name - TIM.EVENT.MESSAGE_RECEIVED
    // event.data - 存储 Message 对象的数组 - [Message]
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event:any) {

    // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或以上。
    // event.name - TIM.EVENT.MESSAGE_REVOKED
    // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
});

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event:any) {

    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    // event.data - 存储 Conversation 对象的数组 - [Conversation]
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event:any) {

    // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
    // event.name - TIM.EVENT.GROUP_LIST_UPDATED
    // event.data - 存储 Group 对象的数组 - [Group]
});

tim.on(TIM.EVENT.PROFILE_UPDATED, function(event:any) {

    // 收到自己或好友的资料变更通知
    // event.name - TIM.EVENT.PROFILE_UPDATED
    // event.data - 存储 Profile 对象的数组 - [Profile]
});

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event:any) {

    // 收到黑名单列表更新通知
    // event.name - TIM.EVENT.BLACKLIST_UPDATED
    // event.data - 存储 userID 的数组 - [userID]
});

tim.on(TIM.EVENT.ERROR, function(event:any) {

    // 收到 SDK 发生错误通知，可以获取错误码和错误信息
    // event.name - TIM.EVENT.ERROR
    // event.data.code - 错误码
    // event.data.message - 错误信息
});

tim.on(TIM.EVENT.SDK_NOT_READY, function(event:any) {

    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    // event.name - TIM.EVENT.SDK_NOT_READY
});

tim.on(TIM.EVENT.KICKED_OUT, function(event:any) {

    // 收到被踢下线通知
    // event.name - TIM.EVENT.KICKED_OUT
    // event.data.type - 被踢下线的原因，例如 :
    //   - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
    //   - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
    //   - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢（v2.4.0起支持）。
});

tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event: any) {

    // 网络状态发生改变（v2.5.0 起支持）。
    // event.name - TIM.EVENT.NET_STATE_CHANGE
    // event.data.state 当前网络状态，枚举值及说明如下：
    //   - TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
    //   - TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
    //   - TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
});
