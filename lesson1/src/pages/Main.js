import React from 'react';
import Header from '../components/Header';
import Footer, { Footer2 } from '../components/Footer';
import Person from '../components/Person';
import Dz1 from '../components/dz1/Dz1';
import Example from '../components/Example';

const Main = () => {
    return (
        <div>
            <Header/>
            <h1>Main</h1>
            <Footer/>
            <Footer2/>
            <Person name={'Bakyt'} age={18} email={"bak@mail.ru"}/>
            <Person name={'Kuban'} age={28} email={"bkub@mail.ru"}/>
            <Dz1 title={'DZ1'}/>
            <Example name={'Alex'} email={'alex@gmail.com'}>
            <p style={{color: "green", fontSize: 20}}>title <span style={{color: "red"}}>Alex</span></p>:
            <p>age</p>: 18
            </Example>
        </div>
    );
};
export default Main;