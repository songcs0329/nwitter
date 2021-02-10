import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul className="nav_list">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} size="2x"/>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span>
              {
                userObj.displayName
                ?
                `${userObj.displayName}의 Profile`
                :
                "Profile"
              }
            </span>
          </Link>
          </li>
      </ul>
    </nav>
  );
};

export default Navigation;