import React from 'react'
import { Table} from "antd";
import {connect, useSelector} from "react-redux";
import {getData} from "../store/appReducer";

const { Column } = Table;

const DataTable = ({getData}) => {
    const { data, per_page, forks_count, owner, repo, page } = useSelector(state => state.app)
    const handleChange = (e) =>{
        getData(owner, repo, e, per_page, 'paginate')
    }

    return data.length ? (
        <Table style={{marginTop: '50px'}}
               dataSource={data}
               key={data.id}
               pagination={{
                   onChange: handleChange,
                   pageSize: per_page,
                   total: forks_count,
                   current: +page,
                   defaultCurrent: 1,
                   showSizeChanger:false
               }}
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

export default connect(null, {getData})(DataTable)