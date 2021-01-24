// import React,{Component} from 'react'
import React from 'react'
const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.characterDate.map((row,index)=>{
        return (
            /**
             * @description
             * 您会注意到我已经向每个表行添加了一个键索引。
             * 在React中创建列表时，应始终使用键，
             * 因为它们有助于识别每个列表项。我们还将在需要操纵列表项的时刻看到这是必要的。
             */
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={ () => props.removeCharacter(index)}> Delete </button>
                </td>
            </tr>
        )
    })
    return <table>{rows}</table>
}

//1. 类组件
// class Table extends Component{
//     render() {
//
//         /**
//          * @description
//          * 道具是将现有数据传递到React组件的有效方法，但是该组件无法更改道具-它们是只读的。
//          * 在下一节中，我们将学习如何使用状态来进一步控制React中的数据处理。
//          */
//         const {characterDate} = this.props
//         return (
//             <table>
//                 <TableHeader>
//
//                 </TableHeader>
//                 <TableBody characterDate={characterDate} >
//
//                 </TableBody>
//             </table>
//         );
//     }
// }

// 2. 简单组件
const Table = (props) => {
    const {characterDate , removeCharacter} = props;
    return (
        <table>
            <TableHeader />
            <TableBody characterDate = {characterDate} removeCharacter = {removeCharacter}/>
        </table>
    )
}

export default Table