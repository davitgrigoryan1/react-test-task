import React from 'react'
import { Table} from "antd";
import {useSelector} from "react-redux";

const { Column } = Table;

const DataTable = () => {
    const { data } = useSelector(state => state.app)

    return data.length ? (
        <Table style={{marginTop: '50px'}}
               dataSource={data}
               key={data.id}
        >
            <Column title='FullName' dataIndex='full_name' key='full_name' />
            <Column title='Owner' key='id' render={e => {
                return <React.Fragment key={e.id}>{e?.owner?.login}</React.Fragment>
            }} />
            <Column title='Stars Count' dataIndex='stargazers_count' key='id' />
            <Column title='Url' key='full_name' render={e => {
                return <a href={e.html_url} >{e.html_url}</a>
            }} />
        </Table>
    ) : ''
}

export default DataTable