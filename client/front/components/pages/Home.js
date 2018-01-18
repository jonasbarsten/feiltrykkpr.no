import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ArtistCard from '../artists/ArtistCard.js';
import Footer from '../Footer.js';

export default class Home extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.pages.stop();
	}

	getArtists() {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}

	getPages() {
		return Pages.find({isInMenu: true}).fetch();
	}

	goToArtist(artist) {
		browserHistory.push('/artists/' + artist._id);
	}

	render() {
		return (
			<div>

				<div id="home-wrapper" className="container">

					<div className="row">
						<img src="/images/logo-full.png" alt="Jansen logo" className="img-responsive center-block home-logo" />
					</div>

					<div id="home-menu" className="row row-centered">
						<span className="col-centered col-sm-2 col-xs-4"><Link to="/artists">Artists</Link></span>
						<span className="col-centered col-sm-2 col-xs-4"><Link to="/releases"> Releases</Link></span>
						{this.getPages().map((page) => {
							const url = '/pages/' + page.urlFriendlyName;
							return <span key={page._id} className="col-centered col-sm-2 col-xs-4"><Link to={url}> {page.name}</Link></span>
						})}

						<span id="mobile-ekstra-menu-item" className="col-centered col-sm-2 col-xs-4"><Link to="#">-</Link></span>

					</div>

					<div className="spacer-40"></div>

					<div className="social-icons row">
						<div className="col-sm-4 col-sm-offset-4 col-xs-12">
							<a target="self" href="https://www.facebook.com/FeiltrykkPR"> <i className="mdi mdi-facebook col-xs-6 mdi-24px"></i></a>
							<a target="self" href="mailto:am@feiltrykkpr.no"> <i className="mdi mdi-mail-ru col-xs-6 mdi-24px"></i></a>
						</div>
					</div>

					<div className="spacer-40"></div>

					<div className="row">

						{this.getArtists().map((artist) => {
							return <ArtistCard key={artist._id} artist={artist} onClick={() => {this.goToArtist(artist)}}/>
						})}

					</div>
				
				</div>
				
				<Footer />

			</div>
		);
	};
}



