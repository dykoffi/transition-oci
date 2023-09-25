import { FOLDER_BUCKET } from '../constant';

export const getTypes = (type: string) => {
  if (type in FOLDER_BUCKET) {
    return FOLDER_BUCKET[type];
  }
};

export const getEmailById = (alerts: any[], id: string) => {
  if (alerts.length > 0) {
    for (const alert of alerts) {
      const element: { typeFichier: string; email: string[]; id: string } = alert;
      if (id === element.id) {
        return element.email;
      }
    }
  } else {
    return [];
  }
};

export const getTelephoneById = (alerts: any[], id: string) => {
  if (alerts.length > 0) {
    for (const alert of alerts) {
      const element: { typeFichier: string; telephone: string[]; id: string } = alert;
      if (id === element.id) {
        return element.telephone;
      }
    }
  }
};
