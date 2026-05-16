class DeliveryTracker {
    constructor() {
        this.stages = ["Order Placed", "Payment Confirmed", "Preparing Food", "Out for Delivery", "Delivered"];
    }

    async track(onStatusUpdate) {
        for (const stage of this.stages) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            onStatusUpdate(stage);
        }
    }
}
