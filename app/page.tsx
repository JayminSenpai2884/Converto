import ImageConverter from './components/ImageConverter'
import VideoConverter from './components/VideoConverter'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Image and Video Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageConverter />
        <VideoConverter />
      </div>
    </main>
  )
}