import React from 'react';

export default class GameCell extends React.Component {
   
    renderDiv(){
        switch(this.props.identifier){
            case 1:
                return <div className="player1"></div>
            case 2:
                return <div className="player2"></div>
            default:
                return <div onClick={() => this.props.dropper(this.props.coordinate)} className="empty-spot"></div> 
        }
    }

    render(){
        return this.renderDiv()
    }
}