// npm libs
import React from 'react';

// js utils
import APP from 'utils/app';
import Utilities from 'utils/utilities/Utilities';

// react components
import SongsList from 'components/SongsList/SongsList.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// redux
import store from 'store/index';

class Favorites extends React.Component {

	constructor() {
		super();
		store.subscribe(this.handleSubscribeChanges.bind(this));
		this.state = store.getState().favorites;
	}

	componentDidMount() {
		Utilities.updatePageTitle('favorites');
		APP.songs_storage.initFavoritesWatchers('favorites', APP.username);
		APP.songs_storage.fetchSongsList('favorites', APP.username);
	}

	handleSubscribeChanges() {
		this.setState(store.getState().favorites);
	}

	render() {
		return (
			<div>
				{
					this.state.status === 'SUCCESS' &&
					<SongsList songsList={this.state.songs} type="favorites" />
				}
				{
					this.state.status === 'FETCHING' &&
					<Spinner />
				}
				{
					this.state.status === 'FAILURE' &&
					<div>
						{this.state.errorMessage}
					</div>
				}
			</div>
		);
	}

}

export default Favorites;