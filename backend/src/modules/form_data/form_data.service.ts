import { Injectable } from '@nestjs/common';
import { FormData } from '../../services/form.data.service';
import * as os from 'os';
import { writeFile,readFile, } from "fs";
import { join } from 'path';


@Injectable()
export class FormDataService {

    async getData(){
        const tempDir = os.tmpdir();
        const path = join(process.cwd() , "src/assets/data.xlsx");
        // console.log(path);
        
        // readFile(join(process.cwd() , "assets/data.xlsx"),(err,data)=>{
        //     // Write the file to the temporary directory
        //     writeFile(join(tempDir, "data.xlsx"), data, (err) => {
        //         if (err) throw err;
        //         console.log('The file has been saved!');
        //     });
        // });


        const result = await FormData(path);

        return result;
    }
}
