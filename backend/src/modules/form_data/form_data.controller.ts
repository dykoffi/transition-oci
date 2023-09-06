import { Controller, Get } from '@nestjs/common';
import { FormDataService } from './form_data.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("form-data")
@Controller('form-data')
export class FormDataController {

    constructor(private formdataService:FormDataService){}

    @Get('')
    async getData(){
        let data = await this.formdataService.getData();

        return data;
    }

}
