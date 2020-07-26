//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import './GameLeaderboard.css'
// Requirements
import React from 'react'
import Firebase from '../../server/Firebase';
import FirebaseLeaderboard from '../../server/FirebaseLeaderboard';
import GameLeaderboardField from './GameLeaderboardField'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class GameLeaderboard extends React.Component
{
    constructor(props)
    {
        super(...arguments);
		this.limit = 8;
		this.state = { fields: [] };
    };

	render()
	{
		return (
			<div id="INFT574-game-leaderboard">
				<p> LEADERBOARD </p>
				{ this.state.fields.map((json, index) => { return (
					<GameLeaderboardField key={index} data={json} />
				) }) }
			</div>
		);
	};

	componentDidMount()
	{
		// register firebase snapshot
		this.snapshot_handle = FirebaseLeaderboard.OnSnapshot(this.onFirebaseSnapshotCallback.bind(this));
	};

	componentWillUnmount()
	{
		// unregister firebase snapshot
		this.snapshot_handle();
	};

	onFirebaseSnapshotCallback(snapshot)
	{
		// create snapshot information
		let username_rank = 0;
		let snapshot_rank = 0;
		let snapshot_data = [];

		// iterate through snapshot data
		snapshot.forEach(doc => {

			// get document data as a json
			let snapshot_json = doc.data();

			// check if name field is the user
			if (snapshot_json.name === Firebase.Username)
				username_rank = snapshot_rank;

			// insert required values for field
			snapshot_json.rank = ++snapshot_rank;
			snapshot_json.userId = doc.id;

			// append snapshot json data to array
			snapshot_data.push(snapshot_json);
		});

		// calculate data range in respect to the user
		let min_index = Math.max(0, username_rank - this.limit);
		let max_index = Math.min(snapshot_data.length, min_index + this.limit);

		// set current field state to new snapshot data range
		this.setState({ "fields": snapshot_data.splice(min_index, max_index) });
	};
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//