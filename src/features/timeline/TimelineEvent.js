import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { CATEGORY_ICON_MAP } from './eventiconmaps';
import { buildDateString } from './util';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TimelineEvent extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleViewEvent = () => {
    this.props.actions.setViewingEvent(this.props.event);
  }

  renderImg() {
    if (this.props.event.img) {
      return (
        <CardMedia
          className="timeline-timeline-event__media"
          image={this.props.event.img}/>);
    }
  }

  renderDesc() {
    let limitLength = this.props.isDisplay ? "" : "timeline-timeline-event__desc";
    if (this.props.event.desc) {
      return (
        <CardContent className="timeline-timeline-event__desc-container">
          <Typography component="p" className={limitLength}>
            {this.props.event.desc}
          </Typography>
        </CardContent>);
    }
  }

  render() {
    let dateString = buildDateString(
        this.props.event.day,
        this.props.event.month,
        this.props.event.year);
    return (
      <Card
          className="timeline-timeline-event__card"
          onClick={this.props.onClick ? this.props.onClick : this.handleViewEvent}>
        <CardHeader
          avatar={
            <Avatar className="timeline-timeline-event__avatar">
              {CATEGORY_ICON_MAP[this.props.event.category]}
            </Avatar>
          }
          title={this.props.event.title}
          subheader={dateString}
        />
        {this.renderImg()}
        {this.renderDesc()}
      </Card>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    timeline: state.timeline,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineEvent);
