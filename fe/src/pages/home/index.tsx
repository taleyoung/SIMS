import React, { SFC } from "react";
import { add, subtract } from "../../redux/actions/counter";
import { connect } from "react-redux";
import { Store } from "../../types/store";

const mapStateToProps = (state: Store) => ({
  number: state.counter.number
});

interface Props {
  number: number;
  add: any;
  subtract: any;
}

const Home: SFC<Props> = props => {
  const { number, add, subtract } = props;
  return (
    <div>
      home
      <div>{number}</div>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  {
    add,
    subtract
  }
)(Home);
