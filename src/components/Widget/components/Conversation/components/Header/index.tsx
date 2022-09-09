import React, {ReactElement} from 'react';

import {Icons} from "../../../../../../icons";
import './style.scss';

type Props = {
  title: string|ReactElement;
  headerBeginElement?: ReactElement;
  subtitle: string;
  toggleChat: () => void;
  minimalizeChat?: (value: boolean) => void;
  showCloseButton: boolean;
  showMinimalizeButton?: boolean;
  isMinimalized?: boolean;
  titleAvatar?: string;
}

function Header({
    title,
    subtitle,
    toggleChat,
    showCloseButton,
    titleAvatar,
    showMinimalizeButton,
    minimalizeChat,
    isMinimalized,
    headerBeginElement,
}: Props) {
  return (
    <div className="rcw-header">
      {showMinimalizeButton &&
        <button className="rcw-minimalize-button" onClick={() => minimalizeChat?.(!isMinimalized)}>
            {isMinimalized ? <Icons.Maximalize /> : <Icons.Minimalize />}
        </button>
      }
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <Icons.Clear />
        </button>
      }
      {headerBeginElement}
      <h4 className="rcw-title">
        {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
        {title}
      </h4>
      <span>{subtitle}</span>
    </div>
  );
}

export default Header;
