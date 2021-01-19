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

const TableBody = () => {
    return <tbody />
}
class Table extends React.Component{
    render() {
        const {characterData} = this.props
        return (
            <table>
                <TableHeader></TableHeader>
                <TableBody characterData={characterData} ></TableBody>
            </table>
        );
    }
}

export default Table