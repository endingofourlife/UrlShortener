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


function App() {
  const [urls, setUrls] = useState<UsersUrl[]>([]);

  useEffect(()=>{
    agent.Urls.list().then(response => {
      let urls: UsersUrl[] = [];
      response.forEach(url => {
          url.createdDate = url.createdDate.split('T')[0];
        urls.push(url);
      })
        setUrls(urls);
    })
  }, []);

  function handleCreateUrl(url: CreateUrlDto){
      const trueUrl:UsersUrl = {
          id: uuid(),
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl,
          createdDate: new Date().toISOString().split('T')[0],
          userId: url.userId
      }
      setUrls([...urls, trueUrl]);
  }
  function handleDeleteUrl(id: string){
      setUrls([...urls.filter(x=>x.id !== id)])
  }
  function handleDeleteAllUrls(){
      setUrls([])
  }
  return (
    <div className="App">
        <NavBar />
         <Container style={{marginTop: '7em'}}>
             <UrlDashboard urls={urls} createUrl={handleCreateUrl} deleteUrl={handleDeleteUrl} deleteAllUrls={handleDeleteAllUrls}/>
         </Container>
    </div>
  );
}

export default App;
