import React from 'react';
import { connect } from 'react-redux';

import boundActions from '../boundActions';
import { getMessagesInActiveNarrow, getPointer } from '../chat/chatSelectors';
import { getAuth } from '../account/accountSelectors';
import MainScreen from './MainScreen';

class MainScreenContainer extends React.Component {

  fetchOlder = () => {
    const { auth, fetching, caughtUp, pointer, narrow, fetchMessages } = this.props;
    if (!fetching.older && !caughtUp.older) {
      fetchMessages(auth, pointer.older, 20, 0, narrow);
    }
  }

  fetchNewer = () => {
    const { auth, fetching, caughtUp, pointer, narrow, fetchMessages } = this.props;
    if (!fetching.newer && !caughtUp.newer) {
      fetchMessages(auth, pointer.newer, 0, 20, narrow);
    }
  }

  doNarrow = (newNarrow = [], pointer: number = Number.MAX_SAFE_INTEGER) => {
    const { switchNarrow } = this.props;
    requestAnimationFrame(() => switchNarrow(newNarrow));
  }

  render() {
    return (
      <MainScreen
        fetchOlder={this.fetchOlder}
        fetchNewer={this.fetchNewer}
        doNarrow={this.doNarrow}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  isOnline: state.app.isOnline,
  orientation: state.app.orientation,
  subscriptions: state.subscriptions,
  messages: getMessagesInActiveNarrow(state),
  allMessages: state.chat.messages,
  fetching: state.chat.fetching,
  caughtUp: state.chat.caughtUp,
  narrow: state.chat.narrow,
  mute: state.mute,
  pointer: getPointer(state),
});

export default connect(mapStateToProps, boundActions)(MainScreenContainer);
