import React from 'react';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBox, VideoList, VideoPlayer} from './components';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null 
    }

    componentDidMount() {
        this.handleSubmit('Manchester United');
    }

    onVideoClick = (video) => {
        this.setState({ selectedVideo: video });
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyBF7EPpRKKbqP0pi-TAeKw4dKJVPpomHb8',
                q: searchTerm
            }
        });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }
    
    render() {
        return (
            <Grid justify = 'center' container spacing = {10}>
                <Grid item xs = {12}>
                    <Grid container spacing = {10}>
                        <Grid item xs = {12}>
                            <SearchBox onFormSubmit = {this.handleSubmit}/>
                        </Grid>
                        <Grid item xs = {8}>
                            <VideoPlayer video = {this.state.selectedVideo} />
                        </Grid>
                        <Grid item xs = {4}>
                            <VideoList videos = {this.state.videos} onVideoClick = {this.onVideoClick} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;