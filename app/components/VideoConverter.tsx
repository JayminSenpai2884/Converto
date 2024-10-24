'use client'

import React, { useState } from 'react'
import ffmpeg from 'ffmpeg.js'

const VideoConverter: React.FC = () => {
  const [convertedFile, setConvertedFile] = useState<string | null>(null)

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const result = ffmpeg({
        MEMFS: [{ name: 'input.mp4', data: new Uint8Array(arrayBuffer) }],
        arguments: ['-i', 'input.mp4', 'output.mp4'],
      })

      const output = result.MEMFS[0]
      setConvertedFile(URL.createObjectURL(new Blob([output.data], { type: 'video/mp4' })))
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Video Converter</h2>
      <input type="file" accept="video/*" onChange={handleFileSelected} className="mb-4" />
      {convertedFile && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Converted Video:</h3>
          <video src={convertedFile} controls className="max-w-full h-auto" />
        </div>
      )}
    </div>
  )
}

export default VideoConverter
