export interface OrdersResponse {
    data: Order[];
    success: boolean;
}

export interface OrderResponse {
  data: Order;
  success: boolean;
}

export interface Order {
  id: number;
  user_id: number;
  delivery_cost: number;
  status: number;
  total: number;
  delivered: number;
  created_at: string;
  updated_at: string;
}

export interface DeliverInfo {
  deliveryId: string,
  deliveryName: string
}
