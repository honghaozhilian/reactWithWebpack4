import React,{Component} from 'react';
import './index.scss';
// import image from './images/bg.png';
import { Row, Col, Icon,Input } from 'antd';

class Page1 extends Component{
    render() {
        return (
            <div>
                <div styleName='page-box'>
                    this is Page1
                </div>
                <Row>
                    <Col>
                        <Input placeholder="请输入分组名称" />
                    </Col>
                    <Col>
                        <Input placeholder="请输入分组描述" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Icon type="home" />
                    </Col>
                    <Col>
                        <Icon type="close" />
                    </Col>
                </Row>
            </div>
            
        )
    }
}

export default Page1