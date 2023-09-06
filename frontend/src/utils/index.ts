import { FOLDER_BUCKET } from "../constant";
import { getAlerting, updateAlerting } from "../services/alerting";

export const getTypes = (type: string) => {
    if (type in FOLDER_BUCKET) {
      return FOLDER_BUCKET[type];
    }
};

export const getEmailById = (alerts:any[],id: string) => {
    if (alerts.length > 0) {
      for (let index = 0; index < alerts.length; index++) {
        const element: { typeFichier: string; email: string[]; id: string } = alerts[index];
        if (id === element.id) {
          return element.email;
        }
      }
    } else {
      return [];
    }
};

export const getTelephoneById = (alerts:any[],id: string) => {
    if (alerts.length > 0) {
      for (let index = 0; index < alerts.length; index++) {
        const element: { typeFichier: string; telephone: string[]; id: string } = alerts[index];
        if (id === element.id) {
          return element.telephone;
        }
      }
    }
};

