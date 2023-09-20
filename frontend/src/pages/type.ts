export type Params = {
  id: string;
  label: string;
  code: string;
  type: string | null;
  value: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FileUser = {
  id: string;
  name: string;
  url: string;
  type: string;
  fileEtag: string;
  size: number;
  userId: string;
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
};
