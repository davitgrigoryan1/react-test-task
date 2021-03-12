import React,{useEffect} from 'react'
import queryString from "query-string";
import {Layout, message, Typography} from "antd";
import SearchForm from "./SearchForm";
import DataTable from "./DataTable";
import {withRouter} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {getData, setRepo, setOwner} from "../store/appReducer";


const { Title } = Typography;
const AppWithData = ({getData, setRepo, setOwner, location}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const {repository, owner, page} = queryString.parse(location.search);
        if(repository && owner) {
                    dispatch(setRepo(repository))
                    dispatch(setOwner(owner))
            getData(owner, repository, page || 1).then(e => {
                if(e?.data?.length) {
                    message.success('Success')
                } else  {
                    message.error("Not found")
                }
            })
        } else {
            message.warning('repository and owner are required')
        }
    },[location.search, getData, dispatch, setOwner, setRepo])

    return(
        <Layout className={'app-layout'} >
            <Title>Hello !!! Search Github Forks</Title>
            <SearchForm  />
            <DataTable  />
        </Layout>
    )
}

export default withRouter(connect(null,{ getData, setRepo, setOwner})(AppWithData));