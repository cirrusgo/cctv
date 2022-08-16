import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from 'react-hls-player';
import * as queries from './graphql/queries';
import { BrowserRouter as Router, Route, Link, Switch, Routes } from "react-router-dom";
import './videoPlayer.jsx';
import {Paper, IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import  Amplify , {API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {listRawVideos} from './graphql/queries';
import awsconfig from './aws-exports';
import { useState } from 'react';
import { useEffect } from 'react';
import { Filter, TransferWithinAStationSharp } from '@material-ui/icons';
import videoPlayer from './videoPlayer';
import './App.css';
Amplify.configure(awsconfig);





function App({ signOut, user }) {

  console.log('before configure');


  console.log('before API Gateway');

  const createUser = async () => {
    const attr = await Auth.currentAuthenticatedUser();
    fetch('https://ngbccow92d.execute-api.us-east-1.amazonaws.com/test?email='+attr.attributes.email);
  }

  createUser();
  


  Storage.configure({
    customPrefix: {
        public: ''
    },
    // ...
  })


  const [video, setVideo] = useState([])

  console.log('before Appsync API');


  useEffect(() =>{
    fetchVideo()
  }, []);


  const fetchVideo = async () => {
    try {
      const att = await Auth.currentAuthenticatedUser();
      const videoData=await API.graphql(graphqlOperation(queries.listRawVideos,{filter:{user_email:{eq:att.attributes.email}}}));
      console.log('user', att.attributes.email);
      const videoList = videoData.data.listRawVideos.items;
      console.log('video list', videoData);
      setVideo(videoList)
    } catch (error) {
      console.log('error fetching  :  ', error);

    }

  };

  async function generateDownloadLink(filekey,filename){
    const result=await Storage.get(filekey, {download: true});
    console.log('video result', result);
    return downloadBlob(result.Body, filename);
  }

  async function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url;
    a.download=filename;
    document.body.appendChild(a);
    a.click();
    return a;
  }


  async function renderHLS(src,elid){
    ReactDOM.render(
      <ReactHlsPlayer
        src={src}
        autoPlay={true}
        controls={true}
        width="40%"
        height="40%"
      />,
      document.getElementById(elid)
    );
  }



  return (
    <div className='mainDiv'>
      <div className='logo'>
        <h1>CirrusEye App</h1>

      </div>
      <div className="videoList">
        {video.map(vid =>{
          const unixDate=vid.recorded_at*1000;
          const dateObject = new Date(unixDate);
          const humanDateFormat = dateObject.toLocaleString();


          return (
            <Paper variant='outlined' elevation={2}>
              <div className="videoCard">
              <div>
                <div className="videoName">File Name: {vid.file_name}</div>
                <div className="videoCamera">Camera: {vid.camera}</div>
                <div className="videoTime">Recorded At: {humanDateFormat}</div>
              </div>
              
              <IconButton aria-label="download" onClick={() =>generateDownloadLink(vid.file_path,vid.file_name)}>
                <GetAppIcon />
              </IconButton>
              <IconButton aria-label="play" onClick={() =>renderHLS('https://cctv-transcoded.s3.amazonaws.com/'+vid.file_path.replace('.mp4','.m3u8').replace('@','%40'),vid.file_name)}>
                <PlayCircleFilledIcon />
              </IconButton>
              </div>
              <div className='video' id={vid.file_name}></div>
            </Paper>
          )
        })}
      </div>


      <button className='signOut' onClick={signOut}>Sign out</button>
      <div className='cirrusgo'>@cirrusgo</div>
    </div>
  );
}

export default withAuthenticator(App);