import React, {useEffect} from 'react'
import './App.css';
import {Typography, Layout, message} from 'antd';
import {connect} from "react-redux";
import {setOwner, setRepo, getData} from "./store/appReducer";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";

const { Title } = Typography;
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

    return(
        <div>
            <Layout className={'app-layout'} >
                <Title>Hello !!! Search Github Forks</Title>
                <SearchForm setOwner={setOwner} setRepo={setRepo} getData={getData}  />
                <DataTable  />
            </Layout>
        </div>
    )
}

export default withRouter(connect(null,{setOwner, setRepo, getData})(App));
