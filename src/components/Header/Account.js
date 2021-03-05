import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './Account.scss';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../Hooks/stateProvider';
import { auth } from '../../firebase';

function Account() {
  const [state, ] = useStateValue();

  const handleAuthentication = () => {
    if(state.user){
        auth.signOut();
    }
  }

  return (
    <div className="account">
      <div className="account__hint">
        Hello, {!state.user ? "Sign in" : state.user.email.substring(0,7)}
      </div>
      <Link to={!state.user && "/login"} >
        <div onClick={handleAuthentication} className="account__title">
          My Account
          <ArrowDropDownIcon className="account__arrow" />
        </div>
      </Link>
    </div>
  );
}

export default Account;
