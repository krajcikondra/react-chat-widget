import React, {useEffect} from 'react';
import {ReactAudioRecorder} from "./ReactAudioRecorder";

const danger = require('../../assets/danger.svg') as string;

type Props = {}

export const Recording = (_: Props) => {
    return (
        <ReactAudioRecorder
            render={({
                startRecording,
                stopRecording,
                pauseRecording,
                resumeRecording,
                status,
                audioResult,
                errorMessage,
                timer
            }) => {
            useEffect(() => {
                startRecording();
            }, []);

            return (
                <span>
                    <div>
                        {timer}s / {audioResult} / {errorMessage} / {status}
                    </div>
                    {errorMessage && <img src={danger} alt={errorMessage} title={errorMessage} className="rcw-danger-icon" />}
                    {status === 'paused' && <button onClick={startRecording}>Start</button>}
                    {status === 'paused' && <button onClick={resumeRecording}>Continue</button>}
                    {status === 'recording' && <button onClick={pauseRecording}>Pause</button>}
                    {status === 'recording' && <button onClick={stopRecording}>Stop</button>}
                </span>
            );

        }} />
    );
};
