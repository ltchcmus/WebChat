import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Button.module.scss";
function Button({ href, to, children, onClick, className, ...props }) {
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
    <Comp className={clsx(styles.btn, className)} {...attribute}>
      {children}
    </Comp>
  );
}

export default Button;
