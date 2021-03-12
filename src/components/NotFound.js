import React from 'react'
import {Button, Result} from "antd";
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    let history = useHistory();

    const redirect = () => {
        history.push('/')
    }
    return(
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={redirect}>Back Home</Button>}
        />
    )
}

export default NotFound