export type Popup = {
  name: string;
  image: string;
};

export type Credit = {
  id: number;
  name: string;
  image: string;
};

export type CreditForm = {
  id: number;
  fields: Array<{
    label: string;
    placeholder?: string;
    value?: string;
    choices?: Record<string, any>;
  }>;
  message?: string;
  errors: Record<string, string>;
  has_testdrive?: boolean;
};
