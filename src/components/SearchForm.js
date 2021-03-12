import React from 'react'
import {Button, Form, Input, message} from "antd";
import {connect, useDispatch, useSelector} from "react-redux";
import {getData, setOwner, setRepo} from "../store/appReducer";

const SearchForm = ({setOwner, setRepo, getData,}) => {
    const dispatch = useDispatch()
    const {owner, repo, loading} = useSelector(state => state.app)
    const handleSubmit = () => {
        getData(owner, repo).then(e => {
            if(e?.data?.length) {
                message.success('Success')
            } else  {
                message.error("Not found")
            }
        })
    }
    return (<Form onFinish={handleSubmit}  wrapperCol={{span:20}} >
        <Form.Item>
            <Input.Group compact>
                <Input style={{ width: '25%' }} placeholder='Owner' value={owner} onChange={e =>dispatch(setOwner(e.target.value)) } />
                <Input style={{ width: '30%' }} placeholder='Repository' value={repo} onChange={e =>dispatch(setRepo(e.target.value)) } />
                <Button htmlType="submit" loading={loading}  type={'submit'} >Search</Button>
            </Input.Group>
        </Form.Item>
    </Form>)
}

export default connect(null,{setOwner, setRepo, getData})(SearchForm)