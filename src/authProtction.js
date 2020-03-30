import React from "react";
import { auth } from "./firebase";

const authProtection = redirectRoute => WrappedComponent => {
  class WithAuthProtection extends React.Component {
    componentDidMount() {
      const { history } = this.props;
      if (!auth.currentUser) {
        return history.push(redirectRoute);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { user, history } = this.props;
      const { user: nextMe } = nextProps;
      if (user && !nextMe) {
        return history.push(redirectRoute);
      }
    }

    render() {
      const { user } = this.props;
      if (!user) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthProtection;
};

export default authProtection;
