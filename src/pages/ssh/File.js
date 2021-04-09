import React from "react";
import "antd/dist/antd.css";
import { Tree } from "antd";
const { DirectoryTree } = Tree;

class File extends React.Component{
    constructor(props) {
        super(props);
        this.treeData = [
            {
                title: "parent 0",
                key: "0-0",
                children: [
                    {
                        title: "leaf 0-0",
                        key: "0-0-0",
                        isLeaf: true
                    },
                    {
                        title: "leaf 0-1",
                        key: "0-0-1",
                        isLeaf: true
                    }
                ]
            },
            {
                title: "parent 1",
                key: "0-1",
                children: [
                    {
                        title: "leaf 1-0",
                        key: "0-1-0",
                        isLeaf: true
                    },
                    {
                        title: "leaf 1-1",
                        key: "0-1-1",
                        isLeaf: true
                    }
                ]
            }
        ];
    }
    onSelect = (keys, info) => {
        console.log("Trigger Select", keys, info);
    };
    onExpand = () => {
        console.log("Trigger Expand");
    };
     render() {

        return (
            <DirectoryTree
                multiple
                defaultExpandAll
                onSelect={this.onSelect}
                onExpand={this.onExpand}
                treeData={this.treeData}
            />
        );
    };
}
export default File
