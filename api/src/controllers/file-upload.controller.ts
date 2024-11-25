import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY} from '../keys';
import {FileUploadHandler} from '../types';
import ffmpeg from 'fluent-ffmpeg';

const readdir = promisify(fs.readdir);

// const ffmpegPath = 'C:\\ffmpeg\\ffmpeg-7.1-essentials_build\\bin\\ffmpeg.exe';  // Make sure this is correct
// ffmpeg.setFfmpegPath(ffmpegPath);
/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
    @inject(STORAGE_DIRECTORY) private storageDirectory: string,
  ) {}

  static async compressVideo(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-vcodec libx264', // H.264 codec for compression
          '-crf 28',         // Quality (lower value = better quality)
          '-preset fast',    // Speed/Compression balance
          '-movflags faststart', // Optimize for web streaming
        ])
        .on('start', (command : any) => {
          console.log('FFmpeg command:', command);
        })
        .on('error', (err : any) => {
          console.error('Compression error:', err.message);
          reject(err);
        })
        .on('end', () => {
          console.log('Video compression complete:', outputPath);
          resolve();
        })
        .save(outputPath);
    });
  }

  @authenticate('jwt')
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) {
          response.writeHead(404);
          response.end('Something Went Wrong');
        } else {
          resolve(FileUploadController.getFilesAndFields(request));
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static async getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    console.log('uploadedfiles', uploadedFiles);
  
    const mapper = async (f: globalThis.Express.Multer.File) => {
      if (f.mimetype.startsWith('video/')) {
        // Log the size before compression
        const originalSize = f.size;
        console.log(`Original video size: ${originalSize} bytes`);
  
        const compressedFileName = `compressed_${f.filename}`;
        const compressedFilePath = path.resolve(path.dirname(f.path), compressedFileName);
  
        console.log(`Compressing video: ${f.path}`);
        await this.compressVideo(f.path, compressedFilePath);
  
        // Log the size after compression
        const compressedSize = fs.statSync(compressedFilePath).size;
        console.log(`Compressed video size: ${compressedSize} bytes`);
  
        // Replace the original file with the compressed file
        fs.unlinkSync(f.path);
        fs.renameSync(compressedFilePath, f.path);
  
        console.log(`Video compressed and saved as: ${f.path}`);
      }
  
      return {
        fieldname: f.fieldname,
        fileName: f.originalname,
        fileUrl: `${process.env.API_ENDPOINT}/files/${f.filename}`, // Use f.filename instead of f.originalname
        encoding: f.encoding,
        mimetype: f.mimetype,
        size: f.size,
      };
    };
  
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = await Promise.all(uploadedFiles.map(mapper));
    } else {
      for (const filename in uploadedFiles) {
        files.push(...(await Promise.all(uploadedFiles[filename].map(mapper))));
      }
    }
  
    return { files, fields: request.body };
  }
  

  @get('/files', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles() {
    const files = await readdir(this.storageDirectory);
    return files;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private validateFileName(fileName: string) {
    const resolved = path.resolve(this.storageDirectory, fileName);
    if (resolved.startsWith(this.storageDirectory)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
  }

  private getContentType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: {[key: string]: string} = {
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.mov': 'video/quicktime', // Added support for .mov files
      '.mp3': 'audio/mpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  @get('/files/{filename}')
  async downloadFile(
    @param.path.string('filename') fileName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    try {
      console.log(`Received request to download file: ${fileName}`);
  
      // Validate the file name and resolve the path
      const file = await this.validateFileName(fileName);
      console.log(`Resolved file path: ${file}`);
  
      // Get file statistics
      const stat = fs.statSync(file);
      const fileSize = stat.size;
      console.log(`File size: ${fileSize} bytes`);
  
      // Check if the client requested a range
      const range = response.req.headers.range;
      console.log(`Range header: ${range || 'Not provided'}`);
  
      if (range) {
        // Parse range
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        console.log(`Parsed range: start=${start}, end=${end}`);
  
        if (start >= fileSize || end >= fileSize) {
          console.error(`Invalid range: start=${start}, end=${end}, fileSize=${fileSize}`);
          response.status(416).header('Content-Range', `bytes */${fileSize}`).end();
          return;
        }
  
        // Serve partial content
        const chunkSize = end - start + 1;
        console.log(`Chunk size: ${chunkSize} bytes`);
        const fileStream = fs.createReadStream(file, { start, end });
  
        response.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': await this.getContentType(file),
        });
  
        fileStream.pipe(response);
      } else {
        // Serve the entire file
        response.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': await this.getContentType(file),
        });
  
        fs.createReadStream(file).pipe(response);
      }
    } catch (error) {
      console.error('File serving error:', error.message);
      response.status(404).send('File not found or invalid request.');
    }
  }
  
}
