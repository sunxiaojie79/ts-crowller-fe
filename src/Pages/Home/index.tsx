import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import './home.css';

class Home extends Component {
  state = {
    isLogin: true,
    loaded: false
  };

  componentDidMount() {
    axios.get('/api/isLogin').then(res => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
      }
    });
  }

  handleLogout = () => {
    axios.get('/api/logout').then(res => {
      if (res.data?.data) {
        this.setState({
          isLogin: false,
          loaded: false
        });
      } else {
        message.error('退出失败');
      }
    })
  }

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <Button type="primary" style={{ marginLeft: '5px' }}>
              爬取
            </Button>
            <Button type="primary">展示</Button>
            <Button type="primary" onClick={this.handleLogout}>退出</Button>
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
