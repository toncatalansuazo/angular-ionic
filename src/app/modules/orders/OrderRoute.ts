export enum OrderRoute {
    ORDER = 'order/',
    ORDERS = 'orders/',
    COMPLETED = 'completed',
    PENDING = 'pending',
    TO_DELIVER = 'to-deliver',
    DETAIL = 'detail'
}

export enum FromOrdersRouteType {
  PENDING = OrderRoute.ORDERS + OrderRoute.PENDING,
  TO_DELIVER = OrderRoute.ORDERS + OrderRoute.TO_DELIVER,
  COMPLETED = OrderRoute.ORDERS + OrderRoute.COMPLETED,
}
