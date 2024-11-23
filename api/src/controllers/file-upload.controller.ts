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

const readdir = promisify(fs.readdir);

/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
    @inject(STORAGE_DIRECTORY) private storageDirectory: string,
  ) {}

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
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => {
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
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }

    return {files, fields: request.body};
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
downloadFile(
  @param.path.string('filename') fileName: string,
  @inject(RestBindings.Http.RESPONSE) response: Response,
) {
  try {
    const file = this.validateFileName(fileName); // Ensure the file path is valid
    const stat = fs.statSync(file);
    const fileSize = stat.size;

    // Check if the client requested a range
    const range = response.req.headers.range;

    if (range) {
      // Parse the range header
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Ensure range is valid
      if (start >= fileSize || end >= fileSize) {
        response.status(416).header('Content-Range', `bytes */${fileSize}`).end();
        return;
      }

      const chunkSize = end - start + 1;
      const fileStream = fs.createReadStream(file, {start, end});

      response.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': this.getContentType(file), // Determine content type dynamically
      });

      fileStream.pipe(response);
    } else {
      // Serve the whole file
      response.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': this.getContentType(file),
      });

      fs.createReadStream(file).pipe(response);
    }
  } catch (error) {
    console.error('File serving error:', error);
    response.status(404).send('File not found or invalid request.');
  }
}
}
