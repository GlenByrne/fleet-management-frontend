import { NextPage } from 'next';
import Head from 'next/head';
import ClientOnly from '../../core/ClientOnly/ClientOnly';
import DefectList from '../../components/Defects/DefectList';
import styles from '../../styles/Home.module.css';
import Layout from 'core/Layout/Layout';

const Defects: NextPage = () => {
  return (
    <Layout>
      <DefectList />
    </Layout>
  );
};

export default Defects;
