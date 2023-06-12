import React, {useEffect, useState} from 'react';
import './styles.css';
import axios from 'axios';
import {Container, Header, List} from "semantic-ui-react";
import {UsersUrl} from "../models/UsersUrl";
import NavBar from "./NavBar";
import UrlDashboard from "../../features/urls/dashboard/UrlDashboard";
import agent from "../api/agent";
import {CreateUrlDto} from "../models/Dto/CreateUrlDto";
import {v4 as uuid} from 'uuid';
import LoadingComponent from "./LoadingComponent";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <div className="App">
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
                <Outlet />
            </Container>
        </>
    </div>
  );
}

export default observer(App);
