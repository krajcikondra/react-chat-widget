import React, {ReactElement} from 'react';

const Clear = (): ReactElement =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1" x="0px"
        y="0px"
        width="512px"
        height="512px"
        viewBox="0 0 357 357"
    >
        <g>
            <g id="clear">
                <polygon
                    points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3     214.2,178.5   "
                    fill="#FFFFFF" />
            </g>
        </g>
</svg>

const Minimalize = (): ReactElement =>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#FFFFFF" d="M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
    </svg>;

const Maximalize = (): ReactElement =>
    <svg
        id="a"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path
            fill="#FFFFFF"
            d="M22,2V11.82h-2.91V6.84L6.56,19.14h5.44v2.86H2V12.18h2.91v4.63L17.07,4.86h-5.07V2h10Z"
        />
    </svg>;

export const Icons = {
    Clear,
    Minimalize,
    Maximalize,
};
