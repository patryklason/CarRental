import React from 'react'
import { Link } from 'react-router-dom'

class NavButton extends React.Component {
  render() {
    return (
      <Link to={this.props.name} className='btn-nav'>
        <button>{this.props.text}</button>
      </Link>
    );
  }
}

export default NavButton