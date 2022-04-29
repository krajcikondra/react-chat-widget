import {forwardRef, ReactElement, useImperativeHandle} from 'react'
import {RecordStatusType, useAudioRecorder} from './useAudioRecorder'

export interface IReactAudioRecorder {
  stopRecording: () => Promise<Blob>;
  getStatus: () => RecordStatusType;
}

const BaseReactAudioRecorder = ({
  render
}: {
  render: ({
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer
  }: {
    startRecording: () => void
    stopRecording: () => Promise<Blob>
    pauseRecording: () => void
    resumeRecording: () => void
    status: RecordStatusType
    audioResult: Blob|null
    errorMessage: string
    timer: number
  }) => ReactElement
}, ref) => {
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer
  } = useAudioRecorder()

  useImperativeHandle(ref, () => {
    return {
      stopRecording,
      getStatus: (): RecordStatusType => status,
    };
  });

  return render({
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer
  })
}

export const ReactAudioRecorder = forwardRef(BaseReactAudioRecorder);
