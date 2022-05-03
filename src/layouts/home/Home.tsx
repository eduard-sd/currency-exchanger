import React from 'react';
import styles from './Home.module.scss';
import { Form } from '../../components/Form/Form';

function Home() {
    return (
        <div className={styles.home}>
            <Form />
        </div>
    );
}

export default Home;
