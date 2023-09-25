import { PythonShell } from 'python-shell';

// Function to validate a file
export const FormData = async (file: any) => {
  try {
    // Initialize an empty array to store the result
    let result = [];

    // Run the Python script
    result = await PythonShell.run('form_data_process.py', {
      mode: 'json',
      pythonOptions: ['-u'],
      scriptPath: 'dist/src/services/scripts',
      args: [file],
    });

    return result[0];
  } catch (error) {
    // Log the error

    console.error(error);
  }
};
