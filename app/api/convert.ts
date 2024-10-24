import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to parse form data' })
    }

    const imageFile = files.image as unknown as formidable.File
    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    try {
      const imageBuffer = fs.readFileSync(imageFile.filepath)
      const convertedBuffer = await sharp(imageBuffer).webp().toBuffer()

      res.setHeader('Content-Type', 'image/webp')
      res.setHeader('Content-Disposition', 'attachment; filename=converted-image.webp')
      res.send(convertedBuffer)
    } catch (error) {
      console.error('Error converting image:', error)
      res.status(500).json({ error: 'Failed to convert image' })
    }
  })
}