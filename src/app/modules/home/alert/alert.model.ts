export class Alert {
  constructor(
    public id: number,
    public title: string,
    public subtitle: string,
    public quantity: number,
    public color: string,
    public url: string) {}
}

export interface AlertResponse {
  data: Alert[];
  success: boolean;
}

export interface AlertData {
  id: number;
  quantity: number;
}
