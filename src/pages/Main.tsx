import React, { FC } from 'react';
import { Layout } from 'antd';

import CurrentCard from '../components/CardForecast/CardForecast';
import AddLocation from '../components/AddLocation/AddLocation';
import SevenForeCast from '../components/SevenForcast/SevenForeCast';
import Locations from '../components/Locations/Locations';

import styles from './Main.module.css';
import svg from '../assets/weather.svg';

const { Header, Content } = Layout;

const Main: FC = () => {
  return (
    <Layout className={styles.siteLayoutContent}>
      <Header className={styles.header} style={{ backgroundColor: 'white' }}>
        <img className={styles.logo} width="40" src={svg} alt="weather logo" />
        <span className={styles.title}>Weather</span>
        <AddLocation />
      </Header>
      <Locations />
      <SevenForeCast />
      <Content>
        <CurrentCard />
      </Content>
    </Layout>
  );
};

export default Main;
