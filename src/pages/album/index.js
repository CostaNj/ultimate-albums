import React, { useCallback, useEffect } from 'react'
import { parse } from 'query-string'
import {Redirect } from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../../__data__/selectors/album'
import { getAlbumInfoAction } from '../../__data__/actions'
import {connect} from 'react-redux';

import { Loader } from '../../components'

import styles from './album.css'

const Album = ({ location, history, getAlbumInfo, isLoading, wiki, tracks, albumInfo, image }) => {

    const query = parse(location?.search)
    if(!query?.name || !query?.artist) {
        return <Redirect to="/error"/>
    }

    useEffect(() => {
        getAlbumInfo(query?.name, query?.artist)
    }, [])

    const handleOnClick = useCallback(() => {
        history.push('/')
    }, [])

    if(isLoading) {
        return <Loader/>
    }
    const imageInfo = image && image.find((img) => img.size === 'mega')

    return (
        <div className={styles.albumContainer}>
            <div className={styles.albumImageContainer}>
                <img src={imageInfo && imageInfo['#text']}/>
            </div>
            <div className={styles.albumTitleContainer}>
                <h2>{`Album: ${query.name}`}</h2>
                <h3>{`Artist: ${query.artist}`}</h3>
            </div>
            <div className={styles.albumBtnContainer}>
                <button onClick={handleOnClick}>Back to my library</button>
            </div>
            <div className={styles.albumWikiContainer}>
                {wiki.content}
            </div>
            <div className={styles.albumTracksContainer}>
                <p>Tracks:</p>
            </div>
            {
                tracks && tracks.map((track)=> <div key={track.name}>{track.name}</div>)
            }
        </div>
    )
}

const mapStateToProps = () => createStructuredSelector({
    albumInfo: selectors.getAlbumInfo,
    isLoading: selectors.getLoadingStatus,
    wiki: selectors.getWiki,
    tracks: selectors.getTracks,
    image: selectors.getImage
})

const mapDispatchToProps = (dispatch) => ({
    getAlbumInfo: (name, artist) => dispatch(getAlbumInfoAction(name, artist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Album)