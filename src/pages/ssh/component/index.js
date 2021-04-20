import React from 'react';
import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css'
// import WSSHClient from '../module/webssh'
import 'antd/dist/antd.css';
import { Drawer, Button } from 'antd';
import File from "./File";
import '../css/index.css'
import FileDetail from '../component/FileDetail'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
/**
 * WebSSH组建
 */
class WebSSH extends React.Component {
    state = { visible: false };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    constructor(props) {
        super(props)
        this.operate = 'connect'
        this.host = '172.16.22.36'
        this.port = '22'
        this.username = 'root'
        this.password = 'wdz!!2020'
        this.name = 'XiuEr'
        this.stompClient = null;
        this.SOCKET_ENDPOINT = "http://172.16.3.192:8849/mydlq?authenticator=C3DACDD1053C246CFAFF59A70243E33E170B58DA45CDE7FF83C9895A9FB7C7AE355A62D1754D3AB85F0C645A66364880"; // 这边的地址不可以填写域名,请填写ip
        this.SUBSCRIBE_PREFIX = "/user/topic";
        this.SUBSCRIBE = "/user/topic";
        this.SEND_ENDPOINT = "/app/test";
    }
    componentDidMount(){
        // this.openTerminal({
        //     operate:this.operate,
        //     host: this.host,//IP
        //     port: this.port,//端口号
        //     username: this.username,//用户名
        //     password: this.password//密码*/
        // });
        const SUBSCRIBE = this.SUBSCRIBE;
        const SEND_ENDPOINT = this.SEND_ENDPOINT;
        const SUBSCRIBE_PREFIX = this.SUBSCRIBE_PREFIX;
        // 1. 初始化stomp连接
        const sock = new SockJS(this.SOCKET_ENDPOINT);
        // 配置 STOMP 客户端
        const stompClient = Stomp.over(sock);
        this.stompClient = stompClient;
        // STOMP 客户端连接
        const headers = {
            login: '172.16.22.36',
            passcode: 'mypasscode',
            // additional header
            // 'client-id': 'my-client-id'
            authenticator: 'C3DACDD1053C246CFAFF59A70243E33E170B58DA45CDE7FF83C9895A9FB7C7AE355A62D1754D3AB85F0C645A66364880'   //传token
        };
        // 2. 初始化term框架
        const term = new Terminal({
            cols: 97,
            rows: 37,
            cursorBlink: true, // 光标闪烁
            cursorStyle: "block", // 光标样式  null | 'block' | 'underline' | 'bar'
            scrollback: 800, //回滚
            tabStopWidth: 8, //制表宽度
            screenKeys: true
        });
        // term在哪个element展示
        term.open(document.getElementById('terminal'));
        // 在页面上显示连接中...
        term.write('WellCome to Avengers ... host : 172.16.22.36 \n \r');
        stompClient.connect(headers,
            function (frame) { // 成功连接
                // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
                console.log('已连接【' + frame + '】');
                term.write(frame.body);
                console.log(SUBSCRIBE_PREFIX)
                const subscribe = stompClient.subscribe(SUBSCRIBE_PREFIX, function (response) {
                    console.log("订阅成功! 返回值 = " + response.body)
                    term.write(response.body);
                });
                console.log(subscribe)
                // 退订的方法
                // stompClient.unsubscribe();
            },
            function errorCallBack (error) { // 连接失败
                // 连接失败时（服务器响应 ERROR 帧）的回调方法
                console.log('连接失败【' + error + '】');
                term.write('Error: ' + error + '\r\n');
            });
        /**
         * 3. 发起客户端的common命令
         */
        term.onData( function (data) {
            console.log("输入 === >" + data)
            // alert(data)

            term.write(data);
            console.log('execute ,xterm.on {}',data)
            //键盘输入时的回调函数 , 发起websocket信息
            // 设置待发送的消息内容
            const message = '{"destination": "' + SUBSCRIBE + '", "content": "' + data + '"}';
            // const messg
            // 发送消息
            stompClient.send(SEND_ENDPOINT, {authenticator:'C3DACDD1053C246CFAFF59A70243E33E170B58DA45CDE7FF83C9895A9FB7C7AE355A62D1754D3AB85F0C645A66364880'}, data);
        });
    }

    render() {
        return (
            <div className="site-drawer-render-in-current-wrapper">
                <div style={{ marginTop: 16 }}>
                    <div>
                        <Button style={{ width: '100%' ,height: '44px' }} type="primary" onClick={this.showDrawer}>
                            文件管理
                        </Button>

                        {/*显示 终端*/}
                        <div id="terminal" ></div>
                    </div>
                </div>

                <Drawer
                    title="小技巧: 按ESC退出弹框"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                    height = {700}
                >
                    <div >
                        <div>
                            <button>上传文件</button>
                        </div>
                        <div className="wrap_file">
                            <File></File>
                            <FileDetail></FileDetail>
                        </div>
                    </div>

                </Drawer>
            </div>
        );
    }

    /* 断开连接 */
    disconnect = (stompClient) => {
        stompClient.disconnect(function() {
            alert("断开连接");
        });
    }
    /**
     * 打开终端
     */
    openTerminal=(options)=>{
        // 设置 STOMP 客户端
        // console.log(options)
        // 1. 初始化WebSocket 链接
        // const client = new WSSHClient();


        // webSocket执行连接操作
        // client.connect({
        //     onError: function (error) {
        //         // 连接失败回调
        //         term.write('Error: ' + error + '\r\n');
        //     },
        //     onConnect: function () {
        //         //连接成功回调
        //         client.sendInitData(options);
        //     },
        //     onClose: function () {
        //         //连接关闭回调
        //         term.write("\rconnection closed");
        //     },
        //     onData: function (data) {
        //         // 用户输入的时候 and 服务器返回给term数据的时候显示
        //         console.log('i get the date {}',data)
        //         term.write(data);
        //     }
        // });

    }
    /* 发送消息并指定目标地址（这里设置的目标地址为自身订阅消息的地址，当然也可以设置为其它地址） */
    // sendMessageNoParameter =(sendContent)=>{
    //     // 设置待发送的消息内容
    //     const message = '{"destination": "' + SUBSCRIBE + '", "content": "' + sendContent + '"}';
    //     // 发送消息
    //     this.stompClient.send(SEND_ENDPOINT, {}, message);
    // }
}

export default WebSSH