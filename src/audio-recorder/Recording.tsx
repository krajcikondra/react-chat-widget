import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {IReactAudioRecorder, ReactAudioRecorder} from "./ReactAudioRecorder";

const danger = require('../../assets/danger.svg') as string;
const play = require('../../assets/play.svg') as string;
const stopIcon = require('../../assets/stop.svg') as string;
const pause = require('../../assets/pause.svg') as string;
const times = require('../../assets/times.svg') as string;
const loader = require('../../assets/loader.gif') as string;
import {RecordStatusType} from "./useAudioRecorder";
import './style.scss';

type Props = {
    uploading?: boolean,
    onStartRecord?(): void;
    onDoneRecord?(): void;
}

export interface IRecordingRef {
    getAudioResult: () => Blob|null;
    stopRecording: () => Promise<Blob>;
    getStatus: () => RecordStatusType;
}

const BaseRecording = ({onStartRecord, onDoneRecord, uploading}: Props, ref) => {
    const [audio, setAudio] = useState<Blob|null>(null);
    const audioRecorderRef = useRef<IReactAudioRecorder>();

    useImperativeHandle(ref, () => {
        return {
            getAudioResult: () => audio,
            stopRecording: () => audioRecorderRef?.current?.stopRecording?.(),
            getStatus: () => audioRecorderRef?.current?.getStatus?.(),
        };
    });

    return (
        <ReactAudioRecorder
            ref={audioRecorderRef}
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
                onStartRecord?.();
            }, []);

            const record = () => {
                if (status === 'paused') {
                    resumeRecording();
                } else {
                    startRecording();
                }
            };

            const cancel = () => {
                if (uploading) {
                    return;
                }
                stopRecording();
                onDoneRecord?.();
                setAudio(null);
            };

            const stop = () => {
                stopRecording();
            };

            useEffect(() => {
                setAudio(audioResult);
            }, [audioResult]);

            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            const time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`

            return (
                <div className="rcw-mic-recording-wrapper">
                    <img className="rcw-mic-recording-icon rcw-mic-recording-icon-cancel" src={uploading ? loader : times} onClick={cancel} alt="" />
                    <div className="rcw-mic-recording">
                        {errorMessage && <img src={danger} alt={errorMessage} title={errorMessage} className="rcw-danger-icon" />}
                        {status === 'paused' && <img className="rcw-mic-recording-icon" src={play} onClick={record} alt="" />}
                        {status === 'recording' && <img className="rcw-mic-recording-icon" src={stopIcon} onClick={stop} alt="" />}
                        {status === 'recording' && <img className="rcw-mic-recording-icon" src={pause} alt="" onClick={pauseRecording} />}
                        <span className="rcw-mic-recording-timer">{time}</span>
                    </div>
                </div>
            );

        }} />
    );
};

export const Recording = forwardRef(BaseRecording);
