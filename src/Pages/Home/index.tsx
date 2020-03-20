import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import './home.css';
import request from '../../request';

interface State {
  isLogin: boolean,
  loaded: boolean,
  data: DataStructure
}

interface BookItem {
  title: string,
  price: number
}

interface DataStructure {
  [key: string]: BookItem[];
}

class Home extends Component {
  state: State = {
    isLogin: true,
    loaded: false,
    data: {}
  };

  componentDidMount() {
    request.get('/api/isLogin').then(res => {
      const data: boolean = res.data;
      if (!data) {
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
    this.handleShowCrowllerData();
  }

  handleLogout = () => {
    request.get('/api/logout').then(res => {
      const data: boolean = res.data;
      if (data) {
        this.setState({
          isLogin: false,
          loaded: false
        });
      } else {
        message.error('退出失败');
      }
    })
  }

  handleGetCrowllerData = () => {
    request.get('/api/getData').then(res => {
      const data: boolean = res.data;
      if (data) {
        message.success('获取成功');
      } else {
        message.error('获取失败');
      }
    })
  }

  handleShowCrowllerData = () => {
    request.get('/api/showData').then(res => {
      const data: DataStructure = res.data;
      if (data) {
        this.setState({
          data
        });
      } else {
        message.error('展示失败');
      }
    })
  }

  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state;
    const bookList: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key:string]: number[];
    } = {};
    const result: echarts.EChartOption.Series[] = [];
    for (let i in data) {
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      const item = data[i];
      item.forEach(ele => {
        const { title, price } = ele;
        if (bookList.indexOf(title) === -1) {
          bookList.push(title);
        }
        tempData[title] ? tempData[title].push(price) : (tempData[title] = [price]);
      });
    }
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      })
    }
    return {
      title: {
          text: '书单价格'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: bookList
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times
      },
      yAxis: {
          type: 'value'
      },
      series: result
    };  
  }
  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="button-group">
              <Button type="primary" style={{ marginRight: '25px' }} onClick={this.handleGetCrowllerData}>爬取</Button>
              <Button type="primary" onClick={this.handleLogout}>退出</Button>
            </div>
            <ReactEcharts option={this.getOption()} />
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
