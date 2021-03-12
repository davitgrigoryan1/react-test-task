import React from 'react'
import './App.css';
import {Typography, Layout} from 'antd';
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";

const { Title } = Typography;
const App = () => {
    return(
        <Layout className={'app-layout'} >
            <Title>Hello !!! Search Github Forks</Title>
            <SearchForm />
            <DataTable  />
        </Layout>
    )
}

export default App
