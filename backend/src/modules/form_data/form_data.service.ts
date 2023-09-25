import { Injectable } from '@nestjs/common';
import { FormData } from '../../services/form.data.service';
import { join } from 'path';

@Injectable()
export class FormDataService {
  async getData() {
    const path = join(process.cwd(), 'src/assets/data.xlsx');
    const result = await FormData(path);

    return result;
  }
}
