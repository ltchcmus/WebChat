import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Button.module.scss";
function Button({ href, to, children, onClick, className: cls, ...props }) {
  let Comp = "button";
  const attribute = {
    ...props,
  };

  if (onClick) attribute.onClick = onClick;

  if (href) {
    Comp = "a";
    attribute.href = href;
  }

  if (to) {
    Comp = Link;
    attribute.to = to;
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <Comp {...attribute} className={clsx(styles.btn)}>
        {children}
      </Comp>
    </div>
  );
}

export default Button;
