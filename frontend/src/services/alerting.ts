import { apiClient } from '../config/config';

export const getAlerting = async () => {
  const alerting = await apiClient.get('alerting');
  return alerting;
};

export const updateAlerting = async (data: any) => {
  const alerting = await apiClient.patch(`alerting/${data.id}`, data);
  return alerting;
};
