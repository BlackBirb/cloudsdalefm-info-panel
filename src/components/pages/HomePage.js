import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { JoinButton } from '../Buttons'
import Header from '../Header'

class HomePage extends React.Component {
    render() {
        const links = [
            { url: "https://www.facebook.com/cloudsdaleFM.net", name: "facebook" },
            { url: "https://twitter.com/cloudsdalefm", name: "twitter" },
            { url: "https://www.youtube.com/channel/UCkCVf7cZ44QUyln8pqKLGwg", name: "youtube" }
        ]
        const linkNodes = []

        let i=0
        for(const link of links) {
            linkNodes[i] = 
                <li key={i}>
                    <a target="_blank" rel="noopener noreferrer" href={link.url}>
                        <img src={`/images/${link.name}.png`} alt={link.name} witdth="20" height="20" />
                    </a>
                </li>
            i++
        }

        return (
            <div>
                <Header>
                    {linkNodes}
                </Header>
                <div className="pageContent">
                    <div className="contentCentered">
                        <h1 className="contentHeader">Dołącz do audycji!</h1>
                        <p className="contentDesc">Tutaj możesz zostać uczestnikiem aktualnej audycji w radiu.</p>
                        <JoinButton user={this.props.user} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(store => ({
    user: store.user
}))(HomePage);