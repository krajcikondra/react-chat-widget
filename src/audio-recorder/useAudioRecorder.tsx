import { useState, useRef } from 'react'
import { RECORD_STATUS } from './status'
import useTimer from './useTimer'

export type RecordStatusType = RECORD_STATUS.RECORDING | RECORD_STATUS.PAUSED | RECORD_STATUS.IDLE;

let mediaRecorder: MediaRecorder
let localStream: MediaStream

const getUserMedia = (
    constraints: MediaStreamConstraints,
): Promise<MediaStream> => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-multi-assign
  // @ts-ignore
  window.navigator.getUserMedia = window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;

  // @ts-ignore
  window.navigator.getUserMedia(constraints, resolve, (err: Error) => {
    if (constraints.video && constraints.audio) {
      delete constraints.audio;
      // @ts-ignore
      window.navigator.getUserMedia(constraints, resolve, reject);
    } else {
      reject(err);
    }
  });
});


export const useAudioRecorder = () => {
  const dataArray = useRef<Array<Blob>>([])

  const [status, setStatus] = useState<RecordStatusType>(RECORD_STATUS.IDLE)
  const [audioResult, setAudioResult] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    timer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleResetTimer
  } = useTimer()

  const startRecording = () => {
    if (status === RECORD_STATUS.IDLE) {
      try {
        setErrorMessage('')
        getUserMedia({ audio: true })
          .then((mediaStreamObj: MediaStream) => {
            localStream = mediaStreamObj
            mediaRecorder = new MediaRecorder(mediaStreamObj)
            mediaRecorder.start()
            mediaRecorder.onstart = () => {
              handleStartTimer()
              setStatus(RECORD_STATUS.RECORDING)
            }
            mediaRecorder.ondataavailable = (event: BlobEvent) => {
              dataArray.current.push(event.data)
            }
          })
          .catch((error) => {
            setErrorMessage(error?.message)
          })
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message)
        }
      }
    } else {
      return
    }
  }

  const resumeRecording = () => {
    if (status === RECORD_STATUS.PAUSED) {
      mediaRecorder.resume()
      mediaRecorder.onresume = () => {
        handleResumeTimer()
        setStatus(RECORD_STATUS.RECORDING)
      }
    } else {
      return
    }
  }

  const pauseRecording = () => {
    if (status === RECORD_STATUS.RECORDING) {
      mediaRecorder.pause()
      mediaRecorder.onpause = () => {
        handlePauseTimer()
        setStatus(RECORD_STATUS.PAUSED)
      }
    } else {
      return
    }
  }

  const stopRecording = () => {
    if (status !== RECORD_STATUS.IDLE) {
      mediaRecorder.stop()
      mediaRecorder.onstop = () => {
        handleResetTimer()
        let audioData = new Blob(dataArray.current, { type: 'audio/wav;' })
        dataArray.current = []
        setAudioResult(window.URL.createObjectURL(audioData))
        setStatus(RECORD_STATUS.IDLE)
        localStream.getAudioTracks().forEach((track: MediaStreamTrack) => {
          track.stop()
        })
      }
    } else {
      return
    }
  }

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer
  }
}
