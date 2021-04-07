
import React from 'react';
import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
import '../../css/ssh/terminal.css';
import '/Users/chen_mac/WebstormProjects/reactapp-start/node_modules/xterm/css/xterm.css'
import WSSHClient from '../../modules/ssh/webssh'


/**
 * WebSSH组建
 */
class WebSSH extends React.Component {

    componentDidMount(){
        this.openTerminal({
            operate:'connect',
            host: '172.16.22.36',//IP
            port: '22',//端口号
            username: 'root',//用户名
            password: 'wdz!!2020'//密码*/
        });
    }
    render() {
        return (
            <div id="terminal" ></div>
        )
    }

    /**
     * 打开终端
     */
    openTerminal=(options)=>{
        console.log(options)
        // 1. 初始化WebSocket 链接
        const client = new WSSHClient();
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
        /**
         * 3. 发起客户端的common命令
         */
        term.onData( function (data) {
            console.log('execute ,xterm.on {}',data)
            //键盘输入时的回调函数 , 发起websocket信息
            client.sendClientData(data);
        });

        // term在哪个element展示
        term.open(document.getElementById('terminal'));

        // 在页面上显示连接中...
        term.write('WellCome to Avengers ... host : 172.16.22.36 \n \r');


        // webSocket执行连接操作
        client.connect({
            onError: function (error) {
                // 连接失败回调
                term.write('Error: ' + error + '\r\n');
            },
            onConnect: function () {
                //连接成功回调
                client.sendInitData(options);
            },
            onClose: function () {
                //连接关闭回调
                term.write("\rconnection closed");
            },
            onData: function (data) {
                // 用户输入的时候 and 服务器返回给term数据的时候显示
                console.log('i get the date {}',data)
                term.write(data);
            }
        });
    }
}

export default WebSSH