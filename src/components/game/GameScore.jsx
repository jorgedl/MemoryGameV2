import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './less/Score.less';

let timestamp;

class GameScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: 0
        };
        this.interval = null;
    }

    componentWillReceiveProps(props) {
        const { hasGameStarted: willStart, hasGameFinished } = props;
        const { hasGameStarted, postScore } = this.props;
        const { timeElapsed: timeElapsedState } = this.state;
        if (!hasGameStarted && willStart) {
            this.interval = setInterval(() => {
                this.setState(({ timeElapsed }) => ({
                    timeElapsed: timeElapsed + 1
                }));
            }, 1000);
            timestamp = new Date().getTime();
        } else if (timeElapsedState > 0 && (
            (hasGameStarted && !willStart) || hasGameFinished)
        ) {
            if (hasGameFinished) {
                postScore(new Date().getTime() - timestamp);
            }

            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            this.setState({
                timeElapsed: 0
            });
        }
    }

    render() {
        const {
            points,
            tries,
            hasGameStarted,
            userName,
            prepareCards,
            hasGameFinished,
            ranking
        } = this.props;

        const { timeElapsed } = this.state;

        return (
            <div className="game__score score">
                <div className="score__current">
                    { hasGameStarted && !hasGameFinished && (
                        <Fragment>
                            <div>
                                { userName }
                            </div>
                            <div>
                                {`You scored ${points} points in ${tries} tries`}
                            </div>
                            <div>
                                {`Time elapsed: ${timeElapsed}`}
                            </div>
                            <Button
                                className="score__button"
                                onClick={prepareCards}
                            >
                                Reset
                            </Button>
                        </Fragment>
                    ) }
                </div>
                <div className="score__ranking">
                    { ranking.length > 0 && (
                        ranking.map(({
                            tries: rankingTries,
                            userName: rankingUserName = 'John Doe',
                            timeElapsed: rankingTimeElapsed
                        }, i) => (
                            <div>
                                {`${i + 1} - ${rankingUserName}: ${rankingTries} tries within ${rankingTimeElapsed} seconds`}
                            </div>
                        ))
                    ) }
                </div>
            </div>
        );
    }
}

GameScore.propTypes = {
    hasGameStarted: PropTypes.bool.isRequired,
    hasGameFinished: PropTypes.bool.isRequired,
    tries: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    userName: PropTypes.string,
    prepareCards: PropTypes.func.isRequired,
    postScore: PropTypes.func.isRequired,
    ranking: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired
};

GameScore.defaultProps = {
    userName: ''
};

export default GameScore;
