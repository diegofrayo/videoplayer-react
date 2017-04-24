// npm libs
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import Song from 'components/Song/Song.jsx';

class SearchSong extends Song {

	constructor() {
		super();
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	render() {

		const {
			song
		} = this.props;

		return (
			<Song song={song}>
				<button onClick={this.addSongToPlaylist}>
					<i className="material-icons">&#xE05C;</i>
				</button>
				<button onClick={this.addSongToTop}>
					<i className="material-icons">&#xE066;</i>
				</button>
				<button onClick={this.addSongToFavorites}>
					<i className="material-icons">&#xE87D;</i>
				</button>
			</Song>
		);

	}

}

delete SearchSong.propTypes.children;

export default SearchSong;