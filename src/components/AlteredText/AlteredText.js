import React, { Component } from "react";
import styles from "./AlteredText.module.css";

class AlteredText extends Component {
  myRef = React.createRef();

  scrollHandler = () => {
    return this.myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isTransformed && prevProps.content !== this.props.content) {
      this.scrollHandler();
    }
  }

  render() {
    return (
      <div
        className={[this.props.styling, styles.alteredText].join(" ")}
        ref={this.myRef}
        key={this.props.ident}
      >
        {this.props.content}
      </div>
    );
  }
}

export default AlteredText;
