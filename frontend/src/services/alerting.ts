import { apiClient } from "../config/config";

// TODO why not return directly data instead save it in var befor

// TODO why use sync instead async

export const getAlerting = async () => {
  const alerting = await apiClient.get('alerting');
  return alerting;
}

export const updateAlerting = async (data: any) => {
  const alerting = await apiClient.patch(`alerting/${data.id}`, data)
  return alerting;
}