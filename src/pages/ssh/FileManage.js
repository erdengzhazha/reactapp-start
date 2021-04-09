import React from 'react';
import 'antd/dist/antd.css';
import './css/fileManage.css';
import { Drawer, Button } from 'antd';
import File from "./File";
class FileManage extends React.Component {
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

    render() {
        return (
            <div className="site-drawer-render-in-current-wrapper">
                Render in this
                <div style={{ marginTop: 16 }}>
                    <Button type="primary" onClick={this.showDrawer}>
                        Open
                    </Button>
                </div>
                <Drawer
                    title="Basic Drawer"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                >
                    <File></File>
                </Drawer>
            </div>
        );
    }
}

export default FileManage