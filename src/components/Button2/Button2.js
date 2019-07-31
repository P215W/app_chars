import React, { Component } from "react";
import styles from "./Button2.module.css";

class Button2 extends Component {
  state = {
    cssClass: styles.button2
  };

  render() {
    return (
      <button
        className={this.state.cssClass}
        onClick={() => {
          this.setState({ cssClass: styles.button2 });
          this.props.clickHandler();
        }}
        onMouseOver={() => this.setState({ cssClass: styles.button2Hover })}
        onMouseOut={() => this.setState({ cssClass: styles.button2 })}
        disabled={this.props.isDisabled}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button2;
