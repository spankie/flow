import React from "react";
import { Divider, Card, Col, Row, Button } from "antd";

function Flow(props) {
  return (
    <div style={{ background: '#ECECEC', padding: '1rem' }}>
      <Button>Create new function</Button>
      <Divider/>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default Flow;
