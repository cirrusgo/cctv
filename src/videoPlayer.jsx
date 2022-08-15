import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from 'react-hls-player';
import {Paper, IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import  Amplify , {API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {listRawVideos} from './graphql/queries';
import awsExports from './aws-exports';
import { useState } from 'react';
import { useEffect } from 'react';
import { TransferWithinAStationSharp } from '@material-ui/icons';
Amplify.configure(awsExports);



function videoP({ signOut, user }) {

  async function renderHLS(){
    ReactDOM.render(
      <ReactHlsPlayer
        src="https://cctv-transcoded.s3.amazonaws.com/obada.qafisheh%40cirrusgo.com/3_1659506420.m3u8"
        autoPlay={true}
        controls={true}
        width="40%"
        height="40%"
      />,
      document.getElementById('root')
    );
  }

  return (
    <>
      <div id='sec'>
      <h1>Video Player</h1>
      </div>
      <div id="root">
      </div>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(videoP);