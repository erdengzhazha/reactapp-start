/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the AGPL-3.0 License.
 */
import React from 'react';
import { Button } from 'antd';
import { AuthDiv } from '../../components';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import FileManager from './FileManager';
import { http, X_TOKEN } from '../../libs';

import styles from './index.module.css';


class WebSSH extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.socket = null;
    this.term = new Terminal();
    this.container = null;
    this.input = null;
    this.state = {
      visible: false,
      uploading: false,
      managerDisabled: false,
      host: {
        name: '陈炜的计算机',
        hostname: '161',
        operate:'connect',
        host: '172.16.22.36',//IP
        port: '22',//端口号
        username: 'root',//用户名
        password: 'wdz!!2020'//密码*/
      },
      percent: 0
    }
  }

  componentDidMount() {
    // this._fetch();
    const fitPlugin = new FitAddon();
    this.term.loadAddon(fitPlugin);
    this.term.loadAddon(new WebLinksAddon())
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // this.socket = new WebSocket(`${protocol}//${window.location.host}/api/ws/ssh/${this.id}/?x-token=${X_TOKEN}`);
    this.socket = new WebSocket(`${protocol}//127.0.0.1:8848/webssh`);
    // socket拿到的信息写数据

    this.socket.onmessage = e => {
      console.log('e:{}',e)
      this._read_as_text(e.data)
    } ;


    this.socket.onopen = () => {
      this.term.open(this.container);
      this.term.write('wellcom to avenger , 😄 ✈️' )
      this.term.focus();
      fitPlugin.fit();
    };

    this.socket.onclose = e => {
      if (e.code === 3333) {
        window.location.href = "about:blank";
        window.close()
      } else {
        setTimeout(() => this.term.write('\r\nConnection is closed.\r\n'), 200)
      }
    };
    this.term.onData(data => this.socket.send(JSON.stringify({data})));
    this.term.onResize(({cols, rows}) => {
      this.socket.send(JSON.stringify({resize: [cols, rows]}))
    });
    window.onresize = () => fitPlugin.fit()
  }

  _read_as_text = (data) => {
    const reader = new window.FileReader();
    reader.onload = () => this.term.write(reader.result);
    reader.readAsText(data, 'utf-8')
  };

  handleShow = () => {
    this.setState({visible: !this.state.visible})
  };

  _fetch = () => {
    http.get(`/api/host/?id=${this.id}`)
      .then(res => {
        document.title = res.name;
        this.setState({host: res, managerDisabled: false})
      })
  };

  render() {
    const {host, visible, managerDisabled} = this.state;
    return (
      <div className={styles.container}>

        <div className={styles.header}>
          <div>{host.name} | {host.username}@{host.hostname}:{host.port}</div>
          <AuthDiv auth="host.console.manager">
            <Button disabled={managerDisabled} type="primary" icon="folder-open"
                    onClick={this.handleShow}>文件管理器</Button>
          </AuthDiv>
        </div>

        <div className={styles.terminal}>
          <div ref={ref => this.container = ref}/>
        </div>
        <FileManager id={this.id} visible={visible} onClose={this.handleShow}/>
      </div>
    )
  }
}

export default WebSSH