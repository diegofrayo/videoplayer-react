// npm libs
import React from 'react';

// react components
import SongsList from 'components/SongsList/SongsList.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// js utils
import APP from 'utils/app';
import Utilities from 'utils/utilities/Utilities';

// redux
import store from 'store/index';
import {
	searchSongsFailure,
	searchSongsFetching,
	searchSongsSuccess
} from 'actions/searches';

// styles
import searchesStyles from './Searches.less';

class Searches extends React.Component {

	constructor(props) {
		super(props);
		store.subscribe(this.handleSubscribeChanges.bind(this));
		this.search = this.search.bind(this);
		this.state = store.getState().searches;
	}

	componentDidMount() {
		Utilities.updatePageTitle('search');
	}

	handleSubscribeChanges() {
		this.setState(store.getState().searches);
	}

	search(event) {

		const inputText = this.input.value;

		if (event.key === 'Enter' && inputText.length > 2) {

			store.dispatch(searchSongsFetching());

			APP.searcher.searchSongs(inputText).then((response) => {

				if (response.type === 'error') {
					store.dispatch(searchSongsFailure(response.message));
				} else {
					store.dispatch(searchSongsSuccess(response.data.songs));
				}

			});

		}

	}

	render() {

		return (
			<div>
				<div className={searchesStyles.inputContainer}>
					<div className="form-group">
						<input type="text" placeholder="Search songs, artists, albums..." className={`form-control ${searchesStyles.inputSearch}`} onKeyPress={this.search} ref={(input) => { this.input = input; }} autoFocus />
					</div>
				</div>
				{
					this.state.status === 'SUCCESS' &&
					<SongsList type="search" songsList={this.state.songs.toArray()} />
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

export default Searches;