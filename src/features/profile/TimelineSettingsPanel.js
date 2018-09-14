import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Panel from './Panel';
import PropTypes from 'prop-types';
import SimpleDialog from 'features/library/SimpleDialog';
import SwitchSetting from './SwitchSetting';
import { setUserDataConsent } from 'features/common/redux/actions';
import { deleteUserEvents } from 'features/timeline/redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TimelineSettingsPanel extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    dialogOpen: false,
    timelineDataSettingTitle: "Data Storage",
    timelineDataSettingSubtitle: `
      Allow SoulSaga to store my timeline events for me
    `
  }

  handleDataSettingChange = e => {
    this.props.actions.setUserDataConsent(
      this.props.common.user,
      e.target.checked,
      [
        this.state.timelineDataSettingTitle,
        this.state.timelineDataSettingSubtitle
      ]);
  } 

  handleDeleteButtonClick = () => this.setState({ dialogOpen: true })

  handleDialogClose = () => this.setState({ dialogOpen: false })

  deleteEvents = () => {
    this.handleDialogClose();
    this.props.actions.deleteUserEvents();
  }

  render() {
    let settingText = this.props.common.storeUserData
        ? "We are helping you save your data"
        : "We are not saving your data";
    let dialogTitleText = "Delete all your events?";
    let dialogContentText = `This cannot be undone. If you would like
       to save your data before erasing it, please do so with the
       'Download' button on the Timeline page.`
    return (
      <div>
        <Panel 
            title="Timeline"
            settingText={settingText}>
          <SwitchSetting
            title={this.state.timelineDataSettingTitle}
            subtitle={this.state.timelineDataSettingSubtitle}
            checked={this.props.common.storeUserData}
            onChange={this.handleDataSettingChange}
            value="timelineDataConsent" />

          <Button
              color="primary"
              className="profile-profile-page__timeline-delete-events-button"
              onClick={this.handleDeleteButtonClick}>
            Delete all my events
          </Button>
        </Panel>

        <SimpleDialog 
            open={this.state.dialogOpen}
            onClose={this.handleDialogClose}
            titleText={dialogTitleText}
            contentText={dialogContentText}
            cancelButtonText="Cancel"
            nextButtonText="Delete"
            nextButtonAction={this.deleteEvents}/>
      </div>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    profile: state.profile,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, setUserDataConsent, deleteUserEvents }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineSettingsPanel);