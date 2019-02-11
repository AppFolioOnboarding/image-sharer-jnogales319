import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <div className="text-center js-footer">
        <Row>
          <Col lg={{ size: 4, offset: 4}}>
            <span className="small js-footer-text">Copyright: AppFolio Inc. Onboarding</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Footer;
