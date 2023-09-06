import * as os from 'os';
import { PythonShell } from 'python-shell';

import { writeFile } from 'fs';
import { join } from 'path';
import { FOLDER_BUCKET } from '../config/constant';
import { InternalServerErrorException } from '@nestjs/common';
import logger from './logger/logger';

export const NomenclatureValidation = (folder: string, filename: string) => {
  // Initialize result to false
  let result = false;
   // Define regex patterns
  let opex_esco_pattern = /^(OCI)_(Facture)_(Janvier|Fevrier|Mars|Avril|Mai|Juin|Juillet|Aout|Août|Septembre|Octobre|Novembre|Decembre)_(\d{4})\w+(\sCatalogue)/g;
  let opex_oci_pattern = /(Etat des baux au)\s([0-3][0-9](-|\\)[0-1][0-2](-|\\)\d{4})/g;
  let opex_ihs_pattern = /^(SITES ORANGE A FACTURER)(\s+)([A-Z]([0-9]+))\s-\s(JANVIER|FEVRIER|MARS|AVRIL|MAI|JUIN|JUILLET|AOUT|SEPTEMBRE|OCTOBRE|NOVEMBRE|DECEMBRE)\s[0-9]+/g;
  let base_sites_pattern = /^(Base de donnees des sites)(\s+)(OCI)_[0-9]{8}/g;
  let action_tech_pattern = /^(action)_(techniques)_(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)_[0-9]{4}/g;
  let ca_sites_pattern = /^(CA_SITES)/g;
  let parc_pattern = /^(parc_par_site_)(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)_(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)_(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)(\d{4})/g;
   // Check if folder is in FOLDER_BUCKET
  if (FOLDER_BUCKET.includes(folder)) {
    // Switch based on folder
    switch (folder) {
      case 'OPEX_ESCO':
        // Check if filename matches opex_esco_pattern
        if (filename.match(opex_esco_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'OPEX_OCI':
        // Check if filename matches opex_oci_pattern
        if (filename.match(opex_oci_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'OPEX_IHS':
        // Check if filename matches opex_ihs_pattern
        if (filename.match(opex_ihs_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'BASE_SITES':
        // Check if filename matches base_sites_pattern
        if (filename.match(base_sites_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'ACTION_TECH':
        // Check if filename matches action_tech_pattern
        if (filename.match(action_tech_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'CA_SITES':
        // Check if filename matches ca_sites_pattern
        if (filename.match(ca_sites_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'PARC_SITES':
        // Check if filename matches parc_pattern
        if (filename.match(parc_pattern)) {
          result = true;
        } else {
          result = false;
        }
        break;
      default:
        result = false;
        break;
    }
  } else {
    return null;
  }
   return result;
};

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
          errors: result[1].split("|"),
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
