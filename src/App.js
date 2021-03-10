import React, {useEffect} from 'react'
import './App.css';
// import { FirebaseDatabaseNode, FirebaseDatabaseProvider} from "@react-firebase/database";
// import 'firebase/database';
import {Typography, Input, Layout, Button, Table, message} from 'antd';
import {connect, useDispatch, useSelector} from "react-redux";
import {setOwner, setRepo, getData} from "./store/appReducer";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';

const { Title } = Typography;
const { Column } = Table;

const App = ({setOwner, setRepo, getData, location}) => {
    useEffect(() => {
        const {repository, owner, page} = queryString.parse(location.search);
        if(repository && owner) {
            getData(owner, repository, page || 1).then(e => {
                if(e?.data?.length) {
                    message.success('Success')
                } else  {
                    message.error("Not found")
                }
            })
        }
    },[location.search, getData])

    const dispatch = useDispatch()
    const {owner, repo, loading, data} = useSelector(state => state.app)
    const onSearch = () => {
        getData(owner, repo).then(e => {
            if(e?.data?.length) {
                message.success('Success')
            } else  {
                message.error("Not found")
            }
        })
    }
    return(
        <div>
            <Layout className={'app-layout'} >
                <Title>Github Forks</Title>
                <Input.Group compact>
                    <Input style={{ width: '25%' }} placeholder='Owner' value={owner} onChange={e =>dispatch(setOwner(e.target.value)) } />
                    <Input style={{ width: '30%' }} placeholder='Repository' value={repo} onChange={e =>dispatch(setRepo(e.target.value)) } />
                    <Button onClick={onSearch} loading={loading} >Search</Button>
                </Input.Group>
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
            </Layout>
        </div>
    )
}

export default withRouter(connect(null,{setOwner, setRepo, getData})(App));
