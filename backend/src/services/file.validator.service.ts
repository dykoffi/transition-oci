import * as os from 'os';
import { PythonShell } from 'python-shell';

import { writeFile } from 'fs';
import { join } from 'path';
import { InternalServerErrorException } from '@nestjs/common';
import logger from './logger/logger';

// Function to validate a file
export const FileValidator = async (folder: string, file: any) => {
  try {
    // Create a temporary directory
    const tempDir = os.tmpdir();
    // Write the file to the temporary directory
    writeFile(join(tempDir, file.originalname), file.buffer, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    // Get the local path of the file
    let local_xcel = join(tempDir, file.originalname);
    // Initialize an empty array to store the result
    let result = [];
    // Set the options for the Python script
    let options = {
      pythonOptions: ['-u'],
      scriptPath: 'src/services/scripts',
      args: [local_xcel, folder],
    };
    // Run the Python script
    result = await PythonShell.run('opex_validation.py', options);
    console.log(result);
    // Check if the result is valid
    if (result) {
      logger
        .emit({
          level: 'info',
          type: 'HTTP',
          label: 'file_validation',
          message: 'file validation successfull',
        })
        .then((value) => console.log(value));
      // Return the result
      if (result[0] == 'good') {
        return {
          state: true,
          errors: null,
        };
      } else {
        return {
          state: false,
          errors: result[1].split('|'),
        };
      }
    } else {
      // Log the error
      logger
        .emit({
          level: 'error',
          type: 'HTTP',
          label: 'file_validation',
          message: 'something pass wrong in file validation',
        })
        .then((value) => console.log(value));
      // Throw an error
      throw new InternalServerErrorException('something pass wrong');
    }
  } catch (error) {
    // Log the error
    logger
      .emit({
        level: 'error',
        type: 'HTTP',
        label: 'file_validation',
        message: error,
      })
      .then((value) => console.log(value));
    // Log the error
    console.error(error);
  }
};
