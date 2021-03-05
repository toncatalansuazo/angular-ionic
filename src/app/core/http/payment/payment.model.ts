export interface PaymentResponse {
    data: Payment;
    success: boolean;
}

export interface Payment {
    id: number;
    order_id: number;
    amount: number;
    city: string;
    direction: string;
    comuna: string;
    phone: string;
    references: string;
    type: string;
    email: string;
    documentId: string;
    name: string;
    lastName: string;
    delivered_date: string;
    deliveryId: string;
    deliveryName: string;
    created_at: string;
    updated_at: string;
}
